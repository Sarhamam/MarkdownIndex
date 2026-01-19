# Mathematical Foundations

The theoretical underpinnings of Noetic Eidos.

## Fisher-Rao Geometry in Neural Networks {#fisher-rao}

### The Core Insight

Neural network embeddings are not arbitrary vectors—they implicitly represent probability distributions. The Fisher-Rao metric provides the natural geometry for this space.

### Pullback Construction

Given an embedding function e: X → ℝᵈ, we define the pullback metric:

$$g_{ij}(x) = \sum_{k,l} \frac{\partial e^k}{\partial x^i} \frac{\partial e^l}{\partial x^j} I_{kl}(e(x))$$

Where I is the Fisher Information Matrix on embedding space.

### Cross-Entropy as Laplacian

The cross-entropy loss function:

$$L(p, q) = -\sum_i p_i \log q_i$$

Approximates the Laplace-Beltrami operator on the statistical manifold. This means gradient descent is performing **heat diffusion** on a curved space.

---

## κζ Metric Derivation {#kappa-zeta}

### Moment Definitions

**Radial moment** (τ pathway):
$$M_\tau = \sum_i w_i^{(\tau) 2}$$

**Angular moment** (σ pathway):
$$M_\sigma = \sum_i w_i^{(\sigma) 2}$$

### Balance Ratio

$$\kappa\zeta = \frac{M_\tau}{M_\sigma}$$

### Critical Line Correspondence

The value κζ = 1.0 corresponds to the critical line Re(s) = ½ of the Riemann zeta function in the following sense:

1. Both represent a **balance point** between opposing tendencies
2. Both have special stability properties
3. Both connect to prime number distribution (in the zeta case) or attention distribution (in our case)

### Stability Analysis

The ζ-normalization equations:

$$\beta' = \beta [1 + \tanh(\alpha_\beta (\kappa\zeta - 1))]$$
$$\tau' = \tau [1 - \tanh(\alpha_\tau (\kappa\zeta - 1))]$$

Form a **contractive mapping** toward κζ = 1.0 under mild conditions on α_β and α_τ.

---

## Polylipse Geometry

### Multi-Foci Metric

For N foci {f₁, ..., fₙ} with weights {w₁, ..., wₙ}:

$$g_N = \sum_{i=1}^{N} w_i \cdot g_i(f_i)$$

Where gᵢ is the local metric centered at fᵢ.

### Geodesics

Paths of minimal length in polylipse space generally pass through the **central region** where multiple foci contribute, then curve toward the destination focus.

### Hysteresis as Energy Barrier

The hysteresis threshold Δ creates an **energy barrier** between persona regions, preventing thermal fluctuations from causing spurious transitions.

---

## Open Questions

1. **Optimal N**: Is 7 the right number of personas? What's the theoretical justification?

2. **Zeta zero selection**: Should we use all zeros or a specific subset?

3. **Non-Euclidean attention**: Can we compute τ/σ kernels directly in curved space?

4. **Learning geometry**: Can the Fisher-Rao metric be learned end-to-end?

## References

See [Research Papers](/research/#core-papers) for foundational literature.
