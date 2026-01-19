# Personas

The Persona system routes queries through a 7-foci cognitive space, enabling adaptive response generation.

## The 7 Personas

| Persona | Character | Optimizes For |
|---------|-----------|---------------|
| 🎨 **Muse** | Creative, divergent | Originality, aesthetics |
| ⚡ **Spark** | Energetic, generative | Speed, volume, momentum |
| ♥️ **Hearth** | Warm, supportive | Empathy, comfort |
| ◎ **Atlas** | Balanced, comprehensive | Synthesis, breadth |
| 🔨 **Forge** | Constructive, building | Implementation, craft |
| 💎 **Sage** | Analytical, deep | Correctness, rigor |
| 🛡️ **Sentinel** | Precise, vigilant | Safety, standards |

## Polylipse Geometry

A **polylipse** generalizes an ellipse to N foci. The metric tensor:

$$g_N = \sum_{i=1}^{7} w_i \cdot g_i(f_i)$$

Where:
- **wᵢ** = weight of persona i
- **gᵢ** = local metric around focus i
- **fᵢ** = position of focus i

### Visualization

```
           Muse
            ◆
      Spark   ◆   ◆ Sentinel
             ╲│╱
        ◆────◎────◆
      Hearth  │   Sage
             ╱│╲
           ◆   ◆
        Atlas  Forge
```

Each query lands somewhere in this space. The nearest focus (with hysteresis) determines the active persona.

## Resonance Calculation

For a query q, we compute resonance with each persona:

```python
def compute_resonance(query: ndarray, persona: Persona) -> float:
    # Semantic similarity
    semantic = cosine_similarity(query, persona.prototype)
    
    # Stylistic match
    stylistic = style_match(query, persona.style_vector)
    
    # Memory context
    memory_boost = memory.regime_affinity(query, persona.preferred_regime)
    
    return semantic * 0.5 + stylistic * 0.3 + memory_boost * 0.2
```

## Hysteresis Routing

To prevent rapid persona switching, we use **hysteresis**:

```python
def route(query: ndarray, current: Persona, threshold: float = 0.1) -> Persona:
    resonances = {p: compute_resonance(query, p) for p in ALL_PERSONAS}
    best = max(resonances, key=resonances.get)
    
    # Only switch if gain exceeds threshold
    if resonances[best] - resonances[current] > threshold:
        return best
    else:
        return current
```

### Why Hysteresis?

Without it, borderline queries cause **oscillation**:

```
Query A → Muse
Query B → Sage
Query C → Muse (back!)
Query D → Sage (again!)
```

Hysteresis ensures **coherent sessions**:

```
Query A → Muse
Query B → Muse (held)
Query C → Muse (held)
Query D → Sage (clear signal)
```

## Persona Profiles

### Muse 🎨

```python
Persona(
    name="Muse",
    prototype=creative_embedding,
    style_vector=StyleVector(
        formality=0.3,
        verbosity=0.7,
        creativity=0.95,
        precision=0.4
    ),
    preferred_regime="STM",
    color="#ec4899"
)
```

**Triggers**: Creative writing, brainstorming, art, music, unconventional requests

### Spark ⚡

```python
Persona(
    name="Spark",
    style_vector=StyleVector(
        formality=0.2,
        verbosity=0.5,
        creativity=0.7,
        precision=0.3
    ),
    preferred_regime="STM"
)
```

**Triggers**: Quick answers, lists, rapid ideation, momentum-focused tasks

### Hearth ♥️

```python
Persona(
    name="Hearth",
    style_vector=StyleVector(
        formality=0.4,
        verbosity=0.6,
        creativity=0.5,
        precision=0.5
    ),
    preferred_regime="MID"
)
```

**Triggers**: Emotional support, personal topics, comfort-seeking queries

### Atlas ◎

```python
Persona(
    name="Atlas",
    style_vector=StyleVector(
        formality=0.5,
        verbosity=0.6,
        creativity=0.5,
        precision=0.6
    ),
    preferred_regime="MID"
)
```

**Triggers**: General queries, balanced requests, synthesis tasks

### Forge 🔨

```python
Persona(
    name="Forge",
    style_vector=StyleVector(
        formality=0.6,
        verbosity=0.4,
        creativity=0.4,
        precision=0.8
    ),
    preferred_regime="STM"
)
```

**Triggers**: Building, coding, implementation, step-by-step construction

### Sage 💎

```python
Persona(
    name="Sage",
    style_vector=StyleVector(
        formality=0.7,
        verbosity=0.7,
        creativity=0.3,
        precision=0.9
    ),
    preferred_regime="LTM"
)
```

**Triggers**: Analysis, research, deep dives, correctness-critical tasks

### Sentinel 🛡️

```python
Persona(
    name="Sentinel",
    style_vector=StyleVector(
        formality=0.8,
        verbosity=0.3,
        creativity=0.2,
        precision=0.95
    ),
    preferred_regime="LTM"
)
```

**Triggers**: Review, error-checking, safety concerns, standard enforcement

## API

```python
from noetic_eidos import PersonaRouter, Persona

router = PersonaRouter(
    hysteresis_threshold=0.1,
    default_persona="atlas"
)

# Route a query
persona, resonance = router.route(
    query=user_input_embedding,
    current_persona=router.current
)

print(f"Active: {persona.name} (resonance: {resonance:.3f})")

# Get style parameters
style = persona.style_vector
print(f"Creativity: {style.creativity}, Precision: {style.precision}")
```

## Next Steps

- [Architecture](/guide/architecture) — How personas fit in the system
- [API Reference](/api/persona-router) — Full router API
