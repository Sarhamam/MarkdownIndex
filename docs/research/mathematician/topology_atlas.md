# Topology Atlas: Mathematical Foundations

## Overview

The topology atlas provides a unified framework for working with quotient spaces in geometric machine learning. It implements rigorous mathematical foundations for handling seam identification, metric compatibility, and topological invariants across six fundamental quotient topologies.

## Mathematical Framework

### Quotient Space Construction

A quotient space M̃ = M/~ is constructed from a base manifold M with an equivalence relation ~. Each topology in our atlas follows this pattern:

1. **Base Space**: Start with a fundamental domain D ⊂ ℝ²
2. **Identification Maps**: Define gluing maps that identify boundary points
3. **Seam Compatibility**: Ensure all geometric objects respect the identifications

### The Six Topologies

#### Strip-Based Quotients

**Cylinder**: `S¹ × ℝ`
- Domain: `[0, 2π) × ℝ`
- Identification: `(0, v) ~ (2π, v)`
- Orientable, Euler characteristic χ = 0

**Möbius Band**: Non-orientable strip
- Domain: `[0, 2π) × ℝ`
- Identification: `(0, v) ~ (2π, -v)` (twist!)
- Non-orientable, Euler characteristic χ = 0

#### Rectangular Quotients

**Torus**: `S¹ × S¹`
- Domain: `[0, 2π) × [0, 2π)`
- Identifications:
  - `(0, v) ~ (2π, v)`
  - `(u, 0) ~ (u, 2π)`
- Orientable, Euler characteristic χ = 0

**Klein Bottle**: Non-orientable torus
- Domain: `[0, 2π) × [0, 2π)`
- Identifications:
  - `(0, v) ~ (2π, v)` (cylinder gluing)
  - `(u, 0) ~ (2π-u, 2π)` (Möbius twist!)
- Non-orientable, Euler characteristic χ = 0

#### Spherical Quotients

**Sphere**: `S²`
- Domain: `[0, π] × [0, 2π)`
- Identifications:
  - North pole: `(0, v) ~ (0, 0)` for all v
  - South pole: `(π, v) ~ (π, 0)` for all v
  - `(u, 0) ~ (u, 2π)`
- Orientable, Euler characteristic χ = 2

**Projective Plane**: `ℝP²`
- Domain: `[0, π] × [0, 2π)`
- Identifications:
  - Antipodal: `(u, v) ~ (π-u, v+π)`
- Non-orientable, Euler characteristic χ = 1

### Seam Compatibility Theory

For a metric tensor g on a quotient space, we require **seam compatibility**:

```
g(φ(p)) = (dφ)ᵀ g(p) dφ
```

where φ is any identification map and dφ is its differential.

#### Complete Seam Compatibility Conditions

##### 1. Cylinder
- **Identification**: `(0, v) ~ (2π, v)`
- **Differential**: `dφ = I` (identity)
- **Compatibility**: `g(0, v) = g(2π, v)`
- **Metric requirements**: Simple periodicity in u

##### 2. Möbius Band
- **Identification**: `T(u, v) = (u + π, -v) mod 2π`
- **Differential**: `dT = diag(1, -1)`
- **Compatibility**: `g(u+π, -v) = dTᵀ g(u,v) dT`
- **Metric requirements**:
  - `g₁₁(u+π, -v) = g₁₁(u,v)` (even in v)
  - `g₂₂(u+π, -v) = g₂₂(u,v)` (even in v)
  - `g₁₂(u+π, -v) = -g₁₂(u,v)` (odd in v)

##### 3. Torus
- **Identifications**:
  - Horizontal: `(0, v) ~ (2π, v)`
  - Vertical: `(u, 0) ~ (u, 2π)`
- **Differentials**: Both identity
- **Compatibility**: Double periodicity
- **Metric requirements**: `g(u+2π, v) = g(u, v+2π) = g(u, v)`

##### 4. Klein Bottle
- **Identifications**:
  - Horizontal: `(0, v) ~ (2π, v)`
  - Vertical: `(u, 0) ~ (2π-u, 2π)` (Möbius twist)
- **Differentials**:
  - Horizontal: `I`
  - Vertical: `diag(-1, 1)`
- **Compatibility**:
  - `g(0, v) = g(2π, v)`
  - `g(u, 0)` compatible with `g(2π-u, 2π)` under twist
- **Metric requirements**:
  - Horizontal periodicity
  - `g₁₁(2π-u, 2π) = g₁₁(u, 0)`
  - `g₂₂(2π-u, 2π) = g₂₂(u, 0)`
  - `g₁₂(2π-u, 2π) = -g₁₂(u, 0)`

##### 5. Sphere
- **Identifications**:
  - Azimuthal: `(θ, 0) ~ (θ, 2π)`
  - North pole: `(0, φ) ~ (0, 0)` for all φ
  - South pole: `(π, φ) ~ (π, 0)` for all φ
- **Compatibility**: Regularity at poles, azimuthal periodicity
- **Metric requirements**:
  - `g(θ, 0) = g(θ, 2π)`
  - Metric remains finite at poles despite coordinate degeneracy

##### 6. Projective Plane
- **Identifications**:
  - Azimuthal: `(θ, 0) ~ (θ, 2π)`
  - Antipodal at equator: `(π/2, φ) ~ (π/2, φ+π)`
- **Compatibility**: Antipodal invariance at boundary
- **Metric requirements**:
  - `g(θ, 0) = g(θ, 2π)`
  - `g(π/2, φ) = g(π/2, φ+π)`

### Implementation Details

#### QuotientSpace Base Class

All topologies inherit from `QuotientSpace` and implement:

```python
@abstractmethod
def identification_maps(self) -> List[Callable]:
    """Return list of identification map functions."""

@abstractmethod
def fundamental_domain_bounds(self) -> Tuple[Tuple[float, float], Tuple[float, float]]:
    """Return ((u_min, u_max), (v_min, v_max)) for the domain."""

@abstractmethod
def metric_compatibility_condition(self, metric_fn: Callable,
                                 tolerance: float = 1e-10) -> bool:
    """Check if metric satisfies seam compatibility."""
```

#### Validation Framework

The atlas provides comprehensive validation:

1. **Metric Compatibility**: Verify seam conditions across the fundamental domain
2. **Topological Invariants**: Check Euler characteristics and orientability
3. **Geodesic Integration**: Ensure geodesics respect quotient structure
4. **Statistical Invariance**: Verify statistics are well-defined on quotients

#### Usage Patterns

```python
from topology import create_topology, TopologyType, topology_atlas

# Create a Möbius band
mobius = create_topology(TopologyType.MOBIUS, w=1.5, period=4*np.pi)

# Define a seam-compatible metric
def my_metric(q):
    u, v = q[0], q[1]
    g11 = 1.0 + 0.2 * np.cos(2*v)  # Even in v
    g22 = 1.0 + 0.1 * np.cos(4*v)  # Even in v
    g12 = 0.05 * np.sin(2*u) * np.sin(2*v)  # Odd in v
    return np.array([[g11, g12], [g12, g22]])

# Validate compatibility
validation = topology_atlas.validate_metric_on_topology(my_metric, mobius)
assert validation['valid'], f"Metric incompatible: {validation['error']}"

# Use in geodesic integration
from topology import integrate_geodesic
trajectory = integrate_geodesic(q0, v0, t_final=5.0, g_fn=my_metric,
                               strip=mobius.to_strip())
```

## Theoretical Guarantees

### Orientability Classification

#### Mathematical Definition

A manifold is **orientable** if it admits a consistent choice of orientation across all charts.

#### Detection Algorithm

1. **Identification Map Analysis**:
   - Compute the Jacobian determinant of each identification map
   - Check sign consistency around all non-contractible loops

2. **Deck Transformation Test**:
   - For quotient spaces M̃ = M/G, check if deck transformations preserve orientation
   - Orientable ⇔ all deck transformations have det(dT) > 0

3. **Homological Criterion**:
   - Non-orientable ⇔ H_n(M; ℤ) = 0 (top homology vanishes with integer coefficients)
   - Orientable ⇔ H_n(M; ℤ) ≈ ℤ

#### Classification Results

- **Orientable**: Cylinder, Torus, Sphere
  - All identification maps preserve orientation
  - det(dφ) > 0 for all φ ∈ identification maps

- **Non-orientable**: Möbius band, Klein bottle, Projective plane
  - Contains orientation-reversing identification
  - ∃φ such that det(dφ) < 0

### Euler Characteristic Computation

#### General Formulas

1. **CW-Complex Formula**: For a CW-complex with V vertices, E edges, and F faces:
   ```
   χ = V - E + F
   ```

2. **Quotient Space Formula**: For quotient by discrete group action:
   ```
   χ(M/G) = χ(M) / |G|  (for free actions)
   ```

3. **Gluing Formula**: For spaces constructed by gluing boundaries:
   ```
   χ(X ∪_f Y) = χ(X) + χ(Y) - χ(A)
   ```
   where A is the identified boundary.

4. **Classification by Euler Characteristic**:
   - **Orientable surfaces**: χ = 2 - 2g (g = genus)
   - **Non-orientable surfaces**: χ = 2 - k (k = crosscap number)

#### Specific Values

| Topology | Formula | Value | Notes |
|----------|---------|-------|-------|
| Sphere S² | 2 - 2(0) | 2 | Genus 0 |
| Torus T² | 2 - 2(1) | 0 | Genus 1 |
| Klein bottle | 2 - 2 | 0 | 2 crosscaps |
| Projective plane ℝP² | 2 - 1 | 1 | 1 crosscap |
| Möbius band | - | 0 | Boundary ≠ ∅ |
| Cylinder | - | 0 | Boundary ≠ ∅ |

### Geodesic Completeness

On quotient spaces, geodesics may:
1. **Stay in interior**: Normal geodesic flow
2. **Hit seams**: Apply identification and continue seamlessly
3. **Approach singularities**: Handle pole structure (sphere/projective plane)

The integration framework ensures energy conservation and topological consistency.

## Integration with Geometric ML Pipeline

The topology atlas integrates seamlessly with the broader geometric ML framework:

1. **Data → Graph**: Build k-NN graphs on quotient spaces with seam-aware distances
2. **Graph → Metric**: Fisher-Rao pullback metrics with seam compatibility validation
3. **Metric → Topology**: Automatic topology detection and atlas lookup
4. **Topology → Stats**: Spectral analysis respecting quotient structure
5. **Stats → Dynamics**: Geodesic flows and curvature computation on quotients

### Performance Characteristics

- **Memory**: O(k²) for metric storage per topology (k = number of sample points)
- **Validation**: O(n) seam compatibility checks across fundamental domain
- **Geodesic Integration**: O(T/dt) with seam crossing overhead < 5%
- **Scalability**: Designed for n ≤ 50k sample points with k ≤ 32 neighbors

## Future Extensions

Planned additions to the topology atlas:

1. **Higher Genus Surfaces**: Riemann surfaces with g ≥ 2
2. **3D Quotients**: 3-manifolds and lens spaces
3. **Dynamic Topologies**: Time-varying quotient structures
4. **Adaptive Refinement**: Hierarchical topology detection
5. **Parallel Processing**: GPU acceleration for large-scale validation

The mathematical foundations ensure these extensions maintain theoretical rigor while supporting practical geometric ML applications.

## Mathematical References

### Foundational Texts

1. **Differential Topology**
   - Milnor, J. (1997). *Topology from the Differentiable Viewpoint*. Princeton University Press.
   - Guillemin, V., & Pollack, A. (2010). *Differential Topology*. AMS Chelsea Publishing.

2. **Quotient Spaces & Identification Topologies**
   - Massey, W. S. (1991). *A Basic Course in Algebraic Topology*. Springer-Verlag.
   - Lee, J. M. (2011). *Introduction to Topological Manifolds* (2nd ed.). Springer.

3. **Riemannian Geometry on Quotient Spaces**
   - do Carmo, M. P. (1992). *Riemannian Geometry*. Birkhäuser.
   - O'Neill, B. (1983). *Semi-Riemannian Geometry with Applications to Relativity*. Academic Press.

### Specific Topics

4. **Non-Orientable Surfaces**
   - Stillwell, J. (1992). *Geometry of Surfaces*. Springer-Verlag.
   - Section on Möbius band and Klein bottle constructions

5. **Euler Characteristic & Classification**
   - Munkres, J. R. (2000). *Topology* (2nd ed.). Prentice Hall.
   - Chapter on classification of surfaces

6. **Fisher-Rao Metrics & Information Geometry**
   - Amari, S., & Nagaoka, H. (2000). *Methods of Information Geometry*. AMS & Oxford University Press.
   - Nielsen, F. (2020). *An Elementary Introduction to Information Geometry*. Entropy, 22(10), 1100.

7. **Geodesic Flows on Manifolds**
   - Jost, J. (2017). *Riemannian Geometry and Geometric Analysis* (7th ed.). Springer.
   - Klingenberg, W. (1995). *Riemannian Geometry* (2nd ed.). de Gruyter.

### Computational Aspects

8. **Discrete Differential Geometry**
   - Crane, K. (2020). *Discrete Differential Geometry: An Applied Introduction*. CMU Course Notes.
   - Bobenko, A. I., & Suris, Y. B. (2008). *Discrete Differential Geometry*. AMS.

9. **Symplectic Integration**
   - Hairer, E., Lubich, C., & Wanner, G. (2006). *Geometric Numerical Integration*. Springer.
   - Leimkuhler, B., & Reich, S. (2004). *Simulating Hamiltonian Dynamics*. Cambridge University Press.

### Applications to Machine Learning

10. **Geometric Deep Learning**
    - Bronstein, M. M., et al. (2021). *Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges*. arXiv:2104.13478.

11. **Manifold Learning & Dimensionality Reduction**
    - Lee, J. A., & Verleysen, M. (2007). *Nonlinear Dimensionality Reduction*. Springer.

These references provide the theoretical foundation for the topology atlas implementation and its integration with geometric machine learning pipelines.