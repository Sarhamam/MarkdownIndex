# System Architecture

Noetic Eidos uses a layered architecture where each layer builds on the geometric principles of the layer beneath it.

## Layer Overview

```
┌─────────────────────────────────────────────┐
│            APPLICATION LAYER                │
│     (Search, Chat, Safety, Analysis)        │
├─────────────────────────────────────────────┤
│            ROUTING LAYER                    │
│     (Polylipse Personas + Hysteresis)       │
├─────────────────────────────────────────────┤
│            MEMORY LAYER                     │
│     (Spectral Memory OS + Voronoi)          │
├─────────────────────────────────────────────┤
│            ATTENTION LAYER                  │
│     (ZetaFormer: τ/σ → κζ)                  │
├─────────────────────────────────────────────┤
│            CORE LAYER                       │
│     (Fisher-Rao + κζ Metric + Zeta Zeros)   │
└─────────────────────────────────────────────┘
```

## Data Flow

```
INPUT (Query)
    │
    ▼
┌───────────┐
│ ZetaFormer │ ──► Computes τ/σ attention
└─────┬─────┘     Outputs κζ state
      │
      ├────────────────┐
      ▼                ▼
┌──────────┐    ┌───────────┐
│ SPECTRAL │    │ POLYLIPSE │
│  MEMORY  │    │ PERSONAS  │
└────┬─────┘    └─────┬─────┘
     │                │
     └───────┬────────┘
             ▼
     ┌───────────────┐
     │ Spectral Router│
     │ (Mellin freq)  │
     └───────┬───────┘
             ▼
     ┌───────────────┐
     │ LLM Generation │
     │ (per-persona)  │
     └───────────────┘
             │
             ▼
          OUTPUT
```

## Layer Details

### Core Layer

**Components**:
- Fisher-Rao metric implementation
- κζ computation and smoothing
- Zeta zero tables (first 1000 zeros)

**Responsibilities**:
- Provide geometric primitives
- Compute information-theoretic distances
- Maintain zeta zero lookup

### Attention Layer

**Components**:
- τ Pathway (Gaussian kernel)
- σ Pathway (Poisson kernel)
- κζ balance controller

**Responsibilities**:
- Compute dual-kernel attention
- Track exploration/exploitation balance
- Apply ζ-normalization

### Memory Layer

**Components**:
- Spectral Memory OS
- Voronoi quantizer
- Thermal migration engine

**Responsibilities**:
- Store/retrieve by frequency
- Manage STM/MID/LTM regimes
- Handle memory compression

### Routing Layer

**Components**:
- Persona definitions (7 foci)
- Resonance calculator
- Hysteresis controller

**Responsibilities**:
- Compute persona resonance
- Route queries to appropriate persona
- Maintain session coherence

### Application Layer

**Components**:
- Task-specific adapters
- Safety filters
- Output formatters

**Responsibilities**:
- Adapt core capabilities to use cases
- Enforce safety constraints
- Format responses appropriately

## Configuration

Each layer has its own configuration:

```yaml
# config/system.yaml
core:
  zeta_zeros_count: 1000
  fisher_rao_eps: 1e-8

attention:
  embedding_dim: 768
  tau_temperature: 1.0
  sigma_rate: 1.0
  kappa_zeta_target: 1.0

memory:
  capacity: 100000
  stm_threshold: 100
  ltm_threshold: 30
  migration_interval: 1000

routing:
  hysteresis_threshold: 0.1
  default_persona: atlas
  resonance_weights:
    semantic: 0.5
    stylistic: 0.3
    memory: 0.2
```

## Next Steps

- [ZetaFormer](/guide/zetaformer) — Attention layer details
- [Spectral Memory](/guide/spectral-memory) — Memory layer details
- [Personas](/guide/personas) — Routing layer details
