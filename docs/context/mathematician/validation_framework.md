# Critical Validation Framework for Geometric ML

This document provides a comprehensive guide to the validation framework designed to prevent common failure modes in geometric machine learning pipelines.

## Overview

The validation framework addresses critical failure points identified in geometric ML implementations:

- **Mathematical validity** (connectivity, transversality, mass conservation)
- **Numerical stability** (precision, conditioning, convergence)
- **Statistical rigor** (sample sizes, multiple testing, reproducibility)
- **Performance safety** (memory limits, scaling cliffs, runtime monitoring)

## Quick Start

```python
import sys
sys.path.insert(0, 'src')
from validation import (
    check_graph_connectivity,
    validate_transversality,
    monitor_mass_conservation,
    ensure_reproducibility
)

# Ensure reproducible computation
ensure_reproducibility(seed=42)

# Validate graph connectivity before spectral analysis
A = build_graph(X, mode="additive", k=16, seed=42)
check_graph_connectivity(A, require_connected=True)

# Validate constraint manifold before dynamics
f, jacobian = build_submersion(X, method="linear", seed=42)
cert = validate_transversality(jacobian(x0.reshape(1, -1))[0])

# Monitor mass conservation in diffusion
u_final = simulate_diffusion(L, u_initial, t=0.1)
monitor_mass_conservation(u_initial, u_final)
```

## Core Validation Components

### 1. Mathematical Validity (`validation.mathematical`)

#### Graph Connectivity
```python
from validation.mathematical import check_graph_connectivity, ConnectivityError

# Check if graph is connected (required for meaningful spectral analysis)
try:
    is_connected = check_graph_connectivity(adjacency_matrix, require_connected=True)
    print(f"Graph connected: {is_connected}")
except ConnectivityError as e:
    print(f"Connectivity check failed: {e}")
    # Handle disconnected graph (e.g., add edges, analyze components separately)
```

**Why this matters**: Disconnected graphs have multiple zero eigenvalues, making spectral gap and entropy calculations meaningless.

#### Transversality Validation
```python
from validation.mathematical import validate_transversality, TransversalityError

# Validate constraint manifold is well-defined
try:
    certificate = validate_transversality(
        jacobian_matrix,
        expected_rank=2,
        condition_threshold=1e6
    )
    print(f"Transversal: {certificate['is_transversal']}")
    print(f"Condition number: {certificate['condition_number']:.2e}")
except TransversalityError as e:
    print(f"Transversality violated: {e}")
    # Handle ill-posed constraint manifold
```

**Why this matters**: Non-transversal submersions lead to degenerate constraint manifolds where constrained dynamics become ill-defined.

### 2. Numerical Stability (`validation.numerical`)

#### Mass Conservation Monitoring
```python
from validation.numerical import monitor_mass_conservation, NumericalStabilityError

# Monitor mass conservation in diffusion processes
try:
    report = monitor_mass_conservation(
        u_initial, u_final,
        tolerance=1e-6,
        relative=True
    )
    print(f"Mass conserved: {report['conserved']}")
    print(f"Mass change: {report['mass_change']:.2e}")
except NumericalStabilityError as e:
    print(f"Mass conservation violated: {e}")
    # Investigate numerical errors or non-physical behavior
```

**Why this matters**: Mass conservation violations indicate numerical errors, disconnected graphs, or non-physical diffusion processes.

#### CG Convergence Monitoring
```python
from validation.numerical import validate_cg_convergence, NumericalStabilityError

# Monitor CG solver convergence and detect stagnation
try:
    convergence_report = validate_cg_convergence(
        residual_history,
        tolerance=1e-6,
        max_stagnation_ratio=0.99
    )
    print(f"Converged: {convergence_report['converged']}")
    print(f"Stagnation detected: {convergence_report['stagnation_detected']}")
except NumericalStabilityError as e:
    print(f"CG convergence issue: {e}")
    # Consider preconditioning or increasing regularization
```

#### Eigenvalue Validation
```python
from validation.numerical import check_eigenvalue_validity, NumericalStabilityError

# Validate eigenvalue properties for matrix type
try:
    validity_report = check_eigenvalue_validity(
        eigenvalues,
        matrix_type="laplacian"
    )
    print(f"Valid eigenvalues: {validity_report['valid']}")
    print(f"Spectral gap: {validity_report['spectral_gap']}")
except NumericalStabilityError as e:
    print(f"Invalid eigenvalues: {e}")
```

### 3. Statistical Rigor (`validation.statistical`)

#### Bootstrap Sample Size Validation
```python
from validation.statistical import validate_bootstrap_size, StatisticalValidityError

# Ensure adequate bootstrap sample size for reliable CIs
try:
    bootstrap_report = validate_bootstrap_size(n_bootstrap=2000)
    print(f"Reliability: {bootstrap_report['reliability_level']}")
except StatisticalValidityError as e:
    print(f"Insufficient bootstrap samples: {e}")
    # Increase bootstrap sample size
```

#### Separability Null Testing
```python
from validation.statistical import check_separability_null

# Validate separability test doesn't show false positives
def my_separability_test(sample1, sample2):
    from stats.separability import separability_test
    return separability_test(sample1, sample2, method="ttest")

null_report = check_separability_null(
    identical_sample1, identical_sample2,
    my_separability_test,
    n_trials=100
)
print(f"Valid null behavior: {null_report['valid_null_behavior']}")
print(f"Type I error rate: {null_report['observed_type1_rate']:.3f}")
```

#### Multiple Testing Correction
```python
from validation.statistical import apply_multiple_testing_correction

# Apply proper multiple testing correction
correction_result = apply_multiple_testing_correction(
    p_values,
    method="holm",  # or "bonferroni", "benjamini_hochberg"
    alpha=0.05
)
print(f"Significant tests: {correction_result['n_significant_corrected']}/{correction_result['n_tests']}")
```

### 4. Reproducibility (`validation.reproducibility`)

#### Comprehensive Reproducibility Setup
```python
from validation.reproducibility import (
    ensure_reproducibility, compute_data_hash,
    log_experiment_config, verify_data_integrity
)

# Ensure reproducible computation
reproduction_report = ensure_reproducibility(seed=42, libraries=["numpy", "random"])
print(f"Reproducible: {reproduction_report['reproducible']}")

# Compute data integrity hash
data_hash = compute_data_hash(dataset)
print(f"Data hash: {data_hash}")

# Log experiment configuration
config = {
    "dataset": "synthetic_gaussians",
    "n": 1000, "k": 16,
    "method": "additive",
    "seed": 42
}
config_json = log_experiment_config(config, "experiment_config.json")

# Verify data integrity
verify_data_integrity(dataset, expected_hash=data_hash)
```

### 5. Performance Monitoring (`validation.performance`)

#### Memory Limit Checking
```python
from validation.performance import check_memory_limits, PerformanceError

# Check memory requirements before large operations
try:
    memory_report = check_memory_limits(
        matrix_size=(50000, 50000),
        dtype=np.float64,
        max_memory_gb=32.0
    )
    print(f"Within limits: {memory_report['within_limits']}")
except PerformanceError as e:
    print(f"Memory limit exceeded: {e}")
    # Use sparse matrices or iterative methods
```

#### Scaling Cliff Detection
```python
from validation.performance import detect_scaling_cliffs

def test_algorithm(n):
    # Your algorithm here
    return time_algorithm_with_size_n(n)

# Detect sudden performance degradation
try:
    cliff_report = detect_scaling_cliffs(
        n_values=[100, 200, 500, 1000, 2000],
        complexity_test_func=test_algorithm,
        cliff_threshold=10.0
    )
    print(f"Cliffs detected: {cliff_report['cliff_count']}")
except PerformanceError as e:
    print(f"Scaling cliffs found: {e}")
```

## Validation Workflow Examples

### Complete Geometric ML Pipeline Validation

```python
import numpy as np
from validation import *

def validated_geometric_ml_pipeline(X, seed=42):
    \"\"\"Complete geometric ML pipeline with comprehensive validation.\"\"\"

    # 1. REPRODUCIBILITY
    ensure_reproducibility(seed)
    data_hash = compute_data_hash(X)

    # 2. PERFORMANCE CHECKS
    n, d = X.shape
    if n > 1000:
        check_memory_limits((n, n), max_memory_gb=8.0)

    # 3. GRAPH CONSTRUCTION + VALIDATION
    from graphs.knn import build_graph
    from graphs.laplacian import laplacian

    A = build_graph(X, mode="additive", k=min(16, n-1), seed=seed)
    check_graph_connectivity(A, require_connected=True)
    L = laplacian(A, normalized=True)

    # 4. SPECTRAL ANALYSIS + VALIDATION
    from solvers.lanczos import topk_eigs
    evals, evecs = topk_eigs(L, k=min(10, n-1), which="SM")
    check_eigenvalue_validity(evals, matrix_type="laplacian")

    # 5. CONSTRAINT MANIFOLD + VALIDATION
    from geometry.submersion import build_submersion
    f, jacobian = build_submersion(X, method="linear", seed=seed)

    # Sample points for transversality validation
    n_samples = min(20, n)
    sample_indices = np.random.choice(n, n_samples, replace=False)
    for i in sample_indices:
        x = X[i:i+1]  # Keep 2D shape
        J_f = jacobian(x)[0]  # Get 2D jacobian
        validate_transversality(J_f, expected_rank=2)

    # 6. DIFFUSION SIMULATION + VALIDATION
    from dynamics.diffusion import simulate_diffusion
    u0 = np.zeros(n)
    u0[0] = 1.0  # Point source

    u_t = simulate_diffusion(L, u0, t=0.1, method="krylov")
    monitor_mass_conservation(u0, u_t, tolerance=1e-6)

    # 7. STATISTICAL ANALYSIS + VALIDATION
    from stats.spectra import spectral_gap, spectral_entropy
    gap = spectral_gap(L)
    entropy = spectral_entropy(L, k=5)

    # Bootstrap validation for confidence intervals
    validate_bootstrap_size(1000)  # If using bootstrap CIs

    return {
        "eigenvalues": evals,
        "spectral_gap": gap,
        "spectral_entropy": entropy,
        "diffusion_result": u_t,
        "data_hash": data_hash,
        "validation_passed": True
    }

# Usage
X = np.random.normal(size=(100, 3))
results = validated_geometric_ml_pipeline(X, seed=42)
print("Pipeline completed with full validation!")
```

### Additive vs Multiplicative Mode Comparison with Validation

```python
def validated_mode_comparison(X, seed=42):
    \"\"\"Compare additive vs multiplicative modes with statistical validation.\"\"\"

    ensure_reproducibility(seed)

    # Compute statistics for both modes
    from stats.spectra import spectral_gap_additive, spectral_gap_multiplicative

    n_trials = 10
    gaps_additive = []
    gaps_multiplicative = []

    for trial in range(n_trials):
        # Add small perturbations
        X_pert = X + 0.01 * np.random.normal(size=X.shape)

        gap_add = spectral_gap_additive(X_pert, neighbors=8, seed=seed+trial)
        gap_mult = spectral_gap_multiplicative(X_pert, neighbors=8, seed=seed+trial)

        gaps_additive.append(gap_add)
        gaps_multiplicative.append(gap_mult)

    # Statistical validation
    from stats.separability import separability_test
    separability_result = separability_test(
        np.array(gaps_additive),
        np.array(gaps_multiplicative),
        method="ttest"
    )

    # Validate test doesn't show false positives
    check_separability_null(
        gaps_additive[:5], gaps_additive[5:],
        lambda s1, s2: separability_test(s1, s2, method="ttest"),
        n_trials=20
    )

    return {
        "additive_gaps": gaps_additive,
        "multiplicative_gaps": gaps_multiplicative,
        "separable": separability_result["separable"],
        "p_value": separability_result["p_value"],
        "effect_size": separability_result["effect_size"]
    }
```

## Error Handling and Recovery

### Common Validation Failures and Solutions

```python
def robust_geometric_ml_with_recovery(X, seed=42):
    \"\"\"Geometric ML pipeline with error recovery strategies.\"\"\"

    try:
        ensure_reproducibility(seed)
    except ReproducibilityError as e:
        print(f"Reproducibility warning: {e}")
        # Continue with reduced reproducibility guarantees

    try:
        A = build_graph(X, mode="additive", k=16, seed=seed)
        check_graph_connectivity(A, require_connected=True)
    except ConnectivityError:
        print("Graph disconnected - reducing k or adding random edges")
        # Recovery: reduce k or add random connections
        A = build_graph(X, mode="additive", k=8, seed=seed)
        check_graph_connectivity(A, require_connected=False)

    try:
        f, jacobian = build_submersion(X, method="linear", seed=seed)
        # Test transversality on a sample point
        x_test = X[0:1]
        J_f = jacobian(x_test)[0]
        validate_transversality(J_f, expected_rank=2)
    except TransversalityError:
        print("Transversality failed - using simpler constraint")
        # Recovery: use identity or simpler submersion
        f, jacobian = build_submersion(X, method="identity", seed=seed)

    try:
        L = laplacian(A, normalized=True)
        u0 = np.zeros(X.shape[0])
        u0[0] = 1.0
        u_t = simulate_diffusion(L, u0, t=0.1)
        monitor_mass_conservation(u0, u_t, tolerance=1e-6)
    except NumericalStabilityError as e:
        print(f"Numerical stability issue: {e}")
        # Recovery: use more conservative parameters
        u_t = simulate_diffusion(L, u0, t=0.01, method="eigendecomp")
        monitor_mass_conservation(u0, u_t, tolerance=1e-3)

    return {"status": "completed_with_recovery", "result": u_t}
```

## Performance Decorator Examples

```python
from validation.performance import monitor_operation_performance

@monitor_operation_performance("graph_construction", max_time=60.0, max_memory_mb=1024)
def build_large_graph(X, k=16):
    return build_graph(X, mode="additive", k=k)

@monitor_operation_performance("eigenvalue_computation", max_time=30.0)
def compute_spectrum(L, k=10):
    return topk_eigs(L, k=k, which="SM")

# Usage automatically monitors performance
X = np.random.normal(size=(1000, 5))
A = build_large_graph(X, k=16)  # Will raise PerformanceError if too slow/memory-intensive
L = laplacian(A, normalized=True)
evals, evecs = compute_spectrum(L, k=10)
```

## Best Practices

### 1. Always Use Validation in Production
```python
# ❌ Risky - no validation
A = build_graph(X, mode="additive", k=16)
L = laplacian(A, normalized=True)
gap = spectral_gap(L)

# ✅ Safe - with validation
A = build_graph(X, mode="additive", k=16, seed=42)
check_graph_connectivity(A, require_connected=True)
L = laplacian(A, normalized=True)
evals, _ = topk_eigs(L, k=5, which="SM")
check_eigenvalue_validity(evals, matrix_type="laplacian")
gap = evals[1] if len(evals) > 1 else 0.0
```

### 2. Log All Validation Results
```python
import json
from pathlib import Path

validation_log = {
    "timestamp": time.time(),
    "data_hash": compute_data_hash(X),
    "connectivity_passed": True,
    "transversality_passed": True,
    "mass_conservation_error": 1.2e-8,
    "bootstrap_size": 2000,
    "separability_p_value": 0.003
}

# Save validation log
log_path = Path("validation_logs") / f"validation_{int(time.time())}.json"
log_path.parent.mkdir(exist_ok=True)
with open(log_path, 'w') as f:
    json.dump(validation_log, f, indent=2)
```

### 3. Use Validation in CI/CD
```python
def test_geometric_ml_validation():
    \"\"\"Integration test for validation framework in CI/CD.\"\"\"
    X = np.random.normal(size=(50, 3))

    # All validations should pass for well-formed synthetic data
    ensure_reproducibility(42)
    A = build_graph(X, mode="additive", k=8, seed=42)
    assert check_graph_connectivity(A)

    L = laplacian(A, normalized=True)
    evals, _ = topk_eigs(L, k=5, which="SM")
    validity_report = check_eigenvalue_validity(evals, matrix_type="laplacian")
    assert validity_report["valid"]

    print("✅ All validation checks passed in CI/CD")
```

## Troubleshooting Guide

| Error Type | Common Causes | Solutions |
|------------|---------------|-----------|
| `ConnectivityError` | k too small, disconnected data | Increase k, check data clustering |
| `TransversalityError` | Rank-deficient Jacobian | Regularize constraints, check data dimension |
| `NumericalStabilityError` | Poor conditioning, large time steps | Add regularization, reduce step size |
| `StatisticalValidityError` | Small sample sizes | Increase bootstrap samples, collect more data |
| `ReproducibilityError` | Missing seeds, library conflicts | Set all random seeds, check library versions |
| `PerformanceError` | Large matrices, O(n³) algorithms | Use sparse methods, reduce problem size |

This validation framework provides comprehensive protection against the most common failure modes in geometric ML pipelines while maintaining computational efficiency and statistical rigor.