# CLAUDE.md

This file guides Claude Code when editing or extending this repository.

## Project Overview

**NoeticEidos** (v0.1.0) — Geometric ML library (~10k LOC) implementing:

| Component | Mathematical Foundation |
|-----------|------------------------|
| **Dual transports** | Additive (Gaussian semigroup on (ℝ,+)) and Multiplicative (Poisson via Haar measure dy/y on (ℝ₊,×)) |
| **Mellin coupling** | Balance at s=1/2 on the unitary critical line (Plancherel theorem) |
| **Submersion backbone** | f=(τ,σ): M→ℝ², zero set Z=f⁻¹(0), transversality ensures rank(df)=2 |
| **Fisher–Rao pullback** | Information-geometric metrics: g_x = dE_x^T g_FR dE_x |
| **Quotient topology** | Six spaces: Cylinder, Möbius, Torus, Klein, Sphere, Projective with seam-compatibility |
| **Constrained dynamics** | Projection to T_x Z via P = I - J_f^T(J_f J_f^T)^{-1}J_f |
| **Sparse numerics** | k-NN graphs; CG/Lanczos only (convergence ∝ √κ) |

## Repository Layout

```
src/
├── algebra/           # additive.py (Gaussian), multiplicative.py (Poisson/Haar), mellin.py
├── graphs/            # knn.py (dual modes), laplacian.py (L, L_sym)
├── solvers/           # cg.py, lanczos.py, preconditioners.py
├── stats/             # spectra.py, balance.py, separability.py, stability.py
├── geometry/          # submersion.py, fr_pullback.py, projection.py
├── topology/          # atlas.py (6 quotients), coords.py, geodesic.py, metric.py, validation.py
├── dynamics/          # cg_dynamics.py, projected.py, diffusion.py, fr_flows.py, dual_kernel.py
├── validation/        # mathematical.py, numerical.py, statistical.py, reproducibility.py, performance.py
tests/                 # 12 test files (~4k LOC)
examples/              # 6 examples (~3.4k LOC)
docs/mathematician/    # Theoretical foundations (10 files)
```

## Quickstart

```bash
pip install -e .           # or: pip install -r requirements.txt
pytest -q                  # run tests
```

## Core Patterns

### 1) Dual Graph Construction

```python
from src.graphs.knn import build_graph
from src.graphs.laplacian import laplacian

# Additive: Euclidean k-NN with Gaussian weights
G_add = build_graph(X, mode="additive", k=16, sigma="median", seed=0)

# Multiplicative: log-map k-NN (discretizes Haar measure dy/y)
G_mult = build_graph(X, mode="multiplicative", k=16, tau="median", eps=1e-6, seed=0)

L_add = laplacian(G_add, normalized=True)   # L_sym = I - D^{-1/2}AD^{-1/2}
L_mult = laplacian(G_mult, normalized=True)
```

**Key insight**: `mode="multiplicative"` applies d(x,y) = ∥log(|x|+ε) - log(|y|+ε)∥, making multiplicative convolution additive in log-space.

### 2) Submersion & Transversality

```python
from src.geometry.submersion import build_submersion, check_transversal

f, jacobian = build_submersion(X, method="linear", seed=0)
ok, cert = check_transversal((f, jacobian), X, kappa_max=1e6)
assert ok, f"Transversality failed: {cert}"
```

**Transversality certificate** (prerequisite for constrained dynamics):
- On Z = {x : f(x)=0}, require rank(J_f) = 2
- Numeric check: κ(J_f^T J_f) ≤ κ_max via SVD
- Without transversality, tangent projection P_{T_x Z} is undefined

### 3) Mellin Balance (s = 1/2)

```python
from src.algebra.mellin import mellin_transform_discrete, mellin_balance_score
from src.stats.balance import mellin_coupled_stat

# Discrete Mellin transform: M[f](s) = ∫ y^{s-1} f(y) dy/y
M_f = mellin_transform_discrete(f_values, y_values, s=0.5)

# Coupled statistic: interpolates additive ↔ multiplicative
result = mellin_coupled_stat(X, stat_fn, s=0.5, k=16)
```

**Why s=1/2**: Mellin transform is unitary on ℜ(s)=1/2 (Plancherel). This is the unique equilibrium between additive and multiplicative structures.

### 4) Fisher–Rao Metrics

```python
from src.geometry.fr_pullback import fisher_rao_metric, rescale_by_metric

# Fisher information I_ij = Σ_k (∂log p_k/∂θ_i)(∂log p_k/∂θ_j) p_k
G = fisher_rao_metric(logits, dlogits_dX)  # Shape: (n, d, d)

# Pullback: g_x = dE^T I dE (embedding-aware geometry)
X_fr = rescale_by_metric(X, G, reg=1e-6)
```

### 5) Solvers (CG/Lanczos)

```python
from src.solvers.cg import cg_solve
from src.solvers.lanczos import topk_eigs

# Solve shifted system (L + αI)u = b (α stabilizes nullspace)
u, info = cg_solve(L, b, alpha=1e-3, rtol=1e-6, maxiter=2000, M="jacobi")

# Top k eigenvalues via Lanczos (O(km) complexity)
evals, evecs = topk_eigs(L, k=32, which="SM")
```

**CG defaults**: α ∈ [1e-6, 1e-2], rtol=1e-6, Jacobi preconditioning. Convergence rate ∝ √κ(M^{-1}A).

### 6) Spectral Diagnostics

```python
from src.stats.spectra import spectral_gap, spectral_entropy
from src.stats.stability import stability_score
from src.stats.separability import separability_test

gap = spectral_gap(L)           # γ = λ₁ (connectivity)
H = spectral_entropy(L, k=16)   # H = -Σ p_i log p_i, p_i = λ_i/Σλ_j

# Stability: S = 1 - std/mean under perturbations
mean, std, stab = stability_score(stat_fn, X, perturb_fn, trials=10, seed=0)

# Separability: |E[φ_add] - E[φ_mult]| with statistical test
result = separability_test(phi_add, phi_mult, method="bootstrap", trials=1000)
```

### 7) Quotient Topology

```python
from src.topology import create_topology, TopologyType

# Six topologies with seam-compatibility
mobius = create_topology(TopologyType.MOBIUS, w=1.0)
torus = create_topology(TopologyType.TORUS, w=1.0)
sphere = create_topology(TopologyType.SPHERE, radius=1.0)

# Apply identification maps (deck transformations)
u_new, v_new, du_new, dv_new = mobius.apply_identifications(u, v, du, dv)

# Check metric seam-compatibility: g(T(q)) = dT^T g(q) dT
ok = mobius.metric_compatibility_condition(g_fn, q, tolerance=1e-8)
```

| Topology | Orientable | χ | Seam condition |
|----------|------------|---|----------------|
| Cylinder | Yes | 0 | g(u+2π, v) = g(u, v) |
| Möbius | No | 0 | g(u+π, -v) = diag(1,-1)^T g(u,v) diag(1,-1) |
| Torus | Yes | 0 | g(u+2π, v) = g(u, v+2π) = g(u,v) |
| Klein | No | 0 | g(u+π, -v) ≈ Möbius + g(u, v+2π) |
| Sphere | Yes | 2 | Requires stereographic charts |
| Projective | No | 1 | g(-q) = g(q) |

### 8) Constrained Dynamics

```python
from src.dynamics.projected import projected_velocity, projected_gradient_step
from src.dynamics.diffusion import simulate_diffusion, simulate_poisson
from src.dynamics.fr_flows import fr_gradient_flow, natural_gradient_descent

# Projection to tangent space T_x Z = ker(J_f)
v_proj = projected_velocity(v, J_f)  # P = I - J_f^T(J_f J_f^T)^{-1}J_f

# Projected gradient step on constraint manifold
x_new = projected_gradient_step(x, grad, J_f, step_size=0.01)

# Heat diffusion: u_t = exp(-tL)u_0
u_t = simulate_diffusion(L, u0, t=1.0, method="krylov")

# Poisson diffusion: u_t = exp(-t√L)u_0
u_t = simulate_poisson(L, u0, t=1.0, method="eigendecomp")

# Fisher-Rao gradient flow (model-aware)
trajectory, info = fr_gradient_flow(logits, dlogits_dX, F, steps=50, eta=0.01)
```

### 9) Validation Framework

```python
from src.validation.reproducibility import ensure_reproducibility, compute_data_hash
from src.validation.mathematical import check_graph_connectivity, validate_transversality
from src.validation.numerical import validate_cg_convergence, check_eigenvalue_validity
from src.validation.statistical import apply_multiple_testing_correction
from src.validation.performance import check_memory_limits

# Reproducibility (seeds numpy, random, torch)
ensure_reproducibility(seed=42)
hash_val = compute_data_hash(X, algorithm="sha256")

# Mathematical checks
is_connected = check_graph_connectivity(A)
trans_ok = validate_transversality(f, jacobian, X)

# Numerical checks
cg_result = validate_cg_convergence(residual_history, tolerance=1e-6)
eig_result = check_eigenvalue_validity(evals, matrix_type="laplacian")

# Statistical corrections (Bonferroni, Holm, Benjamini-Hochberg)
corrected = apply_multiple_testing_correction(p_values, method="holm")

# Memory limits
mem_result = check_memory_limits(matrix_size=(n, n), max_memory_gb=32.0)
```

## Validation Protocols (Mandatory)

Every pipeline must pass:

1. **Connectivity** — Graph is connected (check_graph_connectivity)
2. **Transversality** — rank(J_f)=2 on Z, κ(J_f^T J_f) ≤ κ_max
3. **Mass conservation** — For diffusion: ∥u_t∥₁ ≈ ∥u_0∥₁
4. **Stability** — Metrics vary <10% under seed/noise perturbations
5. **Separability** — Additive vs multiplicative statistically distinct (p < 0.05)
6. **Balance** — s=0.5 maximizes stability score vs s∈{0.3,0.4,0.6,0.7}

## Numerical Constraints

- **Sparse-first**: k-NN graphs only; k∈[8,32]; **never** dense for n>1000
- **Memory**: Design for n=50k, k=32 within 32 GB
- **Solvers**: CG + Lanczos only; no dense eigensolvers
- **Determinism**: All entry points accept `seed`; log all seeds

## Implementation Status

| Module | LOC | Status |
|--------|-----|--------|
| algebra | 545 | ✅ Gaussian/Poisson kernels, Mellin transform |
| graphs | 165 | ✅ Dual k-NN, Laplacians |
| solvers | 584 | ✅ CG, Lanczos, preconditioners |
| stats | 1,500 | ✅ Spectra, balance, separability, stability |
| geometry | 744 | ✅ Submersion, Fisher-Rao, projection |
| topology | 2,451 | ✅ 6 quotient spaces, geodesics |
| dynamics | 1,808 | ✅ Flows, diffusion, projections |
| validation | 1,609 | ✅ Full framework |

**Planned**: Forman/Ollivier curvature, NN-descent, advanced PCG

## Common Pitfalls

1. Dense graphs for n>1000 (disallowed)
2. Dynamics on Z without transversality check
3. Forgetting to log s when s≠0.5
4. Mixing modes without explicit `mode=` parameter
5. Topology without seam-compatibility validation
6. Skipping seed/config/hash logging

## Mathematical References

- **Algebra**: Folland (harmonic analysis), Iwaniec & Kowalski (Mellin)
- **Geometry**: Guillemin & Pollack (submersions), Amari (information geometry)
- **Topology**: Stillwell (quotient spaces), seam-compatibility theory
- **Curvature**: Forman (combinatorial), Ollivier (transport-based)

See `docs/mathematician/` for complete theoretical foundations.

## Quick Reference

| Task | Import | Function |
|------|--------|----------|
| Build k-NN graph | `from src.graphs.knn import build_graph` | `build_graph(X, mode="additive", k=16)` |
| Compute Laplacian | `from src.graphs.laplacian import laplacian` | `laplacian(A, normalized=True)` |
| Get spectrum | `from src.solvers.lanczos import topk_eigs` | `topk_eigs(L, k=16, which="SM")` |
| Spectral metrics | `from src.stats.spectra import spectral_gap, spectral_entropy` | `spectral_gap(L)`, `spectral_entropy(L)` |
| Mellin balance | `from src.stats.balance import mellin_coupled_stat` | `mellin_coupled_stat(X, stat_fn, s=0.5)` |
| Submersion | `from src.geometry.submersion import build_submersion` | `f, jac = build_submersion(X)` |
| Fisher-Rao | `from src.geometry.fr_pullback import fisher_rao_metric` | `G = fisher_rao_metric(logits, dlogits)` |
| Solve (L+αI)u=b | `from src.solvers.cg import cg_solve` | `u, info = cg_solve(L, b, alpha=1e-3)` |
| Topology | `from src.topology import create_topology, TopologyType` | `create_topology(TopologyType.MOBIUS)` |
| Geodesics | `from src.topology.geodesic import integrate_geodesic` | `integrate_geodesic(...)` |
| FR flows | `from src.dynamics.fr_flows import fr_gradient_flow` | `fr_gradient_flow(logits, dlogits_dX, F)` |
| Reproducibility | `from src.validation.reproducibility import ensure_reproducibility` | `ensure_reproducibility(seed=42)` |

## Mathematical Foundations

### Additive Transport (Gaussian semigroup)
* Kernel: `exp(-d²/σ²)`
* Property: `G_σ₁ * G_σ₂ = G_{√(σ₁²+σ₂²)}`

### Multiplicative Transport (Poisson via Haar)
* Log-transform: `Z = log(|X| + ε)`
* Poisson kernel: `t/(π(δ² + t²))`
* Haar measure: `dy/y` on ℝ₊

### Mellin Coupling (s=0.5)
* Discrete Mellin transform: `∫₀^∞ y^(s-1) f(y) dy`
* Coupled adjacency: `A_s = (A_add)^s ⊙ (A_mult)^(1-s)`
* Balance point: `s = 1/2` (unitary line)

### Fisher-Rao Pullback
* Fisher information: `I_ij = Σ_k (∂log p_k/∂θ_i)(∂log p_k/∂θ_j) p_k`
* Pullback metric: `G = (∂logits/∂X)^T I (∂logits/∂X)`

### Quotient Topology
* 6 topologies with deck maps and seam identification
* Seam-compatible metrics for smooth transport across identifications
* Christoffel symbols for geodesic integration on quotient spaces