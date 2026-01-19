# Resonance Ontology: QUICKSTART

**A 10-minute visual overview of the complete framework**

---

## The Core Idea

**Identity = Persistence of Spectral Fingerprint**

Everything that exists has a characteristic frequency signature. When that signature persists despite small changes, the entity is *real* and *stable*.

```
System dynamics  →  Extract frequencies  →  Spectral signature  →  Entity identity
(any system)         (via Fourier)           (frequency histogram)    (equivalence class)
```

---

## The Archetype: Orbital Resonance

Start with the **cleanest example**: planets in orbit.

### Pluto & Neptune: A 3:2 Resonance

```
Neptune (slower, outer)  ┐
                         │  Every time Neptune completes 2 orbits,
                         │  Pluto completes 3 orbits
Pluto (faster, inner)    ┘

Result: Fixed phase relationship (resonant angle librates, stays bounded)
Effect: Pluto protected from close encounters with Neptune
```

**The key insight:**
- Integer ratio (3:2) emerges from gravitational dynamics
- Phase locking prevents chaotic collisions
- This is a **hard resonance** (exact integer constraint)

---

## Generalization 1: Spectral Signatures (Any System)

Orbital resonances are too rigid (require exact integer ratios, low dimension, specific physics).

But the *concept* generalizes:

```
ANY SYSTEM with oscillations has a spectral signature (frequency fingerprint).
                              ↓
                   Two systems are "the same" (same entity)
                      if their spectra are close
                              ↓
                  You can do resonance theory without orbits.
```

**Example: Neural network layer**

```
Layer activations over time  →  Spectral signature (which frequencies are active)
                              →  Compare to other layers/models
                              →  Identify entity (this activation pattern = "attention to syntax")
```

---

## The 4-Level Hierarchy

### Level 1: Orbital Resonance
```
Constraints: Exact integer ratios (3:2, 2:1, etc.)
Dimension:  2-6 degrees of freedom
Dynamics:   Hamiltonian (gravity, conservative)
Stability:  MAXIMUM (librarian angel locked forever)
Example:    Pluto-Neptune 3:2
```

### Level 2: Spectral Resonance  
```
Constraints: Approximate ratios (1.50 ≈ 3:2)
Dimension:  Any (1, 10, 1000 dimensions)
Dynamics:   Any (linear, nonlinear, stochastic)
Stability:  ROBUST (modes persist under noise)
Example:    Identifying a person by voice despite background noise
```

### Level 3: Adaptive Resonance
```
Constraints: Integer relations implicit (emerge from learning)
Dimension:  Very high (neural network weights)
Dynamics:   Learning-based (gradient descent)
Stability:  PLASTIC (can restructure via training)
Example:    Multi-task neural network developing task-specific modes
```

### Level 4: General Intelligence
```
Constraints: Self-modifying (no fixed structure)
Dimension:  Grows/shrinks as needed
Dynamics:   Meta-learning (learns how to learn)
Stability:  ADAPTIVE (rewrites itself)
Example:    Theoretical aspiration, not yet achieved
```

---

## The Key Dynamics: Libration vs Circulation

### Libration = Captured (Stable)
```
Phase angle φ oscillates around a fixed center

      φ(t)
        ↑     /‾\        /‾\        /‾\
        |    /   \      /   \      /   \
        |___/     \____/     \____/     \___
             ↑            ↑            ↑
        Oscillates around center (BOUNDED)
        
→ System is in resonance (captured)
```

### Circulation = Free (Unstable)
```
Phase angle φ winds monotonically

      φ(t)
        ↑   
        |         ╱╱╱╱╱
        |      ╱╱╱╱
        |   ╱╱╱╱
        |╱╱╱╱
        ─────────────────→ t
             ↑
        Unbounded winding drift (CIRCULATING)
        
→ System is escaping resonance (free passage)
```

---

## The Adiabatic Capture Principle

**Core prediction of the framework:**

```
Migration Rate vs Convergence Time
═════════════════════════════════════

For a system approaching a resonance:

   Slow migration    →  CAPTURE (gets trapped)
   Fast migration    →  PASSAGE (flies through)

Quantitatively:
   κ = (migration speed × oscillation time) / basin width
   
   κ << 1  →  Capture probable
   κ >> 1  →  Passage probable
```

**Physical analogy**: 

Imagine a ball rolling into a potential well:
- Roll slowly → falls in and settles (captured)
- Roll fast → bounces out and keeps going (passage)

---

## Application to Neural Networks: Grokking

### The Grokking Phenomenon

A neural network trained on modular arithmetic $a + b \pmod{p}$:

```
Loss & Accuracy vs Epoch
═════════════════════════

     Loss
    ┌────┐
    │  ╲  ╲
    │   ╲  ╲        ←  Pre-grokking: loss decreases, 
    │    ╲  ╲           but test accuracy stays random
    │     ╲  ╲
    │      ╲  ╲╲╲╲╲╲╲← Grokking transition (sharp phase change)
    │         ╲╲
    │          ╲
    └─────────────────
    
    Accuracy
    ┌────┐
    │
    │    ≈ random (~1%)     ╱╱╱ ← Sudden jump to
    │                    ╱╱╱      high accuracy (>99%)
    │                ╱╱╱
    │             ╱╱╱
    └─────────────────────
         Pre        Grokking   Post
```

### The Resonance Interpretation

**Pre-grokking**: Circulating regime
- Spectral signature oscillates without settling
- Phase angle drifts (unbounded)
- Loss changes randomly, no convergence
- System migrating through representation space

**Grokking transition**: Capture begins
- Learning rate or data distribution becomes "slower" (κ drops below threshold)
- System crosses threshold into resonance zone
- Phase angle transitions from circulating to librating

**Post-grokking**: Librating regime
- Spectral signature locks to generalizing mode
- Phase angle librates around fixed center
- Loss decreases smoothly, accuracy saturates
- System captured in stable representation

---

## The Unifying Principle

```
ORBITAL MECHANICS
    ↓ (generalize integer constraints)
SPECTRAL RESONANCE
    ↓ (allow learning)
ADAPTIVE RESONANCE
    ↓ (allow self-modification)
GENERAL INTELLIGENCE
```

**Each level:**
- Adds flexibility
- Loses explainability
- Builds on the previous level

**Why this matters:**
- Orbital resonance gives *perfect* understanding but *zero* flexibility
- General intelligence gives *maximal* flexibility but *zero* understanding
- Real systems live somewhere in between

---

## Three Concrete Examples

### Example 1: Pluto-Neptune (Orbital Level)
```
What: Two planets
Identity: 3:2 period ratio that stays locked
Stability: Over 4 billion years (solar system age)
Measurement: Orbital periods (extremely precise)
Rigidity: Cannot change without external catastrophe
```

### Example 2: Speech Recognition (Spectral Level)
```
What: Human voice saying "hello"
Identity: Characteristic frequencies (formants) unique to speaker
Stability: Same person says it different ways → same spectral signature
Measurement: Spectrogram (frequency vs time heatmap)
Rigidity: Fixed speaker identity, but can adapt to noise
```

### Example 3: Neural Network Persona (Adaptive Level)
```
What: Language model with multiple response modes
Identity: "Analyst" persona (characteristic activation patterns)
Stability: Routes to same persona for related queries
Measurement: Router logits, attention heads
Rigidity: Can learn new personas, merge old ones, restructure
```

---

## The Core Prediction (Testable)

```
Adiabatic Parameter Predicts Learning Speed
═════════════════════════════════════════════

For any learning system with:
  - migration rate v_mig (how fast target changes)
  - convergence time T_conv (how fast you can reach target)
  - basin width ε (tolerance for "same" solution)

Define: κ = (v_mig × T_conv) / ε

Prediction:
  κ << 1  →  Fast learning (captured quickly)
  κ ≈ 1   →  Transition regime (where phase changes happen)
  κ >> 1  →  Slow learning (passes through without settling)

This applies to:
  - Modular arithmetic grokking ✓ (verified)
  - Multi-task learning (untested)
  - Curriculum learning (untested)
  - Any neural network (untested)
```

---

## Hierarchy Visualization

```
General Intelligence  ■■■■■■■■■■ (Maximal flexibility, zero structure)
                      ▲
                      │ Remove architecture constraints
                      │
Adaptive Resonance    ■■■■■■■■ ■ (Learn modes & topology)
                      ▲
                      │ Allow mode learning
                      │
Spectral Resonance    ■■■■■■ ■ ■ (Fixed modes, flexible physics)
                      ▲
                      │ Relax integer constraints
                      │
Orbital Resonance     ■■ ■ ■ ■ ■ (Maximal rigidity, perfect understanding)

Legend: ■ = constraint, space = freedom
```

**Key insight**: You can't skip levels. You must relax constraints gradually.

---

## What You Get

### Theory
- ✅ Unified mathematical language for any system with modes
- ✅ Quantitative prediction (κ criterion) for capture
- ✅ Connection between orbital mechanics and learning
- ✅ Four-level ontology from rigid to flexible

### Practice
- ✅ Algorithm to detect capture in time series
- ✅ Code to compute spectral signatures
- ✅ Formula to predict grokking onset
- ✅ Methods to design curricula

### Understanding
- ✅ Why grokking happens (phase transition)
- ✅ Why multi-task learning is hard (resonance overlap)
- ✅ Why curriculum matters (migration rate)
- ✅ Why neural networks work (soft resonance)

---

## Next Steps

### 🎯 **If you want intuition** (30 min)
1. Run `resonance_ontology_visualization.jsx` (interactive demo)
2. Skim this file + `00_README.md`
3. Done! You understand the picture.

### 📚 **If you want theory** (2 hours)
1. Read `01_orbital_resonances.md` (orbital foundations)
2. Read `02_spectral_signatures.md` (generalization)
3. Read `03-07 § 6` (learning applications)
4. Read `03-07 § 7` (hierarchy and philosophy)

### 🔬 **If you want implementation** (3 hours)
1. Start with `/resonance_ontology/examples.py`
2. Study `MATHEMATICS_COMPLETE § 8` (algorithms)
3. Adapt to your data
4. Test predictions on your system

### 📖 **If you want everything** (1 day)
See `MASTER_GUIDE.md` for complete learning paths by background

---

## Key Takeaways

| Concept | Intuition |
|---------|-----------|
| **Resonance** | When two things synchronize (planets, frequencies, ideas) |
| **Identity** | What persists despite small changes (your spectral fingerprint) |
| **Libration** | Captured, oscillating stably around a center |
| **Circulation** | Free, drifting unboundedly without settling |
| **Adiabatic** | Slow changes preserve structure; fast changes break it |
| **Hierarchy** | Trade rigidity for flexibility as you go up levels |
| **Grokking** | Transition from circulation to libration in learning |

---

## One-Sentence Summary

**Identity is what persists when a system oscillates around a stable mode under small perturbations, and this principle explains everything from planetary orbits to why neural networks suddenly learn.**

---

## Visual Summary

```
┌─────────────────────────────────────────────────────────────┐
│           RESONANCE ONTOLOGY: The Big Picture              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ANY SYSTEM WITH MODES (orbits, networks, etc.)            │
│              ↓                                              │
│       Extract spectral signature (frequencies)             │
│              ↓                                              │
│  Compare to other systems (distance metric)                │
│              ↓                                              │
│  If close → same entity (equivalence class)                │
│              ↓                                              │
│  Track how entity evolves (libration vs circulation)       │
│              ↓                                              │
│  Predict capture with κ parameter (adiabatic criterion)    │
│              ↓                                              │
│  Understand learning, physics, AI through unified lens     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**Ready? Start with the interactive visualization or read `01_orbital_resonances.md` next.**