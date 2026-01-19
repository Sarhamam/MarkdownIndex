# SpectralMemory API

Frequency-based memory system with Voronoi quantization to Riemann zeta zeros.

## Classes

### SpectralMemory

```python
class SpectralMemory:
    def __init__(
        self,
        capacity: int = 10000,
        n_zeros: int = 50,
        stm_threshold: float = 100.0,
        ltm_threshold: float = 30.0
    ) -> None: ...
    
    def store(
        self,
        key: str,
        embedding: ndarray,
        initial_frequency: float | None = None,
        metadata: dict | None = None
    ) -> MemoryBlock: ...
    
    def retrieve(
        self,
        query: ndarray,
        top_k: int = 5,
        regime_filter: str | None = None
    ) -> list[RetrievalResult]: ...
    
    def migrate(self) -> int: ...
    
    def stats(self) -> MemoryStats: ...
```

#### Constructor

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `capacity` | `int` | 10000 | Maximum memory blocks |
| `n_zeros` | `int` | 50 | Number of zeta zeros to use |
| `stm_threshold` | `float` | 100.0 | STM frequency threshold |
| `ltm_threshold` | `float` | 30.0 | LTM frequency threshold |

#### Methods

##### `store(key, embedding, initial_frequency, metadata)`

Store a memory block.

**Parameters:**
- `key`: Unique identifier
- `embedding`: Vector representation
- `initial_frequency`: Starting frequency (auto-assigned if None)
- `metadata`: Optional metadata dict

**Returns:** `MemoryBlock`

##### `retrieve(query, top_k, regime_filter)`

Retrieve similar memories.

**Parameters:**
- `query`: Query vector
- `top_k`: Number of results
- `regime_filter`: "STM", "MID", "LTM", or None

**Returns:** List of `RetrievalResult`

##### `migrate()`

Run thermal migration. Returns number of blocks migrated.

##### `stats()`

Get memory statistics.

---

### MemoryBlock

```python
@dataclass
class MemoryBlock:
    key: str
    embedding: ndarray
    frequency: float
    quantized_frequency: float
    regime: str  # "STM", "MID", "LTM"
    cell_index: int
    metadata: dict
    access_count: int
    last_access: float
    created_at: float
```

---

### RetrievalResult

```python
@dataclass
class RetrievalResult:
    block: MemoryBlock
    similarity: float
    stress: float
```

---

### MemoryStats

```python
@dataclass
class MemoryStats:
    total_blocks: int
    stm_count: int
    mid_count: int
    ltm_count: int
    avg_stress: float
    capacity_used: float
```

## Examples

### Basic Usage

```python
from noetic_eidos import SpectralMemory

memory = SpectralMemory(capacity=5000)

# Store
memory.store("concept_a", embedding_a, metadata={"type": "fact"})

# Retrieve
results = memory.retrieve(query_vector, top_k=3)
for r in results:
    print(f"{r.block.key}: {r.similarity:.3f} ({r.block.regime})")
```

### Filtered Retrieval

```python
# Only STM
hot_results = memory.retrieve(query, regime_filter="STM")

# Only LTM
archived = memory.retrieve(query, regime_filter="LTM")
```

### Manual Migration

```python
n_migrated = memory.migrate()
print(f"Migrated {n_migrated} blocks")

stats = memory.stats()
print(f"STM: {stats.stm_count}, LTM: {stats.ltm_count}")
```
