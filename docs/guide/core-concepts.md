# Core Concepts

This page introduces the mathematical foundations of Noetic Eidos. Don't worry—we'll build intuition first, then formalize.

## The Problem with Flat Embeddings

Standard neural networks treat embeddings as points in flat Euclidean space. But this ignores valuable geometric structure:

- **Cosine similarity** assumes all directions are equivalent
- **L2 distance** ignores curvature
- **Attention** treats all positions uniformly

Noetic Eidos introduces **information geometry**—treating embeddings as points on curved statistical manifolds.

## Information Geometry Basics

### Statistical Manifolds

A statistical manifold is a space where each point represents a probability distribution. The "distance" between points reflects how distinguishable the distributions are.

::: tip Intuition
Think of it like a globe vs. a flat map. On a globe, distances near the poles behave differently than at the equator. Statistical manifolds have similar "curvature" effects.
:::

### Fisher-Rao Metric

The Fisher-Rao metric measures infinitesimal distances on a statistical manifold:

$$g_{ij}(\theta) = \mathbb{E}\left[\frac{\partial \log p(x|\theta)}{\partial \theta_i} \frac{\partial \log p(x|\theta)}{\partial \theta_j}\right]$$

This is the **Fisher Information Matrix**—it tells us how sensitive our distributions are to parameter changes.

### Key Insight

> Cross-entropy loss ≈ Laplace-Beltrami operator
> 
> Gradient descent ≈ Heat flow on manifolds

This means training neural networks is secretly doing geometry!

## Dual Attention Pathways

### τ Pathway (Gaussian)

Continuous, exploratory attention:

$$K_\tau(q, k) = \exp\left(-\frac{||q-k||^2}{2\tau^2}\right)$$

- **High τ**: Broad, diffuse attention
- **Low τ**: Sharp, focused attention

### σ Pathway (Poisson)

Discrete, exploitative attention:

$$K_\sigma(q, k) = \exp(-\lambda) \cdot \frac{\lambda^k}{k!}$$

Where λ depends on the query-key interaction.

### Balance: The κζ Metric

$$\kappa\zeta = \frac{M_\tau}{M_\sigma}$$

| κζ Value | Interpretation |
|----------|----------------|
| κζ > 1 | τ-dominant (exploring) |
| κζ = 1 | Balanced (critical line) |
| κζ < 1 | σ-dominant (exploiting) |

## Zeta Function Connection

The Riemann zeta function:

$$\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}$$

Its non-trivial zeros lie on the **critical line** Re(s) = ½. We use these zeros as quantization points for spectral memory.

::: info Why Zeta Zeros?
Zeta zeros have optimal spacing properties for frequency quantization. They're nature's way of distributing resonance points.
:::

## Memory Regimes

Physical frequencies snap to nearest zeta zero:

```
Π_𝓣: ℝ⁺ → 𝓣  (projection to zeta lattice)
```

The **mismatch** creates stress terms that drive thermal migration:

- Hot data → STM (high frequency, narrow cells)
- Cold data → LTM (low frequency, wide cells)

## Polylipse Geometry

A **polylipse** generalizes an ellipse to N foci. The metric tensor:

$$g_N = \sum_i w_i \cdot g_i(f_i)$$

Each focus represents a persona mode. The system routes queries to the persona with highest **resonance**—but with **hysteresis** to prevent rapid switching.

## Summary

| Concept | Mathematical Object | Purpose |
|---------|---------------------|---------|
| Embedding space | Statistical manifold | Geometric structure |
| Attention | Dual kernels (τ/σ) | Explore/exploit balance |
| Balance metric | κζ ratio | Stability indicator |
| Memory quantization | Zeta zeros | Optimal frequency grid |
| Persona routing | Polylipse geometry | Adaptive personality |

## Next Steps

- [ZetaFormer](/guide/zetaformer) — Implement dual attention
- [κζ Dynamics](/guide/kappa-zeta) — Balance control theory
- [Research Papers](/research/) — Original sources
