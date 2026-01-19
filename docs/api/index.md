# API Reference

Complete API documentation for Noetic Eidos.

## Modules

### Core

| Class | Description |
|-------|-------------|
| [`ZetaFormer`](/api/zetaformer) | Dual-kernel attention mechanism |
| [`SpectralMemory`](/api/spectral-memory) | Frequency-based memory system |
| [`PersonaRouter`](/api/persona-router) | Polylipse persona routing |

### Utilities

| Function | Description |
|----------|-------------|
| `load_zeta_zeros(n)` | Load first n Riemann zeta zeros |
| `fisher_rao_distance(a, b)` | Compute Fisher-Rao distance |
| `quantize_frequency(t)` | Project to nearest zeta zero |

## Quick Reference

### ZetaFormer

```python
from noetic_eidos import ZetaFormer, ZetaFormerConfig

config = ZetaFormerConfig(embedding_dim=768)
zf = ZetaFormer(config)
output, state = zf.forward(query, keys, values)
```

### SpectralMemory

```python
from noetic_eidos import SpectralMemory

memory = SpectralMemory(capacity=10000)
memory.store(key="x", embedding=vec)
results = memory.retrieve(query=q, top_k=5)
```

### PersonaRouter

```python
from noetic_eidos import PersonaRouter

router = PersonaRouter()
persona, score = router.route(query, current="atlas")
```

## Installation

```bash
pip install noetic-eidos
```

## Type Hints

All APIs are fully typed. Import types from:

```python
from noetic_eidos.types import (
    ZetaFormerConfig,
    KappaZetaState,
    MemoryBlock,
    Persona,
    StyleVector
)
```
