# Resonance Ontology: Mathematical Foundations

Complete mathematical formalization of resonance-based identity and dynamics, from orbital mechanics to general learning systems.

> **📍 Canonical Entry Point:** For comprehensive navigation and learning paths, see **[INDEX.md](INDEX.md)**.

## Overview

This documentation covers the theoretical backbone of a resonance ontology—a framework where:
- **Identity** = equivalence class of spectral signatures under perturbation
- **Dynamics** = persistence of modes under phase-locking
- **Truth** = structural stability via libration

The framework progresses from orbital mechanics (maximally rigid) through spectral resonance (moderate flexibility) to adaptive resonance (maximal flexibility).

## Document Structure

### Core Theory

1. **[01_orbital_resonances.md](01_orbital_resonances.md)**
   - Formal definition of mean-motion resonances (MMRs)
   - Resonant angles and libration condition
   - Examples: Pluto–Neptune 3:2, Kirkwood gaps, Laplace resonance
   - Why orbital resonance is too constrained for general systems

2. **[02_spectral_signatures.md](02_spectral_signatures.md)**
   - Spectral signature representations (dense and sparse)
   - Distance metrics: Jensen–Shannon, Wasserstein, Fisher–Rao
   - Entities via ε-connectivity clustering
   - Stability via persistence under perturbation

3. **[03-07_mathematics_consolidated.md](03-07_mathematics_consolidated.md)** — Consolidated sections:
   - **§3: Phase Space Dynamics** — Libration vs circulation, separatrix, normal forms
   - **§4: Resonance Capture** — Adiabatic capture theorem, κ parameter
   - **§5: Soft Resonances** — Relaxation of orbital constraints
   - **§6: Capture in Learning** — Grokking as resonance capture, curriculum learning
   - **§7: The Hierarchy** — Orbital ⊂ Spectral ⊂ Adaptive ⊂ General Intelligence

### Reference

4. **[09_notation_reference.md](09_notation_reference.md)**
   - Unified notation across all documents
   - Index of symbols and their definitions
   - Quick reference table

5. **[MATHEMATICS_COMPLETE.md](MATHEMATICS_COMPLETE.md)**
   - Complete consolidated mathematics with inline code examples
   - All 12 sections in one document

## Quick Navigation

**If you want to understand...**

- **Orbital resonances** → Start with [01_orbital_resonances.md](01_orbital_resonances.md)
- **Why they're too rigid** → See [03-07_mathematics_consolidated.md §7](03-07_mathematics_consolidated.md)
- **The generalization** → [02_spectral_signatures.md](02_spectral_signatures.md)
- **How this applies to learning** → [03-07_mathematics_consolidated.md §6](03-07_mathematics_consolidated.md)
- **How to implement it** → [MATHEMATICS_COMPLETE.md §8](MATHEMATICS_COMPLETE.md)
- **The full hierarchy** → [03-07_mathematics_consolidated.md §7](03-07_mathematics_consolidated.md)

## Mathematical Level

These documents are written at the level of:
- **Graduate-level mechanics and dynamical systems**
- Assumes familiarity with ODEs, linear algebra, and basic topology
- Provides rigorous definitions and proofs where relevant
- Cites classical results (Henrard, Murray, Keplerian mechanics)

## Key Unifying Ideas

### 1. Identity through Invariants

Orbital resonances are defined by **librating resonant angles**—specific combinations of orbital elements that remain bounded. This is the prototype for identity:

$$\text{Entity} = \{\text{systems with same librating angle structure}\}$$

### 2. Persistence under Perturbation

Orbital resonances are **structurally stable**: small perturbations don't destroy them. This generalizes to:

$$\text{Truth} = \text{Property preserved under perturbation}$$

### 3. Dissipation Enables Capture

In celestial mechanics, resonance capture requires **energy dissipation**. Without it, bodies pass through. This carries to learning:

$$\text{Capture} \propto \text{Dissipation} + \text{Slow Migration}$$

### 4. Integer Constraints from Capacity Limits

Orbital integer ratios ($p$:$q$) emerge from dynamical geometry. In learning, integer allocation patterns emerge from **finite representational capacity**:

$$\text{Discrete structure} \leftarrow \text{Capacity pressure}$$

### 5. Soft Versions Generalize

Orbital resonance cannot directly generalize, but **soft resonance** (approximate phase locking) does:

$$\text{Orbital} \subset \text{Spectral} \subset \text{Adaptive} \subset \text{General Intelligence}$$

## Cross-References

Documents are heavily cross-referenced. When you see:
- **[§2.3](02_spectral_signatures.md#23-distance-metrics)** — Jump to section 2.3 of that document
- **Def 3.1** — Search for "Definition 3.1" in context
- **Theorem 4.2** — Classical result cited with reference

## How to Read This

**Option A: Linear (Foundations → Applications)**
1. Start with [01_orbital_resonances.md](01_orbital_resonances.md)
2. Progress through [02_spectral_signatures.md](02_spectral_signatures.md)
3. Read [03-07_mathematics_consolidated.md](03-07_mathematics_consolidated.md) (§3–§7 in order)
4. Reference notation in [09_notation_reference.md](09_notation_reference.md)

**Option B: Applications First**
1. Skim [01_orbital_resonances.md](01_orbital_resonances.md) for context
2. Jump to [03-07_mathematics_consolidated.md §6](03-07_mathematics_consolidated.md) (Capture in Learning)
3. Reference [02_spectral_signatures.md](02_spectral_signatures.md) as needed
4. Read [03-07_mathematics_consolidated.md §7](03-07_mathematics_consolidated.md) for theoretical grounding

**Option C: Implementation-Focused**
1. Read [MATHEMATICS_COMPLETE.md §8](MATHEMATICS_COMPLETE.md) (Computational Framework)
2. Reference [02_spectral_signatures.md](02_spectral_signatures.md) (signatures)
3. Check [09_notation_reference.md](09_notation_reference.md) for definitions

## Dependencies

- **No external software required** for reading
- Code examples are pseudocode or Python-like
- All figures are described in text (for conversion to visual)
- Mathematics is LaTeX

## Summary of Key Results

| Result | Location | Importance |
|--------|----------|-----------|
| Definition of p:q MMR via librating angles | [01_orbital_resonances.md](01_orbital_resonances.md) | Foundation |
| Spectral distance metrics | [02_spectral_signatures.md](02_spectral_signatures.md) | Implementation |
| Separatrix and phase-space structure | [03-07 §3](03-07_mathematics_consolidated.md) | Dynamical insight |
| Adiabatic capture theorem (κ << 1 → capture) | [03-07 §4](03-07_mathematics_consolidated.md) | Prediction |
| Soft integer resonance under capacity pressure | [03-07 §5](03-07_mathematics_consolidated.md) | Scaling mechanism |
| Grokking as capture transition | [03-07 §6](03-07_mathematics_consolidated.md) | Application |
| Formal obstruction to universalizing orbital resonance | [03-07 §7](03-07_mathematics_consolidated.md) | Theoretical boundary |

## Errata & Updates

This version: **2025-01-19**

Known open questions:
- Exact form of dissipation in SGD ([03-07 §6](03-07_mathematics_consolidated.md))
- Multi-task resonance overlap dynamics ([03-07 §6](03-07_mathematics_consolidated.md))
- Phase transition analogs in curriculum learning ([03-07 §6](03-07_mathematics_consolidated.md))

## Citation

If using this framework in research, cite as:

> Resonance Ontology: Mathematical Foundations. Unpublished technical documentation. January 2025.

Or in BibTeX:
```bibtex
@techreport{resonance-ontology-2025,
  title={Resonance Ontology: Mathematical Foundations},
  author={[Author]},
  year={2025},
  month={January},
  url={https://github.com/Sarhamam/NoeticEidos},
  note={Technical documentation}
}
```

## License

These documents are provided as educational and research material. Free to use, modify, and distribute with attribution.

---

**Begin with [01_orbital_resonances.md](01_orbital_resonances.md) or jump to your area of interest above.**
