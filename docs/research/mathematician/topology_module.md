# Topology Module Documentation

The topology module provides rigorous topological quotient handling for the geometric ML library, with the Möbius band as the primary example. This module implements deck maps, seam identification, metric compatibility, and geodesic integration on nontrivial quotients.

## Overview

The Möbius band is realized as a quotient space of the strip `[0,2π) × [-w,w]` with seam identification via the deck map:

```
T(u,v) = (u+π, -v) mod 2π
```

The deck map differential is `dT = diag(1, -1)`, which creates the characteristic "twist" of the Möbius band.

## Module Structure

```
topology/
├── __init__.py          # Package initialization with exports
├── coords.py            # Deck maps, wrapping, velocity pushforward
├── metric.py            # Seam-compatibility for metrics and operators
├── geodesic.py          # Symplectic geodesic integration with seam handling
└── validation.py        # Topological invariance validation utilities
```

## Quick Start

### Basic Setup

```python
import numpy as np
from topology import Strip, integrate_geodesic
from topology.metric import enforce_seam_compatibility
from topology.validation import comprehensive_topology_validation

# Configure the fundamental strip
strip = Strip(w=1.0, period=2*np.pi)
```

### Coordinate Handling

```python
from topology.coords import deck_map, apply_seam_if_needed, wrap_u

# Apply deck map transformation
u, v = 0.5, 0.8
u_deck, v_deck = deck_map(u, v, strip)
print(f"T({u}, {v}) = ({u_deck:.3f}, {v_deck:.3f})")

# Handle seam crossings during integration
q = np.array([0.5, 1.1])  # Beyond strip boundary
velocity = np.array([0.1, 0.2])
q_new, _, v_new, _ = apply_seam_if_needed(q[0], q[1], velocity[0], velocity[1], strip)
print(f"After seam handling: q = ({q_new:.3f}, {_:.3f}), v = ({v_new:.3f}, {_:.3f})")

# Wrap u-coordinates to fundamental domain
u_wrapped = wrap_u(np.array([0.0, π, 2*π, 3*π]))
print(f"Wrapped coordinates: {u_wrapped}")
```

### Metric Seam-Compatibility

```python
from topology.metric import seam_compatible_metric, make_seam_compatible_metric

# Define a seam-compatible metric
def compatible_metric(q):
    u, v = q[0], q[1]
    # Components must satisfy specific symmetries
    g11 = 2.0 + np.cos(2*u) + np.cos(2*v)  # Even in v, π-periodic in u
    g22 = 1.5 + np.sin(2*u) + np.cos(4*v)  # Even in v, π-periodic in u
    g12 = 0.1 * np.sin(2*u) * np.sin(2*v)  # Odd in v, π-periodic in u
    return np.array([[g11, g12], [g12, g22]])

# Validate compatibility
q_test = np.array([0.5, 0.3])
is_compatible = seam_compatible_metric(compatible_metric, q_test, strip)
print(f"Metric is seam-compatible: {is_compatible}")

# Enforce compatibility (raises error if violated)
enforce_seam_compatibility(compatible_metric, q_test, strip)

# Construct metric from component functions
def g11_fn(q): return 2.0 + np.cos(2*q[1])  # Even in v
def g22_fn(q): return 1.5 + np.cos(2*q[0])  # Periodic in u
def g12_fn(q): return 0.1 * np.sin(2*q[1])  # Odd in v

metric_fn = make_seam_compatible_metric(g11_fn, g22_fn, g12_fn)
```

### Geodesic Integration

```python
from topology.geodesic import integrate_geodesic, geodesic_energy

# Define metric and its gradient
def example_metric(q):
    return np.array([[2.0, 0.5], [0.5, 1.5]])

def metric_gradient(q):
    # For constant metric, gradients are zero
    return np.zeros((2, 2)), np.zeros((2, 2))

# Initial conditions
q0 = np.array([0.0, 0.0])
v0 = np.array([0.2, 0.1])
t_final = 10.0
dt = 0.01

# Integrate geodesic with seam awareness
traj_q, traj_v, info = integrate_geodesic(
    q0, v0, t_final, dt,
    example_metric, metric_gradient, strip,
    energy_tolerance=1e-3
)

print(f"Integration successful: {info['success']}")
print(f"Final time: {info['final_time']:.2f}")
print(f"Energy drift: {info['energy_drift']:.2e}")
print(f"Seam crossings: {info['seam_crossings']}")

# Check energy conservation
E_initial = geodesic_energy(q0, v0, example_metric)
E_final = geodesic_energy(traj_q[-1], traj_v[-1], example_metric)
print(f"Energy: {E_initial:.6f} → {E_final:.6f}")
```

### Topological Validation

```python
from topology.validation import (
    seam_invariance, validate_metric_invariance,
    comprehensive_topology_validation
)

# Test function invariance
def test_function(q):
    u, v = q[0], q[1]
    return np.cos(2*u) + np.cos(2*v)  # Should be invariant

q_test = np.array([0.5, 0.3])
is_invariant = seam_invariance(test_function, q_test, strip)
print(f"Function is seam-invariant: {is_invariant}")

# Validate metric invariance
metric_report = validate_metric_invariance(example_metric, strip, n_test=50)
print(f"Metric invariance validation: {metric_report['invariant']}")

# Comprehensive validation suite
validation_report = comprehensive_topology_validation(
    g_fn=example_metric,
    strip=strip,
    tolerance=1e-8
)

print(f"All validation tests passed: {validation_report['all_passed']}")
print(f"Tests run: {validation_report['tests_run']}")
```

## Theoretical Background

### Deck Map Mathematics

The Möbius band quotient is defined by the identification:

```
(u, v) ~ (u+π, -v)
```

This creates a non-orientable surface with the topology of a Möbius band. The deck map `T(u,v) = (u+π, -v)` is an involution: `T(T(q)) = q`.

### Seam-Compatibility Conditions

For a metric `g` to be well-defined on the quotient, it must satisfy:

```
g(u+π, -v) = (dT)ᵀ g(u,v) dT
```

where `dT = diag(1, -1)`. This expands to:

- `g₁₁(u+π, -v) = g₁₁(u, v)` (unchanged)
- `g₁₂(u+π, -v) = -g₁₂(u, v)` (sign flip)
- `g₂₁(u+π, -v) = -g₂₁(u, v)` (sign flip)
- `g₂₂(u+π, -v) = g₂₂(u, v)` (unchanged)

### Geodesic Integration

Geodesics are integrated using symplectic leapfrog integration:

1. **Half velocity step**: `v(t+dt/2) = v(t) + (dt/2) * a(q(t))`
2. **Full position step**: `q(t+dt) = q(t) + dt * v(t+dt/2)`
3. **Seam handling**: Apply deck map if crossing `v = ±w`
4. **Half velocity step**: `v(t+dt) = v(t+dt/2) + (dt/2) * a(q(t+dt))`

The acceleration is computed from the geodesic equation:

```
d²qᵏ/dt² = -Γᵏᵢⱼ (dqⁱ/dt)(dqʲ/dt)
```

where `Γᵏᵢⱼ` are the Christoffel symbols.

## Advanced Usage

### Custom Strip Configuration

```python
# Larger strip with custom period
wide_strip = Strip(w=2.0, period=4*np.pi)

# Very narrow strip for testing
narrow_strip = Strip(w=0.1)
```

### Adaptive Integration

```python
from topology.geodesic import adaptive_geodesic_step

# Single adaptive step with error control
q_new, v_new, dt_new, accept = adaptive_geodesic_step(
    q, v, metric_fn, grad_fn, strip, dt=0.1, target_error=1e-8
)

if accept:
    print(f"Step accepted, new dt = {dt_new}")
else:
    print(f"Step rejected, try dt = {dt_new}")
```

### Grid-Based Validation

```python
from topology.metric import validate_metric_grid

# Validate metric over entire fundamental domain
report = validate_metric_grid(metric_fn, strip, n_u=20, n_v=15)

print(f"Grid validation: {report['compatible']}")
print(f"Violation rate: {report['violation_rate']:.3f}")
print(f"Max error: {report['max_error']:.2e}")
```

### Distance Computation

```python
from topology.coords import distance_on_quotient
from topology.geodesic import geodesic_distance

# Euclidean distance on quotient (accounts for seam identification)
q1 = np.array([0.1, 0.9])
q2 = np.array([π + 0.1, -0.9])  # Seam-equivalent points
euclidean_dist = distance_on_quotient(q1[0], q1[1], q2[0], q2[1], strip)
print(f"Quotient distance: {euclidean_dist:.6f}")  # Should be ~0

# Geodesic distance
geodesic_dist = geodesic_distance(q1, q2, metric_fn, grad_fn, strip)
print(f"Geodesic distance: {geodesic_dist:.6f}")
```

## Integration with Geometry Module

The topology module integrates seamlessly with Fisher-Rao pullback metrics:

```python
# Hypothetical integration with geometry module
from geometry.fr_pullback import make_fr_pullback_metric

# Create Fisher-Rao pullback metric
g_fn, grad_g_fn = make_fr_pullback_metric(alpha=0.5)

# Validate seam-compatibility
try:
    enforce_seam_compatibility(g_fn, np.array([0.5, 0.3]), strip)
    print("Fisher-Rao metric is seam-compatible!")
except SeamCompatibilityError as e:
    print(f"Compatibility violation: {e}")

# Use in geodesic integration
traj_q, traj_v, info = integrate_geodesic(
    q0, v0, t_final, dt, g_fn, grad_g_fn, strip
)
```

## Performance Considerations

### Memory Usage

For geodesic integration, memory usage scales as:
- Trajectory storage: `O(n_saved * 2)` for positions and velocities
- Integration workspace: `O(1)` per step

### Time Complexity

- Geodesic step: `O(1)` per step (constant metric evaluation)
- Seam handling: `O(1)` per crossing
- Validation: `O(n_test)` for grid-based validation

### Numerical Stability

The module includes several stability features:

- **Energy conservation monitoring**: Tracks kinetic energy drift
- **Seam crossing detection**: Robust boundary handling
- **Metric positive-definiteness**: Validation and regularization
- **Integration error control**: Adaptive time stepping available

## Error Handling

### Common Exceptions

- `SeamCompatibilityError`: Metric violates seam-compatibility
- `GeodesicIntegrationError`: Integration failure or instability
- `TopologicalValidationError`: Invariance validation failure

### Troubleshooting

**Energy drift in geodesic integration:**
```python
# Reduce time step
dt = dt / 2

# Check metric condition number
eigenvals = np.linalg.eigvals(metric_fn(q))
condition = np.max(eigenvals) / np.min(eigenvals)
if condition > 1e12:
    print("Metric is ill-conditioned")
```

**Seam-compatibility violations:**
```python
# Check component symmetries
from topology.metric import validate_component_symmetries

results = validate_component_symmetries(g11_fn, g22_fn, g12_fn, strip)
for key, valid in results.items():
    if not valid:
        print(f"Symmetry violation: {key}")
```

**Function invariance failures:**
```python
# Debug with explicit deck map evaluation
q = np.array([0.5, 0.3])
u_deck, v_deck = deck_map(q[0], q[1], strip)
q_deck = np.array([u_deck, v_deck])

value_orig = func(q)
value_deck = func(q_deck)
error = abs(value_deck - value_orig)
print(f"Invariance error: {error:.2e}")
```

## API Reference

See the module docstrings for complete API documentation:

- `topology.coords`: Coordinate transformations and seam handling
- `topology.metric`: Metric compatibility validation and construction
- `topology.geodesic`: Geodesic integration and energy monitoring
- `topology.validation`: Topological invariance testing

## Testing

The module includes comprehensive tests covering:

- 28 coordinate handling tests
- 23 metric compatibility tests
- 23 geodesic integration tests
- 31 validation utility tests

Run tests with:
```bash
pytest tests/test_topology_*.py -v
```

## Integration Examples

### With Validation Framework

```python
from validation.reproducibility import ensure_reproducibility
from validation.performance import check_memory_limits

# Ensure reproducible topology computations
ensure_reproducibility(42)

# Check memory limits for large integrations
n_steps = int(t_final / dt)
check_memory_limits((n_steps, 4), max_memory_gb=8.0)  # 4 fields per step

# Full validation pipeline
validation_report = comprehensive_topology_validation(
    g_fn=seam_compatible_metric,
    strip=strip,
    tolerance=1e-8
)

assert validation_report['all_passed'], "Topology validation failed"
```

### With Graph Module

```python
# Potential integration with graph construction on quotient
# (Future development)

def quotient_aware_knn_graph(X, strip, k=16):
    """Build k-NN graph accounting for quotient topology."""
    # Use distance_on_quotient for neighbor search
    # Handle seam identification in graph construction
    pass
```

This topology module provides a robust foundation for geometric ML on quotient spaces, ensuring mathematical rigor through comprehensive validation while maintaining computational efficiency.