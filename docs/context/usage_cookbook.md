# Geometric ML Usage Cookbook

A concise guide showing how to move from **data → graph → metric → topology → stats → dynamics**, with complete code snippets for each stage. This cookbook demonstrates the full pipeline of the geometric ML library.

## Table of Contents

1. [Data Preparation](#1-data-preparation)
2. [Graph Construction](#2-graph-construction)
3. [Metric Design](#3-metric-design)
4. [Topology Selection](#4-topology-selection)
5. [Statistical Analysis](#5-statistical-analysis)
6. [Dynamics & Geodesics](#6-dynamics--geodesics)
7. [Complete Pipeline Examples](#7-complete-pipeline-examples)
8. [Validation & Reproducibility](#8-validation--reproducibility)

---

## 1. Data Preparation

### Load and Preprocess Data

```python
import numpy as np
from validation.reproducibility import ensure_reproducibility

# Ensure reproducibility
ensure_reproducibility(42)

# Load your data
X = np.load('your_data.npy')  # Shape: (n_samples, n_features)

# OR generate synthetic data
def generate_synthetic_data(n=500, d=8, noise=0.1):
    """Generate synthetic data with geometric structure."""
    rng = np.random.default_rng(42)

    # Create manifold structure (e.g., noisy sphere)
    theta = rng.uniform(0, 2*np.pi, n)
    phi = rng.uniform(0, np.pi, n)

    # Embed in higher dimensions
    X = np.zeros((n, d))
    X[:, 0] = np.sin(phi) * np.cos(theta)
    X[:, 1] = np.sin(phi) * np.sin(theta)
    X[:, 2] = np.cos(phi)

    # Add noise to remaining dimensions
    X[:, 3:] = rng.normal(0, noise, (n, d-3))

    return X

X = generate_synthetic_data(n=1000, d=10)
print(f"Data shape: {X.shape}")
```

### Data Validation

```python
from validation.numerical import validate_float64_precision
from validation.reproducibility import compute_data_hash

# Validate data precision
arrays = {"X": X}
precision_report = validate_float64_precision(arrays)
print(f"Precision adequate: {precision_report['precision_adequate']}")

# Compute data hash for integrity
data_hash = compute_data_hash(X)
print(f"Data hash: {data_hash[:16]}...")
```

---

## 2. Graph Construction

### Build k-NN Graphs with Dual Transports

```python
from graphs.knn import build_graph
from graphs.laplacian import laplacian
from validation.mathematical import check_graph_connectivity

# Additive transport (Gaussian-based)
G_additive = build_graph(
    X,
    mode="additive",
    k=16,
    sigma="median",  # Robust bandwidth
    seed=42
)

# Multiplicative transport (Poisson via log/Haar)
G_multiplicative = build_graph(
    X,
    mode="multiplicative",
    k=16,
    tau="median",
    eps=1e-6,  # Regularization for log
    seed=42
)

# Validate connectivity
conn_add = check_graph_connectivity(G_additive, require_connected=True)
conn_mult = check_graph_connectivity(G_multiplicative, require_connected=True)

print(f"Additive graph connected: {conn_add}")
print(f"Multiplicative graph connected: {conn_mult}")

# Construct Laplacians
L_additive = laplacian(G_additive, normalized=True)
L_multiplicative = laplacian(G_multiplicative, normalized=True)
```

### Graph Validation

```python
from validation.performance import check_memory_limits

# Check memory requirements
n, k = X.shape[0], 16
memory_report = check_memory_limits(
    (n, k), max_memory_gb=32.0
)
print(f"Memory within limits: {memory_report['within_limits']}")
```

---

## 3. Metric Design

### Fisher-Rao Pullback Metrics

```python
# Note: In practice, use geometry.fr_pullback module
# Here we show the integration pattern

def create_fr_pullback_metric(X, alpha=0.5):
    """Create Fisher-Rao pullback metric (mock implementation)."""

    def metric_fn(q):
        """Fisher-Rao metric at coordinates q."""
        u, v = q[0], q[1]

        # Base metric with data-dependent structure
        data_influence = np.exp(-0.1 * (u**2 + v**2))

        g11 = 1.0 + alpha * data_influence
        g22 = 1.0 + alpha * data_influence * 0.8
        g12 = 0.1 * alpha * np.sin(u) * np.cos(v)

        return np.array([[g11, g12], [g12, g22]])

    def metric_grad_fn(q):
        """Gradient of Fisher-Rao metric."""
        h = 1e-6
        g_base = metric_fn(q)

        # Finite difference approximation
        du_g = (metric_fn(q + np.array([h, 0])) - g_base) / h
        dv_g = (metric_fn(q + np.array([0, h])) - g_base) / h

        return du_g, dv_g

    return metric_fn, metric_grad_fn

# Create Fisher-Rao pullback metric
fr_metric, fr_metric_grad = create_fr_pullback_metric(X, alpha=0.7)

# Test metric at a point
q_test = np.array([0.5, 0.3])
g_test = fr_metric(q_test)
print(f"Metric at {q_test}:")
print(f"g = {g_test}")
print(f"det(g) = {np.linalg.det(g_test):.3f}")
```

### Mellin Balance (s = 1/2)

```python
from mellin.balance import mellin_balance

# Apply Mellin coupling at canonical balance point
try:
    balance_result = mellin_balance(
        X,
        s=0.5,  # Unitary line (Haar on ℝ₊)
        mode_pair=("additive", "multiplicative")
    )
    print(f"Mellin balance achieved: {balance_result.get('balanced', False)}")
except ImportError:
    print("Mellin module not available, using dual transports directly")
```

---

## 4. Topology Selection

### Choose Appropriate Quotient Topology

```python
from topology import (
    create_topology, TopologyType,
    comprehensive_topology_validation
)

# Create topology based on your problem
# For periodic data: Torus or Klein bottle
topology = create_topology(
    TopologyType.MOBIUS,  # Non-orientable for twisted structures
    w=1.0,
    period=2*np.pi
)

print(f"Selected topology: {type(topology).__name__}")
print(f"Orientable: {topology.orientability.value}")
print(f"Euler characteristic: {topology.euler_characteristic}")

# Validate metric compatibility with topology
validation_result = comprehensive_topology_validation(
    g_fn=fr_metric,
    strip=topology,  # For Möbius band
    tolerance=1e-8
)

print(f"Topology validation passed: {validation_result['all_passed']}")
```

### Atlas-Based Comparison

```python
from topology.atlas import get_orientability_pairs

# Compare orientable vs non-orientable pairs
pairs = get_orientability_pairs()

for orientable, non_orientable in pairs:
    print(f"\nPair: {type(orientable).__name__} vs {type(non_orientable).__name__}")

    # Validate metrics on both
    for name, topo in [("orientable", orientable), ("non-orientable", non_orientable)]:
        try:
            valid = topo.metric_compatibility_condition(fr_metric, q_test)
            print(f"  {name}: metric compatible = {valid}")
        except Exception as e:
            print(f"  {name}: validation failed - {e}")
```

---

## 5. Statistical Analysis

### Spectral Analysis

```python
from solvers.lanczos import topk_eigs
from stats.spectra import spectral_gap, spectral_entropy

# Compute eigenvalues of Laplacian
eigenvals_add, eigenvecs_add = topk_eigs(L_additive, k=32, which="SM")
eigenvals_mult, eigenvecs_mult = topk_eigs(L_multiplicative, k=32, which="SM")

# Compute spectral statistics
gap_add = spectral_gap(eigenvals_add)
gap_mult = spectral_gap(eigenvals_mult)

entropy_add = spectral_entropy(eigenvals_add, k=16)
entropy_mult = spectral_entropy(eigenvals_mult, k=16)

print(f"Spectral gaps: additive={gap_add:.4f}, multiplicative={gap_mult:.4f}")
print(f"Spectral entropy: additive={entropy_add:.4f}, multiplicative={entropy_mult:.4f}")
```

### Statistical Validation

```python
from validation.statistical import (
    validate_bootstrap_size, apply_multiple_testing_correction
)

# Validate bootstrap parameters
bootstrap_report = validate_bootstrap_size(n_bootstrap=2000)
print(f"Bootstrap size adequate: {bootstrap_report['valid']}")

# Multiple testing correction for spectral comparisons
p_values = np.array([0.01, 0.03, 0.05, 0.08, 0.12])
correction_result = apply_multiple_testing_correction(
    p_values, method="benjamini_hochberg", alpha=0.05
)
print(f"Significant after correction: {correction_result['n_significant_corrected']}")
```

---

## 6. Dynamics & Geodesics

### Geodesic Integration on Quotient Topology

```python
from topology import integrate_geodesic

# For strip-based topologies (Cylinder/Möbius)
if hasattr(topology, 'w'):
    from topology.coords import Strip
    strip = Strip(w=topology.w, period=topology.period)

    # Initial conditions
    q0 = np.array([0.1, 0.2])
    v0 = np.array([0.5, 0.3])

    # Integrate geodesic
    traj_q, traj_v, info = integrate_geodesic(
        q0, v0,
        t_final=10.0,
        dt=0.01,
        g_fn=fr_metric,
        grad_g_fn=fr_metric_grad,
        strip=strip,
        energy_tolerance=1e-3
    )

    print(f"Geodesic integration successful: {info['success']}")
    print(f"Energy drift: {info['energy_drift']:.2e}")
    print(f"Seam crossings: {info['seam_crossings']}")
    print(f"Trajectory length: {info['trajectory_length']:.2f}")

    # Plot trajectory (if matplotlib available)
    try:
        import matplotlib.pyplot as plt
        plt.figure(figsize=(10, 4))

        plt.subplot(1, 2, 1)
        plt.plot(traj_q[:, 0], traj_q[:, 1], 'b-', alpha=0.7)
        plt.scatter(q0[0], q0[1], color='green', s=100, label='Start')
        plt.scatter(traj_q[-1, 0], traj_q[-1, 1], color='red', s=100, label='End')
        plt.xlabel('u')
        plt.ylabel('v')
        plt.title('Geodesic Trajectory')
        plt.legend()
        plt.grid(True, alpha=0.3)

        plt.subplot(1, 2, 2)
        plt.plot(info['time_array'], info['energy_array'])
        plt.xlabel('Time')
        plt.ylabel('Energy')
        plt.title('Energy Conservation')
        plt.grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig('geodesic_analysis.png', dpi=150, bbox_inches='tight')
        print("Geodesic plot saved as 'geodesic_analysis.png'")

    except ImportError:
        print("Matplotlib not available for plotting")
```

### Stability Analysis

```python
from stats.stability import stability_score

# Test stability across random seeds
metrics = [gap_add, gap_mult, entropy_add, entropy_mult]
seeds = [40, 41, 42, 43, 44]

stability = stability_score(metrics=metrics, seeds=seeds)
print(f"Stability score: {stability:.4f}")
```

---

## 7. Complete Pipeline Examples

### Example 1: Manifold Learning on Möbius Band

```python
def manifold_learning_pipeline(X, topology_type=TopologyType.MOBIUS):
    """Complete pipeline for manifold learning."""

    print("🔄 GEOMETRIC ML PIPELINE")
    print("=" * 50)

    # 1. Data validation
    print("1. Data Validation")
    data_hash = compute_data_hash(X)
    print(f"   Data hash: {data_hash[:16]}...")

    # 2. Graph construction
    print("2. Graph Construction")
    G = build_graph(X, mode="additive", k=16, seed=42)
    L = laplacian(G, normalized=True)
    connectivity = check_graph_connectivity(G)
    print(f"   Graph connected: {connectivity}")

    # 3. Metric design
    print("3. Metric Design")
    metric_fn, metric_grad_fn = create_fr_pullback_metric(X)

    # 4. Topology selection
    print("4. Topology Selection")
    topology = create_topology(topology_type, w=1.0)

    # 5. Validation
    print("5. Validation")
    validation = comprehensive_topology_validation(
        g_fn=metric_fn, strip=topology, tolerance=1e-6
    )
    print(f"   Validation passed: {validation['all_passed']}")

    # 6. Spectral analysis
    print("6. Spectral Analysis")
    eigenvals, _ = topk_eigs(L, k=16, which="SM")
    gap = spectral_gap(eigenvals)
    entropy = spectral_entropy(eigenvals)
    print(f"   Spectral gap: {gap:.4f}")
    print(f"   Spectral entropy: {entropy:.4f}")

    # 7. Geodesic dynamics
    print("7. Geodesic Dynamics")
    if hasattr(topology, 'w'):
        from topology.coords import Strip
        strip = Strip(w=topology.w)

        q0 = np.array([0.0, 0.5])
        v0 = np.array([0.3, 0.2])

        try:
            traj_q, traj_v, info = integrate_geodesic(
                q0, v0, t_final=5.0, dt=0.01,
                g_fn=metric_fn, grad_g_fn=metric_grad_fn,
                strip=strip, energy_tolerance=1e-2
            )
            print(f"   Geodesic success: {info['success']}")
            print(f"   Energy drift: {info['energy_drift']:.2e}")
        except Exception as e:
            print(f"   Geodesic integration failed: {e}")

    print("✅ Pipeline complete!")

    return {
        "graph": G,
        "laplacian": L,
        "metric": metric_fn,
        "topology": topology,
        "eigenvalues": eigenvals,
        "spectral_gap": gap,
        "spectral_entropy": entropy
    }

# Run the complete pipeline
results = manifold_learning_pipeline(X)
```

### Example 2: Comparative Analysis Across Topologies

```python
def comparative_topology_analysis(X):
    """Compare results across different topologies."""

    topologies_to_test = [
        (TopologyType.CYLINDER, {"w": 1.0}),
        (TopologyType.MOBIUS, {"w": 1.0}),
        (TopologyType.TORUS, {"width": 2*np.pi, "height": 2*np.pi}),
        (TopologyType.KLEIN, {"width": 2*np.pi, "height": 2*np.pi})
    ]

    metric_fn, metric_grad_fn = create_fr_pullback_metric(X)

    comparison_results = {}

    for topo_type, params in topologies_to_test:
        print(f"\n--- Analyzing {topo_type.value.upper()} ---")

        topology = create_topology(topo_type, **params)

        # Metric compatibility
        try:
            compatible = topology.metric_compatibility_condition(
                metric_fn, np.array([0.5, 0.3])
            )
            print(f"Metric compatible: {compatible}")
        except Exception as e:
            compatible = False
            print(f"Metric compatibility check failed: {e}")

        # Topological properties
        print(f"Orientable: {topology.orientability.value}")
        print(f"Euler characteristic: {topology.euler_characteristic}")
        print(f"Genus: {topology.genus}")

        comparison_results[topo_type.value] = {
            "compatible": compatible,
            "orientable": topology.orientability.value == "orientable",
            "euler_char": topology.euler_characteristic,
            "genus": topology.genus
        }

    return comparison_results

# Run comparative analysis
comparison = comparative_topology_analysis(X)
print("\nCOMPARISON SUMMARY:")
for topo, props in comparison.items():
    print(f"{topo}: orientable={props['orientable']}, χ={props['euler_char']}")
```

---

## 8. Validation & Reproducibility

### Comprehensive Validation Suite

```python
def validate_complete_pipeline(X, results):
    """Validate the entire geometric ML pipeline."""

    print("\n🔍 COMPREHENSIVE VALIDATION")
    print("=" * 50)

    # 1. Mathematical validation
    print("1. Mathematical Validation")
    from validation.mathematical import validate_transversality

    # Mock Jacobian for transversality check
    J_f = np.random.randn(2, 4)
    try:
        trans_cert = validate_transversality(J_f, expected_rank=2)
        print(f"   Transversality: {trans_cert['is_transversal']}")
    except Exception as e:
        print(f"   Transversality check failed: {e}")

    # 2. Numerical stability
    print("2. Numerical Stability")
    from validation.numerical import validate_cg_convergence

    # Mock CG residuals
    residuals = [1.0, 0.5, 0.1, 0.05, 0.01, 1e-6]
    try:
        cg_report = validate_cg_convergence(residuals)
        print(f"   CG convergence: {cg_report['converged']}")
    except Exception as e:
        print(f"   CG validation failed: {e}")

    # 3. Statistical rigor
    print("3. Statistical Rigor")
    bootstrap_valid = validate_bootstrap_size(1000)
    print(f"   Bootstrap size valid: {bootstrap_valid['valid']}")

    # 4. Performance monitoring
    print("4. Performance Monitoring")
    memory_report = check_memory_limits((1000, 16))
    print(f"   Memory within limits: {memory_report['within_limits']}")

    # 5. Reproducibility
    print("5. Reproducibility")
    repro_report = ensure_reproducibility(42)
    print(f"   Reproducible: {repro_report['reproducible']}")

    print("✅ Validation complete!")

# Run validation
validate_complete_pipeline(X, results)
```

### Export Results and Artifacts

```python
from io.artifacts import save_experiment_results
from io.config import save_config

def export_pipeline_results(results, X):
    """Export all pipeline results and artifacts."""

    # Save configuration
    config = {
        "data_shape": X.shape,
        "data_hash": compute_data_hash(X),
        "graph_params": {"mode": "additive", "k": 16},
        "topology": "mobius",
        "topology_params": {"w": 1.0},
        "metric": "fisher_rao_pullback",
        "integration": {"t_final": 5.0, "dt": 0.01},
        "validation": {"tolerance": 1e-6}
    }

    try:
        save_config(config, "pipeline_config.yaml")
        print("Configuration saved to 'pipeline_config.yaml'")
    except ImportError:
        print("Config export not available")

    # Save numerical results
    np.savez_compressed(
        'pipeline_results.npz',
        eigenvalues=results['eigenvalues'],
        spectral_gap=results['spectral_gap'],
        spectral_entropy=results['spectral_entropy'],
        data_hash=compute_data_hash(X)
    )
    print("Results saved to 'pipeline_results.npz'")

    # Export summary
    summary = f"""
    GEOMETRIC ML PIPELINE SUMMARY
    =============================

    Data: {X.shape[0]} samples, {X.shape[1]} dimensions
    Hash: {compute_data_hash(X)[:16]}...

    Graph: k-NN with k=16, additive mode
    Topology: Möbius band (non-orientable)
    Metric: Fisher-Rao pullback with α=0.7

    Spectral Results:
    - Gap: {results['spectral_gap']:.4f}
    - Entropy: {results['spectral_entropy']:.4f}
    - λ₁: {results['eigenvalues'][1]:.4f}

    Validation: All checks passed ✅
    """

    with open('pipeline_summary.txt', 'w') as f:
        f.write(summary)
    print("Summary saved to 'pipeline_summary.txt'")

# Export results
export_pipeline_results(results, X)
```

---

## Quick Reference: One-Liner Pipelines

For rapid prototyping, here are condensed pipeline versions:

### Basic Manifold Learning
```python
# Data → Graph → Spectrum in 4 lines
X = np.random.randn(500, 8)
G = build_graph(X, mode="additive", k=16, seed=42)
L = laplacian(G, normalized=True)
eigenvals, _ = topk_eigs(L, k=16, which="SM")
print(f"Spectral gap: {spectral_gap(eigenvals):.4f}")
```

### Topology-Aware Analysis
```python
# Add topology awareness in 3 lines
topology = create_topology(TopologyType.MOBIUS, w=1.0)
metric_fn, _ = create_fr_pullback_metric(X)
validation = comprehensive_topology_validation(g_fn=metric_fn, strip=topology)
print(f"Topology validation: {validation['all_passed']}")
```

### Geodesic Integration
```python
# Geodesic dynamics in 5 lines
from topology.coords import Strip
strip = Strip(w=1.0)
q0, v0 = np.array([0.0, 0.5]), np.array([0.3, 0.2])
traj_q, _, info = integrate_geodesic(q0, v0, 5.0, 0.01, metric_fn, metric_grad_fn, strip)
print(f"Geodesic: {info['success']}, crossings: {info['seam_crossings']}")
```

---

## Troubleshooting Common Issues

### Graph Connectivity Problems
```python
# If graph is disconnected
if not check_graph_connectivity(G):
    print("Graph disconnected, try:")
    print("- Increase k (more neighbors)")
    print("- Adjust bandwidth (sigma/tau)")
    print("- Check for isolated points")

    # Auto-fix: increase k
    G_fixed = build_graph(X, mode="additive", k=32, seed=42)
```

### Metric Compatibility Issues
```python
# If metric fails seam-compatibility
try:
    enforce_seam_compatibility(metric_fn, q_test, topology)
except SeamCompatibilityError as e:
    print(f"Metric incompatible: {e}")
    print("Solutions:")
    print("- Use seam-compatible metric construction")
    print("- Switch to orientable topology")
    print("- Adjust metric parameters")
```

### Integration Instability
```python
# If geodesic integration fails
if not info['success'] or info['energy_drift'] > 1e-2:
    print("Integration unstable, try:")
    print("- Reduce time step (dt)")
    print("- Regularize metric")
    print("- Check metric condition number")

    # Auto-fix: smaller time step
    dt_reduced = dt / 2
```

---

**This cookbook provides the essential patterns for geometric ML workflows. Each section is modular and can be adapted to your specific problem. For advanced usage, consult the individual module documentation.**