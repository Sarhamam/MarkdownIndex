# Spectral Memory

Spectral Memory OS manages information storage using frequency-domain principles, with quantization to Riemann zeta zeros.

## Overview

Traditional memory stores data by recency or similarity. Spectral Memory adds a **frequency dimension**—organizing memories by their natural resonance frequency.

```
┌─────────────────────────────────────────────┐
│  STM (t > 100)  │  MID (30-100)  │  LTM (<30)  │
│  ═══════════════│════════════════│═══════════  │
│  Hot, coherent  │  Transitional  │ Cold, stable│
└─────────────────────────────────────────────┘
```

## Memory Regimes

### STM (Short-Term Memory)

- **Frequency**: t > 100
- **Cell width**: Narrow (high precision)
- **Access**: Fast, phase-coherent
- **Decay**: Rapid without reinforcement

### MID (Transitional)

- **Frequency**: 30 < t < 100
- **Cell width**: Medium
- **Access**: Moderate latency
- **Role**: Buffer between STM and LTM

### LTM (Long-Term Memory)

- **Frequency**: t < 30
- **Cell width**: Wide (lossy compression)
- **Access**: Slower, entropy-bound
- **Decay**: Very slow

## Voronoi Quantization

Physical frequencies snap to the nearest Riemann zeta zero:

$$\Pi_{\mathcal{T}}: \mathbb{R}^+ \to \mathcal{T}$$

Where 𝓣 = {t₁, t₂, t₃, ...} are the imaginary parts of zeta zeros:

| n | tₙ |
|---|-----|
| 1 | 14.135 |
| 2 | 21.022 |
| 3 | 25.011 |
| 4 | 30.425 |
| 5 | 32.935 |
| ... | ... |

### Why Zeta Zeros?

Zeta zeros have **optimal spacing** for frequency quantization—they're distributed to minimize resonance interference.

```python
ZETA_ZEROS = [14.135, 21.022, 25.011, 30.425, 32.935, ...]

def quantize(t_physical: float) -> float:
    """Project to nearest zeta zero"""
    distances = [abs(t - t_physical) for t in ZETA_ZEROS]
    n_star = np.argmin(distances)
    return ZETA_ZEROS[n_star]
```

### Stress Terms

The mismatch δt = t_physical - t_n* creates stress:

$$\text{stress} = \cos(\delta t \cdot \log r)$$

High stress → triggers migration to a better-fitting cell.

## Thermal Migration

Memories move between regimes based on access patterns:

```python
def thermal_migrate(block: MemoryBlock, access_pattern: AccessLog):
    if access_pattern.frequency > HOT_THRESHOLD:
        promote_to_stm(block)  # Hot data → narrow cells
    elif access_pattern.recency < COLD_THRESHOLD:
        demote_to_ltm(block)   # Cold data → wide cells
```

### Migration Triggers

| Condition | Action |
|-----------|--------|
| Frequent access | Promote toward STM |
| Recent access | Maintain current regime |
| Infrequent + old | Demote toward LTM |
| Stress > threshold | Re-quantize to new cell |

## API

```python
from noetic_eidos import SpectralMemory

memory = SpectralMemory(
    capacity=10000,
    n_zeros=50,  # First 50 zeta zeros
    stm_threshold=100,
    ltm_threshold=30
)

# Store
memory.store(
    key="concept_a",
    embedding=vector,
    initial_frequency=85.0,  # Will quantize to nearest zero
    metadata={"source": "user_input"}
)

# Retrieve
results = memory.retrieve(
    query=query_vector,
    top_k=5,
    regime_filter="STM"  # Optional: restrict to regime
)

for result in results:
    print(f"{result.key}: t={result.frequency:.2f}, regime={result.regime}")
```

## Visualization

```
Frequency →
     t₁    t₂    t₃    t₄    t₅
     │     │     │     │     │
   ╔═╧═╗ ╔═╧═╗ ╔═╧═╗ ╔═╧═╗ ╔═╧═╗
   ║ A ║ ║ B ║ ║ C ║ ║   ║ ║ D ║  STM
   ╚═══╝ ╚═══╝ ╚═══╝ ╚═══╝ ╚═══╝
   ╔═════╧═════╗ ╔═════╧═════╗
   ║     E     ║ ║     F     ║      MID
   ╚═══════════╝ ╚═══════════╝
   ╔═══════════════╧═══════════════╗
   ║              G                ║  LTM
   ╚═══════════════════════════════╝
```

- **Narrow cells** (STM): High precision, fast access
- **Wide cells** (LTM): Compressed, stable

## Next Steps

- [Personas](/guide/personas) — How memory connects to persona selection
- [Voronoi Quantization](/guide/voronoi) — Deep dive into cell geometry
- [API Reference](/api/spectral-memory) — Full API docs
