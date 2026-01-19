# Getting Started

This guide will help you install Noetic Eidos and run your first example.

## Prerequisites

- Python 3.10+
- NumPy, SciPy
- PyTorch (optional, for GPU acceleration)

## Installation

::: code-group

```bash [pip]
pip install noetic-eidos
```

```bash [from source]
git clone https://github.com/noetic-eidos/noetic-eidos
cd noetic-eidos
pip install -e .
```

:::

## Quick Start

### 1. Basic ZetaFormer Attention

```python
from noetic_eidos import ZetaFormer, ZetaFormerConfig

# Initialize with default config
config = ZetaFormerConfig(
    embedding_dim=768,
    tau_temperature=1.0,
    sigma_rate=1.0,
    balance_target=1.0
)

zetaformer = ZetaFormer(config)

# Run attention
output, kappa_zeta_state = zetaformer.forward(
    query=query_tensor,
    keys=key_tensor,
    values=value_tensor
)

print(f"κζ = {kappa_zeta_state.smoothed:.3f}")
```

### 2. Spectral Memory

```python
from noetic_eidos import SpectralMemory

memory = SpectralMemory(
    capacity=1000,
    n_zeros=50  # First 50 Riemann zeta zeros
)

# Store a memory block
memory.store(key="concept_a", embedding=vector, metadata={...})

# Retrieve with thermal promotion
result = memory.retrieve(query=query_vector)
print(f"Retrieved from {result.regime} at t={result.frequency:.2f}")
```

### 3. Persona Routing

```python
from noetic_eidos import PersonaRouter

router = PersonaRouter(
    hysteresis_threshold=0.1
)

# Route a query to the best persona
persona, resonance = router.route(
    query=user_input,
    current_persona="atlas"
)

print(f"Routing to {persona.name} (resonance: {resonance:.3f})")
```

## Project Structure

A typical Noetic Eidos project looks like:

```
my-project/
├── config/
│   └── zetaformer.yaml
├── src/
│   ├── attention.py
│   ├── memory.py
│   └── router.py
├── data/
│   └── zeta_zeros.json
└── main.py
```

## Configuration

All components can be configured via YAML:

```yaml
# config/zetaformer.yaml
zetaformer:
  embedding_dim: 768
  tau:
    temperature: 1.0
    kernel: gaussian
  sigma:
    rate: 1.0
    kernel: poisson
  balance:
    target: 1.0
    alpha_beta: 0.1
    alpha_t: 0.1
```

## Next Steps

- [Core Concepts](/guide/core-concepts) — Understand the mathematics
- [ZetaFormer Deep Dive](/guide/zetaformer) — Full attention mechanism
- [API Reference](/api/) — Complete API documentation

::: tip
Join our Discord for help and discussion: [discord.gg/noetic-eidos](https://discord.gg/noetic-eidos)
:::
