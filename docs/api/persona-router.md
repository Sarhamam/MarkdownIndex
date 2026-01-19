# PersonaRouter API

Polylipse-based persona routing with hysteresis for stable mode switching.

## Classes

### PersonaRouter

```python
class PersonaRouter:
    def __init__(
        self,
        hysteresis_threshold: float = 0.1,
        default_persona: str = "atlas",
        resonance_weights: dict | None = None
    ) -> None: ...
    
    def route(
        self,
        query: ndarray,
        current_persona: str | None = None
    ) -> tuple[Persona, float]: ...
    
    def get_all_resonances(
        self,
        query: ndarray
    ) -> dict[str, float]: ...
    
    @property
    def current(self) -> Persona: ...
    
    def reset(self) -> None: ...
```

#### Constructor

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hysteresis_threshold` | `float` | 0.1 | Switching threshold |
| `default_persona` | `str` | "atlas" | Starting persona |
| `resonance_weights` | `dict` | None | Custom weight dict |

Default resonance weights:
```python
{
    "semantic": 0.5,
    "stylistic": 0.3,
    "memory": 0.2
}
```

#### Methods

##### `route(query, current_persona)`

Route query to best persona with hysteresis.

**Parameters:**
- `query`: Query embedding
- `current_persona`: Override current (uses internal state if None)

**Returns:** `(Persona, resonance_score)`

##### `get_all_resonances(query)`

Get resonance scores for all personas.

**Returns:** Dict mapping persona names to scores

---

### Persona

```python
@dataclass
class Persona:
    id: str
    name: str
    character: str
    description: str
    prototype: ndarray
    style_vector: StyleVector
    preferred_regime: str
    color: str
    icon: str
```

#### Built-in Personas

| ID | Name | Character |
|----|------|-----------|
| `muse` | Muse | Creative, divergent |
| `spark` | Spark | Energetic, generative |
| `hearth` | Hearth | Warm, supportive |
| `atlas` | Atlas | Balanced, comprehensive |
| `forge` | Forge | Constructive, building |
| `sage` | Sage | Analytical, deep |
| `sentinel` | Sentinel | Precise, vigilant |

---

### StyleVector

```python
@dataclass
class StyleVector:
    formality: float    # 0.0 (casual) to 1.0 (formal)
    verbosity: float    # 0.0 (terse) to 1.0 (verbose)
    creativity: float   # 0.0 (conventional) to 1.0 (creative)
    precision: float    # 0.0 (approximate) to 1.0 (precise)
```

## Examples

### Basic Routing

```python
from noetic_eidos import PersonaRouter

router = PersonaRouter()

persona, score = router.route(query_embedding)
print(f"Routed to {persona.name} (score: {score:.3f})")
```

### Check All Resonances

```python
resonances = router.get_all_resonances(query)
for name, score in sorted(resonances.items(), key=lambda x: -x[1]):
    print(f"{name}: {score:.3f}")
```

### Custom Hysteresis

```python
# Higher threshold = more stable, slower to switch
router = PersonaRouter(hysteresis_threshold=0.2)

# Lower threshold = more responsive, quicker to switch
router = PersonaRouter(hysteresis_threshold=0.05)
```

### Use Style Vector

```python
persona, _ = router.route(query)
style = persona.style_vector

if style.creativity > 0.7:
    # Use more creative generation settings
    temperature = 1.2
else:
    temperature = 0.8
```
