# Voronoi Quantization

How Spectral Memory maps continuous frequencies to discrete zeta zeros.

## The Problem

Physical memory operations produce continuous frequencies. But we want to organize memory around **resonance points**—the Riemann zeta zeros.

## Voronoi Cells

A Voronoi tessellation partitions space such that each point belongs to the region closest to a specific seed.

For zeta zeros {t₁, t₂, t₃, ...}:

```
Cell(tₙ) = {t ∈ ℝ⁺ : |t - tₙ| ≤ |t - tₘ| for all m ≠ n}
```

## Projection Operator

$$\Pi_{\mathcal{T}}: \mathbb{R}^+ \to \mathcal{T}$$

Maps any positive real to its nearest zeta zero:

```python
def project(t_physical: float, zeros: list[float]) -> tuple[int, float]:
    """Return (index, zero_value) of nearest zeta zero"""
    distances = [abs(t - t_physical) for t in zeros]
    n_star = np.argmin(distances)
    return n_star, zeros[n_star]
```

## Cell Properties

| Regime | Typical Cell Width | Characteristics |
|--------|-------------------|-----------------|
| STM | ~3-5 Hz | Narrow, precise |
| MID | ~5-10 Hz | Medium |
| LTM | ~10-20 Hz | Wide, compressed |

## Stress and Migration

The **mismatch** δt = t_physical - t_n* creates stress:

$$\sigma(r, \delta t) = \cos(\delta t \cdot \log r)$$

High stress indicates the memory is poorly matched to its cell:

```python
def compute_stress(t_physical: float, t_quantized: float, r: float = 1.0) -> float:
    delta_t = t_physical - t_quantized
    return np.cos(delta_t * np.log(r))
```

When stress exceeds a threshold, the memory migrates to a better cell.

## Visualization

```
Frequency (Hz)
0       14.1    21.0    25.0    30.4    32.9
├────────┼───────┼───────┼───────┼───────┤
         │  t₁   │  t₂   │  t₃   │  t₄   │
         │◄─────►│◄─────►│◄─────►│◄─────►│
         │Cell 1 │Cell 2 │Cell 3 │Cell 4 │

         ●───────────────────────► Physical frequency
              ↓
         ●   Quantized to t₂
```

## Next Steps

- [Spectral Memory](/guide/spectral-memory) — How cells organize memory
- [κζ Dynamics](/guide/kappa-zeta) — Balance affects cell selection
