# ZetaFormer API

Dual-kernel attention mechanism with κζ balance tracking.

## Classes

### ZetaFormer

```python
class ZetaFormer:
    def __init__(self, config: ZetaFormerConfig) -> None: ...
    def forward(
        self, 
        query: ndarray, 
        keys: ndarray, 
        values: ndarray
    ) -> tuple[ndarray, KappaZetaState]: ...
    def reset(self) -> None: ...
```

#### Constructor

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `ZetaFormerConfig` | Configuration object |

#### Methods

##### `forward(query, keys, values)`

Compute dual-kernel attention.

**Parameters:**
- `query`: Query vector `(d,)`
- `keys`: Key matrix `(n, d)`
- `values`: Value matrix `(n, d)`

**Returns:**
- `output`: Attended values `(d,)`
- `state`: `KappaZetaState` with balance metrics

**Example:**
```python
output, state = zf.forward(q, k, v)
print(f"κζ = {state.smoothed:.3f}")
```

##### `reset()`

Reset internal state (κζ smoothing).

---

### ZetaFormerConfig

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
    mode: PathwayMode = PathwayMode.ADAPTIVE
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `embedding_dim` | `int` | 768 | Embedding dimension |
| `tau_temperature` | `float` | 1.0 | τ kernel temperature |
| `sigma_rate` | `float` | 1.0 | σ kernel rate |
| `balance_target` | `float` | 1.0 | Target κζ value |
| `smoothing_alpha` | `float` | 0.1 | EWMA smoothing factor |
| `alpha_beta` | `float` | 0.1 | β normalization rate |
| `alpha_t` | `float` | 0.1 | τ normalization rate |
| `mode` | `PathwayMode` | ADAPTIVE | Blending mode |

---

### KappaZetaState

```python
@dataclass
class KappaZetaState:
    raw: float           # Current κζ value
    smoothed: float      # EWMA smoothed
    tau_moment: float    # M_τ
    sigma_moment: float  # M_σ
    ratio: float         # τ/σ moment ratio
    timestamp: float     # Time of measurement
```

---

### PathwayMode

```python
class PathwayMode(Enum):
    TAU_ONLY = "tau"      # Only τ pathway
    SIGMA_ONLY = "sigma"  # Only σ pathway
    ADAPTIVE = "adaptive" # Dynamic blending
    FIXED = "fixed"       # Fixed 50/50 blend
```

## Examples

### Basic Usage

```python
from noetic_eidos import ZetaFormer, ZetaFormerConfig

config = ZetaFormerConfig(embedding_dim=512)
zf = ZetaFormer(config)

output, state = zf.forward(query, keys, values)
```

### Creative Mode (τ-biased)

```python
config = ZetaFormerConfig(
    tau_temperature=2.0,
    sigma_rate=0.5,
    balance_target=1.3
)
```

### Analytical Mode (σ-biased)

```python
config = ZetaFormerConfig(
    tau_temperature=0.5,
    sigma_rate=2.0,
    balance_target=0.7
)
```
