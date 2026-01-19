# Fisher-Rao Geometry

The mathematical foundation underlying Noetic Eidos—treating embeddings as points on statistical manifolds.

## Why Information Geometry?

Standard approaches treat embeddings as vectors in flat space. But neural embeddings actually represent **probability distributions**—they encode uncertainty and relationships.

Information geometry provides the right tools:

| Flat Space | Information Geometry |
|------------|---------------------|
| Euclidean distance | Fisher-Rao distance |
| Linear interpolation | Geodesic paths |
| Uniform directions | Curvature-aware |

## The Fisher Information Matrix

For a parametric family of distributions p(x|θ), the Fisher Information Matrix is:

$$I_{ij}(\theta) = \mathbb{E}\left[\frac{\partial \log p(x|\theta)}{\partial \theta_i} \frac{\partial \log p(x|\theta)}{\partial \theta_j}\right]$$

This defines a **Riemannian metric** on parameter space.

## Fisher-Rao Distance

The distance between two distributions:

$$d_{FR}(\theta_1, \theta_2) = \inf_{\gamma} \int_0^1 \sqrt{g_{ij}(\gamma(t)) \dot{\gamma}^i(t) \dot{\gamma}^j(t)} \, dt$$

Where γ is a path connecting θ₁ and θ₂.

### Key Properties

1. **Invariant**: Under reparameterization
2. **Unique**: Only metric with this property (Čencov's theorem)
3. **Natural**: Measures distinguishability of distributions

## Connection to Learning

The remarkable connection:

> **Cross-entropy loss ≈ Laplace-Beltrami operator**
> **Gradient descent ≈ Heat flow on manifolds**

This means:
- Training follows geodesics on the statistical manifold
- Loss landscapes have geometric interpretation
- Optimization is intrinsically geometric

## Implementation

```python
from noetic_eidos.core import FisherRaoMetric

metric = FisherRaoMetric(embedding_dim=768)

# Compute distance
d = metric.distance(embedding_a, embedding_b)

# Compute geodesic
path = metric.geodesic(embedding_a, embedding_b, n_points=10)

# Get metric tensor at a point
g = metric.metric_tensor(embedding)
```

## In Noetic Eidos

Fisher-Rao geometry influences:

1. **Attention**: Dual kernels operate in curved space
2. **Memory**: Distances account for curvature
3. **Routing**: Persona resonance uses geometric similarity

## Further Reading

- [Core Concepts](/guide/core-concepts) — Overview of mathematical foundations
- [ZetaFormer](/guide/zetaformer) — How attention uses geometry
- [Research Papers](/research/) — Original sources
