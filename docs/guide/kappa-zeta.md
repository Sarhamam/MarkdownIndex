# κζ Dynamics

The kappa-zeta (κζ) metric is the heartbeat of Noetic Eidos—a real-time measure of attention balance.

## Definition

$$\kappa\zeta = \frac{M_\tau}{M_\sigma}$$

Where:
- **M_τ** = radial moment (τ pathway concentration)
- **M_σ** = angular moment (σ pathway concentration)

## The Critical Line

When κζ ≈ 1.0, the system operates on what we call the **critical line**—a reference to the Riemann Hypothesis where all non-trivial zeros of ζ(s) lie on Re(s) = ½.

::: info Mathematical Connection
Just as the critical line represents a balance point in number theory, κζ = 1.0 represents optimal attention balance between exploration and exploitation.
:::

## Regime Map

```
κζ = 0.5 ──── κζ = 1.0 ──── κζ = 1.5
   │            │             │
   ▼            ▼             ▼
σ-dominant   Critical    τ-dominant
(exploit)    (balanced)   (explore)
```

| Regime | κζ Range | Behavior |
|--------|----------|----------|
| Deep σ | < 0.7 | Highly focused, may miss context |
| Balanced | 0.8 - 1.2 | Optimal generalization |
| Deep τ | > 1.3 | Diffuse attention, may lack precision |

## ζ-Normalization

To maintain stability, we apply feedback control:

$$\beta' = \beta \left[1 + \tanh(\alpha_\beta (\kappa\zeta - 1))\right]$$

$$\tau' = \tau \left[1 - \tanh(\alpha_\tau (\kappa\zeta - 1))\right]$$

### How It Works

1. **κζ > 1** (too exploratory):
   - Increase β (σ influence) → more exploitation
   - Decrease τ (temperature) → sharper τ attention

2. **κζ < 1** (too exploitative):
   - Decrease β → less σ influence
   - Increase τ → broader τ attention

3. **κζ ≈ 1** (balanced):
   - Minimal adjustments
   - System is stable

## Smoothing

Raw κζ can be noisy. We apply exponential weighted moving average (EWMA):

```python
kz_smoothed = α * kz_raw + (1 - α) * kz_previous
```

Typical α = 0.1 for gradual adaptation.

## Monitoring κζ

```python
from noetic_eidos import ZetaFormer, KappaZetaMonitor

monitor = KappaZetaMonitor(
    alert_threshold=0.3,  # Alert if |κζ - 1| > 0.3
    window_size=100       # Rolling window
)

# During inference
output, kz_state = zetaformer.forward(query, keys, values)
monitor.record(kz_state)

if monitor.is_unstable():
    print(f"⚠️ κζ drift detected: {monitor.trend}")
```

## Visualizing κζ

The κζ trajectory over time reveals system behavior:

```
κζ
1.5 │    ╭─╮
    │   ╭╯ ╰╮     ╭─╮
1.0 │───────────────────── critical line
    │         ╰╮ ╭╯
0.5 │          ╰─╯
    └────────────────────► time
```

- **Oscillations**: Normal adaptation
- **Drift**: May need retuning
- **Spikes**: Unusual input

## Next Steps

- [Spectral Memory](/guide/spectral-memory) — How κζ affects memory routing
- [Fisher-Rao Geometry](/guide/fisher-rao) — The geometric foundations
