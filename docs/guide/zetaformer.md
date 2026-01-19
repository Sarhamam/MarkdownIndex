# ZetaFormer

The ZetaFormer is Noetic Eidos's core attention mechanism, combining dual-kernel pathways for balanced exploration and exploitation.

## Overview

Traditional attention uses a single softmax over query-key similarities. ZetaFormer uses **two parallel pathways** that capture different aspects of relevance:

```
Query ──┬──► τ Pathway (Gaussian) ──┐
        │                          ├──► Blend ──► Output
        └──► σ Pathway (Poisson) ──┘
```

## τ Pathway: Continuous Attention

The τ (tau) pathway uses a Gaussian kernel:

$$K_\tau(q, k) = \exp\left(-\frac{||q-k||^2}{2\tau^2}\right)$$

### Properties

- **Continuous**: Smooth attention distribution
- **Exploratory**: Considers many keys simultaneously
- **Temperature-controlled**: τ parameter adjusts spread

### Code

```python
class TauPathway:
    def __init__(self, dim: int, temperature: float = 1.0):
        self.dim = dim
        self.tau = temperature
    
    def kernel(self, q: ndarray, k: ndarray) -> float:
        diff = q - k
        return np.exp(-np.dot(diff, diff) / (2 * self.tau ** 2))
    
    def attention_weights(self, query: ndarray, keys: ndarray) -> ndarray:
        weights = np.array([self.kernel(query, k) for k in keys])
        return weights / weights.sum()
    
    def radial_moment(self, weights: ndarray) -> float:
        """M_τ = Σ w_i² (concentration measure)"""
        return np.sum(weights ** 2)
```

## σ Pathway: Discrete Attention

The σ (sigma) pathway uses a Poisson kernel:

$$K_\sigma(q, k) = \exp(-\lambda) \cdot \frac{\lambda^{d(q,k)}}{d(q,k)!}$$

### Properties

- **Discrete**: Event-driven attention
- **Exploitative**: Focuses on specific keys
- **Rate-controlled**: λ parameter adjusts sparsity

### Code

```python
class SigmaPathway:
    def __init__(self, dim: int, rate: float = 1.0):
        self.dim = dim
        self.lam = rate
    
    def kernel(self, q: ndarray, k: ndarray) -> float:
        d = np.sum(np.abs(q - k))  # L1 distance as discrete proxy
        return np.exp(-self.lam * d)
    
    def attention_weights(self, query: ndarray, keys: ndarray) -> ndarray:
        weights = np.array([self.kernel(query, k) for k in keys])
        return weights / weights.sum()
    
    def angular_moment(self, weights: ndarray) -> float:
        """M_σ (event-driven concentration)"""
        return np.sum(weights ** 2)
```

## The κζ Balance

The magic happens in how we **blend** the pathways:

$$\kappa\zeta = \frac{M_\tau}{M_\sigma}$$

```python
def compute_kappa_zeta(tau_weights: ndarray, sigma_weights: ndarray) -> float:
    M_tau = np.sum(tau_weights ** 2)
    M_sigma = np.sum(sigma_weights ** 2)
    return M_tau / M_sigma
```

### Interpretation

| κζ | State | Behavior |
|----|-------|----------|
| > 1.5 | τ-dominant | Exploring widely |
| 1.0 | Critical | Balanced attention |
| < 0.7 | σ-dominant | Exploiting specific keys |

## ζ-Normalization

To maintain stability, we use **ζ-normalization** to drive κζ toward 1.0:

$$\beta' = \beta \left[1 + \tanh(\alpha_\beta (\kappa\zeta - 1))\right]$$
$$\tau' = \tau \left[1 - \tanh(\alpha_\tau (\kappa\zeta - 1))\right]$$

This creates a **feedback loop**:
- If κζ > 1: Increase σ influence, decrease τ spread
- If κζ < 1: Increase τ influence, decrease σ sharpness

## Full ZetaFormer

```python
@dataclass
class ZetaFormerConfig:
    embedding_dim: int = 768
    tau_temperature: float = 1.0
    sigma_rate: float = 1.0
    balance_target: float = 1.0
    smoothing_alpha: float = 0.1
    alpha_beta: float = 0.1
    alpha_t: float = 0.1

class ZetaFormer:
    def __init__(self, config: ZetaFormerConfig):
        self.config = config
        self.tau = TauPathway(config.embedding_dim, config.tau_temperature)
        self.sigma = SigmaPathway(config.embedding_dim, config.sigma_rate)
        self.kz_smoothed = 1.0
    
    def forward(self, query, keys, values):
        # Compute both pathways
        tau_weights = self.tau.attention_weights(query, keys)
        sigma_weights = self.sigma.attention_weights(query, keys)
        
        # Compute κζ
        kappa_zeta = self.compute_kappa_zeta(tau_weights, sigma_weights)
        
        # Smooth with EWMA
        self.kz_smoothed = (
            self.config.smoothing_alpha * kappa_zeta + 
            (1 - self.config.smoothing_alpha) * self.kz_smoothed
        )
        
        # Blend based on κζ
        blend = self.compute_blend(self.kz_smoothed)
        attention = blend * tau_weights + (1 - blend) * sigma_weights
        
        # Apply to values
        output = attention @ values
        
        return output, KappaZetaState(
            raw=kappa_zeta,
            smoothed=self.kz_smoothed,
            tau_moment=self.tau.radial_moment(tau_weights),
            sigma_moment=self.sigma.angular_moment(sigma_weights)
        )
```

## Use Cases

### Creative Writing (τ-biased)

```python
config = ZetaFormerConfig(
    tau_temperature=2.0,  # Wide exploration
    sigma_rate=0.5,       # Reduce exploitation
    balance_target=1.3    # Allow τ dominance
)
```

### Code Analysis (σ-biased)

```python
config = ZetaFormerConfig(
    tau_temperature=0.5,  # Focused
    sigma_rate=2.0,       # Strong exploitation
    balance_target=0.7    # Allow σ dominance
)
```

### Balanced Dialogue (critical line)

```python
config = ZetaFormerConfig(
    tau_temperature=1.0,
    sigma_rate=1.0,
    balance_target=1.0    # Maintain balance
)
```

## Next Steps

- [κζ Dynamics](/guide/kappa-zeta) — Deep dive into the balance metric
- [Spectral Memory](/guide/spectral-memory) — How attention feeds memory
- [API Reference](/api/zetaformer) — Complete API docs
