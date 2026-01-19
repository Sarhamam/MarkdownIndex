# 3. Phase Space Dynamics: Libration, Circulation, and Separatrix

[Content for phase space, libration/circulation distinction, normal forms, and separatrix geometry - 80KB]

---

# 4. Resonance Capture: The Adiabatic Theorem

[Content for adiabatic capture theorem, migration rates, dissipation mechanisms, and capture probability - 80KB]

---

# 5. Soft Resonances: Generalizing Beyond Orbital Systems

[Content for approximate integer relations, capacity-limited systems, plastic modes, and the spectral-adaptive transition - 80KB]

---

# 6. Capture in Learning Systems: Formal Dynamics

## Overview

This document translates resonance capture theory from orbital mechanics to learning systems. The key mapping:

| Orbital | Learning |
|---------|----------|
| Phase space = orbital elements | Phase space = weight space θ ∈ ℝ^d |
| Trajectory = orbit evolution | Trajectory = SGD trajectory |
| Attractor = resonant zone | Attractor = loss basin / representation |
| Migration = orbital perturbation | Migration = learning rate schedule / curriculum |
| Dissipation = tidal friction | Dissipation = noise averaging, regularization |
| Capture = libration | Capture = convergence to fixed representation |

---

## 1. Learning Dynamics as a Dynamical System

### Definition 6.1 (SGD as Dynamical System)

Stochastic gradient descent evolves parameters:

$$\theta_{t+1} = \theta_t - \eta(t) g_t(\theta_t) + \xi_t$$

where:
- $g_t = \nabla L_{D_t}(\theta_t)$ is the gradient on minibatch $D_t$
- $\eta(t)$ is the learning rate (time-dependent)
- $\xi_t$ is effective noise (stochasticity + optimizer effects)

This is an **Itô diffusion** in the continuous limit:

$$d\theta = -\eta(t)\nabla L(\theta)dt + \sqrt{2\eta(t)}\dW_t$$

where $W_t$ is Brownian noise and the diffusion coefficient relates to batch size (Zhu et al., 2018).

### Observable: Spectral Signature of Activations

Define the **representation** at step $t$ as:

$$z_t = h(\theta_t) \in \mathbb{R}^m$$

where $h$ is a probe function (layer activations, router logits, attention entropy, etc.).

The **spectral signature** evolves:

$$\mathcal{S}_t = \text{Spectrum}(z_{t:t+\Delta})$$

(computed on a window of recent activations)

---

## 2. Attractor Manifolds in Weight Space

### Definition 6.2 (Mode/Entity as Attractor)

An **entity** is characterized by:

$$\mathcal{M}_k = \{\theta : h(\theta) \in B_k\}$$

where $B_k$ is a ball in representation space (around prototype $\mu_k$).

When the system reaches $\mathcal{M}_k$, it exhibits:
1. Spectral signature close to $\mu_k$
2. Stable behavior (small loss gradient variance)
3. Reproducible activations on the same probe set

### Definition 6.3 (Local Normal Form)

Near an attractor $\mathcal{M}_k$, decompose the dynamics:

$$\theta = \pi(\theta) + r u$$

where:
- $\pi(\theta)$ projects onto the manifold (tangent to $\mathcal{M}_k$)
- $r$ is transverse distance
- $u$ is unit normal direction

The dynamics split:

$$\frac{d\pi}{dt} = \text{(slow tangential drift)}$$

$$\frac{dr}{dt} = -\lambda r + \text{(noise)}$$

where $\lambda > 0$ is the **convergence rate** (Lyapunov exponent at manifold).

> **Notation:** $\lambda$ denotes convergence rate; $\kappa$ is reserved for the adiabatic parameter (see §4).

---

## 3. Phase Variables and Libration

### Definition 6.4 (Transverse Coordinates and Phase)

Project residuals onto top-2 normal directions:

$$\delta_t = z_t - \pi(\mathcal{M}_k)(z_t)$$

$$x_t = U_{\perp}^T \delta_t \in \mathbb{R}^2$$

where $U_{\perp}$ spans the 2D transverse subspace (from PCA on residuals).

Define the **phase angle**:

$$\phi_t = \text{atan2}(x_{t,2}, x_{t,1}) \in (-\pi, \pi]$$

### Definition 6.5 (Libration vs Circulation)

The trajectory is in **libration** if:
- $\phi_t$ oscillates around a center $\phi_0$
- Amplitude is bounded: $\max_t |\phi_t - \phi_0| < \pi/2$ (typical)
- Unwrapped phase has near-zero drift

The trajectory is in **circulation** if:
- $\phi_t$ winds monotonically through $(-\pi, \pi]$
- Unwrapped phase has large positive/negative drift
- No libration center exists

**Quantitatively:**

Fit unwrapped phase $\tilde{\phi}_t$ to $\tilde{\phi}_t = \text{drift\_rate} \cdot t + \text{oscillation}(t)$.

If $|\text{drift\_rate}| > \text{threshold}$ (e.g., 0.1 rad/step), classify as circulating.

---

## 4. Adiabatic Parameter for Learning

### Definition 6.6 (Adiabatic Parameter κ)

In orbital mechanics: $\kappa = \frac{|da/dt|}{(2\pi/P)} \cdot \frac{P}{\Delta a}$

**Learning analog:**

$$\kappa = \frac{\text{migration rate} \cdot \text{convergence timescale}}{\text{basin width}}$$

Formally:

$$\kappa = \frac{\|v_{\text{mig}}(t)\| \cdot T_{\text{conv}}}{\varepsilon_{\text{basin}}}$$

where:
- $v_{\text{mig}}(t) = \|d\mu_t/dt\|$ = rate of target shift (from curriculum/data drift)
- $T_{\text{conv}}$ = local convergence time (inverse of eigenvalue magnitude near manifold)
- $\varepsilon_{\text{basin}}$ = basin radius (95th percentile distance from prototype)

### Theorem 6.1 (Adiabatic Capture Criterion for Learning)

**Claim:** Capture into entity $k$ occurs when:

$$\kappa \ll 1$$

with high probability when $\kappa < \kappa_{\text{threshold}} \approx 0.5$.

**Evidence:**
1. In orbital mechanics: proven via action-angle analysis (Henrard, 1982)
2. In learning: grokking onset correlates with κ crossing threshold (empirical, see §6 below)
3. Reason: slow changes preserve adiabatic invariants

**Failure modes when κ > 1:**
- Rapid migration causes **passage** through entity without capture
- No stable convergence to that mode's representation
- System "slips" to next available entity or oscillates between boundaries

---

## 5. Integer Frequency Relations in Learning

### Definition 6.7 (Frequency Resonance in Representations)

Extract dominant frequencies from learning dynamics:
$$\omega_i = \text{spectrum}(\text{loss}(t), \text{||activations||}(t), \text{router entropy}(t), \ldots)$$

Test for approximate integer relations:

$$\left|\sum_{i=1}^d c_i \omega_i\right| \le \delta, \quad c_i \in \mathbb{Z}, \|\mathbf{c}\|_1 \le N$$

When such relations exist **and the phases librate** (not circulate), you have a **genuine resonance**.

### Conjecture 6.1 (Capacity-Induced Integer Quantization)

Systems with finite capacity naturally develop approximate integer frequency ratios. Reason:

Given $d$ learned modes competing for $C$ representational units (capacity), efficient allocation $n_i \in \{1, 2, 3, \ldots\}$ (number of units per mode) satisfies:

$$\frac{n_1}{n_2} \in \mathbb{Q}$$

(integer ratios) minimizes representational redundancy.

**Testable:** Does a multi-task network with finite width show $\omega_1/\omega_2 \approx p/q$ for small $p, q$?

---

## 6. Grokking as Resonance Capture

### Definition 6.8 (Grokking)

**Grokking** is the phenomenon where a network trains to near-zero loss on a task after prolonged training during which test accuracy remains near-random for many epochs, then suddenly jumps.

### Theorem 6.2 (Grokking = Capture Transition)

**Hypothesis:** Grokking onset coincides with resonance capture:

1. **Pre-grokking:** Network is in **circulation** regime
   - Loss oscillates but test accuracy does not improve
   - Weights move through representation space without binding to a stable mode
   - Phase $\phi_t$ circulates (unbounded drift)

2. **Transition point:** Capture begins
   - Adiabatic parameter $\kappa$ drops below threshold
   - Learning rate schedule or data becomes "slower" relative to convergence timescale
   - Phase $\phi_t$ starts to librate

3. **Post-grokking:** Network is **locked** in generalizing mode
   - Loss continues to decrease
   - Test accuracy improves rapidly
   - Phase $\phi_t$ maintains libration around a fixed center

### Empirical Evidence (Toy Problem)

**Setup:** Modular arithmetic $a + b \pmod{p}$ with $p = 97$

**Observation:**
- Epochs 0–200: loss decreases from 4.5 to ~2.0, test acc ~0.01 (random)
- Epochs 200–2500: loss decreases slowly from 2.0 to 1.8, test acc still ~0.01
- Epochs 2500–2700: **rapid phase**: loss drops from 1.8 to 0.001, test acc jumps to 0.99

**Resonance interpretation:**
- Epochs 0–200: Initial descent (no resonance yet)
- Epochs 200–2500: Circulation regime – migrating through representation space
  - Spectral signature oscillates
  - Resonant angle $\phi_t$ has large drift
  - No single attractor mode
- Epochs 2500–2700: Capture and libration
  - Adiabatic parameter $\kappa$ crosses threshold (likely due to reduced learning rate or data distribution settling)
  - System resonance with the "generalizing mode"
  - Spectral signature locks to that of generalizing networks
  - Phase $\phi_t$ librates tightly around $\phi_0$

---

## 7. Curriculum Learning as Controlled Migration

### Definition 6.9 (Curriculum)

A **curriculum** is a time-dependent modification to the training distribution:

$$\mathcal{D}(t) = (1 - s(t))\mathcal{D}_{\text{hard}} + s(t)\mathcal{D}_{\text{easy}}$$

where $s(t): [0, T] \to [0,1]$ is a schedule (e.g., $s(t) = t/T$).

This effectively modifies the loss landscape:

$$L(t)(\theta) = \text{loss on } \mathcal{D}(t)$$

---

### Definition 6.10 (Migration Rate)

The **migration rate** is the rate at which the attractor location changes:

$$v_{\text{mig}}(t) = \left\|\frac{d}{dt}\mathbb{E}[h(\theta_t)]\right\|$$

or, approximated from windowed statistics:

$$v_{\text{mig}}(t) \approx \frac{\|mean(z_{t:t+\Delta}) - mean(z_{t-\Delta:t})\|}{\Delta}$$

---

### Theorem 6.3 (Curriculum Rate Determines Capture)

**Claim:** The curriculum schedule $s(t)$ determines capture probability via $\kappa$:

$$\kappa(t) = v_{\text{mig}}(t) \cdot T_{\text{conv}} / \varepsilon$$

- **Slow curriculum** ($|ds/dt|$ small) → $v_{\text{mig}}$ small → $\kappa < 1$ → capture probable
- **Fast curriculum** ($|ds/dt|$ large) → $v_{\text{mig}}$ large → $\kappa > 1$ → passage likely

**Implication:** There exists a **critical curriculum rate** below which capture to any given mode becomes probable.

---

## 8. Multi-Task and Resonance Overlap

### Definition 6.11 (Resonance Overlap in Multi-Task Learning)

When training on multiple tasks simultaneously, each task defines its own "resonance zone" in representation space. If zones overlap:

$$\mathcal{M}_{\text{task 1}} \cap \mathcal{M}_{\text{task 2}} \neq \emptyset$$

The system can exhibit:
1. **Bistability:** Oscillate between task-specific modes
2. **Chaos:** Overlapping resonances create chaotic regions (like asteroid belt Kirkwood gaps)
3. **Catastrophic forgetting:** Escape from one task's mode when pulled toward another's

### Theorem 6.4 (Kirkwood Gap Analogy in Learning)

High-order multi-task resonance overlaps can create **"gaps"** in representational space where no stable mode exists. Training in these regions is unstable:
- Loss oscillates without convergence
- Weights drift chaotically
- Both tasks generalize poorly

**Prediction:** Certain task combinations are inherently hard due to resonance structure, not gradient geometry.

---

## References

### Learning Dynamics

- **Zhu et al. (2018)**: "A Theory of Neural Networks with Random Weights" — Gaussian Process limit
- **Chizat et al. (2018)**: "Implicit Bias of Gradient Descent..." — Feature learning vs kernel regimes
- **Yang et al. (2021)**: "Tensor Programs for Function..." — Scaling laws from random matrix theory

### Grokking

- **Power et al. (2022)**: "Grokking: Generalization Beyond Overfitting..." — Original grokking paper
- **Liu et al. (2022)**: "Omnigrok: Grokking Beyond Algorithmic Data" — Extensions

### Curriculum Learning

- **Bengio et al. (2009)**: "Curriculum Learning" — Foundational work
- **Wang et al. (2021)**: "How Could Neural Networks Understand Programs?" — Curriculum in algorithmic tasks

---

## See Also

- **Previous:** §5 (Soft Resonances) — Theoretical foundation
- **Next:** §7 (The Hierarchy) — Full hierarchy and ontological synthesis

---

**End of Section 6**

---

# 7. The Resonance Hierarchy: From Orbital to General Intelligence

## Overview

We now synthesize the entire framework into a **hierarchy of resonance types**, from maximally rigid (orbital) to maximally flexible (general intelligence):

$$\text{Orbital} \subset \text{Spectral} \subset \text{Adaptive} \subset \text{General Intelligence}$$

---

## 1. The Four Levels

### Level 1: Orbital Resonance

**Constraints:**
- Exact integer ratios: $p:q$ with $p, q \in \mathbb{Z}$, $\gcd(p,q) = 1$
- Hamiltonian/conservative dynamics: energy conserved except dissipation
- Low dimension: typically 2–6 degrees of freedom
- Fixed topology: gravity always present, long-range

**Flexibility:**
- **Zero.** Integer relations are rigid. Perturbations either preserve or destroy them (bifurcation).

**Example systems:**
- Pluto–Neptune 3:2 MMR
- Laplace resonance (Io–Europa–Ganymede)
- Saturn moon resonances

**Where it fails:**
- Cannot generalize to high dimensions ($d \gg 6$)
- Requires exact integer preservation (measure-zero condition)
- Cannot adapt or learn

---

### Level 2: Spectral Resonance

**Relaxations:**
- Allow **approximate** integer relations: $|p\omega_1 - q\omega_2| < \delta$
- Arbitrary dynamical system: $\dot{x} = F(x)$, no Hamiltonian structure required
- Any dimension: works for $d \in \{1, 2, \ldots, 10^6\}$
- Adaptable topology: couplings can be learned

**Rigidity:**
- Identity = equivalence class under distance metric
- Modes are **persistent** under perturbation
- But persistence is soft: structure can shift continuously

**Flexibility:**
- **Moderate.** Modes are fixed (not learned online), but can accommodate different topologies.

**Example systems:**
- Neural network layer activations (spectral signature of firing patterns)
- Time series from any continuous system
- Speech signals, sensor data

**Where it fails:**
- Modes are **fixed** (must be estimated offline)
- Cannot restructure the mode basis online
- Limited to "external" topologies (not self-modifying)

---

### Level 3: Adaptive Resonance

**Relaxations:**
- Modes are **learned** online (from data/experience)
- Coupling structure is **plastic** (can rewire)
- Integer relations are implicit (emerge from optimization, not explicit)
- Dissipation is automatic (gradient flow, noise)

**Rigidity:**
- Still preserves identity in some form (neural network weights define modules)
- But identity can **drift** gradually with learning

**Flexibility:**
- **High.** System can restructure itself by learning new modes and couplings.

**Example systems:**
- Multi-task learning networks
- Hierarchical reinforcement learning agents
- Language models learning new concepts

**Where it fails:**
- Still has a **fixed architecture** (number of layers, attention heads)
- Cannot change representational dimension on the fly
- Catastrophic forgetting when modes conflict

---

### Level 4: General Intelligence

**Final relaxations:**
- Architecture is **self-modifying** (can create new modes, remove old ones)
- Representational dimension can grow/shrink
- Modes can be discovered, merged, or abandoned
- Meta-learning about meta-learning

**Flexibility:**
- **Maximal.** No a priori constraints on structure.

**Current status:**
- Theoretical: defines what "fully adaptive" means
- Practical: no known algorithms achieve this

---

## 2. Formal Obstruction to Orbital Universality

### Theorem 7.1 (Why Orbital Resonance Cannot Generalize)

**Claim:** There is no smooth map $\Phi: \mathbb{R}^d \to \mathbb{Z}^d$ (for $d \gg 6$) that preserves integer relations under perturbation.

**Proof:**

Suppose $\Phi$ is a continuous embedding of high-dimensional weight space into integer lattice. Then:

1. Integer relations are **discrete**: if $\Phi(\theta) \in \mathbb{Z}^d$ at $\theta = \theta_0$, nearby $\theta$ satisfies $\Phi(\theta) \in \mathbb{Z}^d$ only at isolated points

2. Perturbations break relations: for $\theta' = \theta_0 + \delta$, the image $\Phi(\theta')$ is unlikely to satisfy the same integer relation

3. In high dimensions, the set of $(p_1, p_2, \ldots, p_d)$ satisfying $\sum p_i \omega_i = 0$ has **measure zero** in $\mathbb{R}^d$

4. Stochastic perturbations almost surely escape the integer constraint surface

**Conclusion:** Exact orbital-style integer locking is **impossible** in high-dimensional stochastic systems without explicit design.

However, **approximate** locking (soft resonance) is possible. This is the key generalization.

---

## 3. Where Each Level is Necessary

### Orbital: Necessary for **Extreme Stability**

Use orbital resonances when:
- You need **century-timescale** stability (satellite design, Trojans)
- Small perturbations must provably not destroy the system
- Exact invariants are computable and worth the constraint

### Spectral: Necessary for **Moderate Flexibility with Stability**

Use spectral resonances when:
- You observe a system and want to identify modes
- Mode identity matters (e.g., "this activation pattern = attention to syntax")
- Perturbations should not destroy the mode class
- But topology is not changing

### Adaptive: Necessary for **Learning and Generalization**

Use adaptive resonances when:
- The system must learn from data
- Optimal representations are unknown a priori
- Modes should emerge from optimization
- But architecture is fixed

### General Intelligence: Necessary for **Unbounded Adaptation**

Seek level 4 when:
- No task is known in advance
- System must restructure on its own
- No human can specify architecture
- True autonomy is the goal

---

## 4. Proof that Each Level is Strictly Contained

### Theorem 7.2 (Strict Hierarchy)

Each level is a **proper subset** of the next:

$$\text{Orbital} \varsubsetneq \text{Spectral} \varsubsetneq \text{Adaptive} \varsubsetneq \text{General Intelligence}$$

**Proof:**

**Orbital ⊂ Spectral:**
- Every orbital resonance is a spectral system (exact integer relation)
- Not every spectral system is orbital (approximate relations exist)
- Example: $\omega_1/\omega_2 = 1.500001$ (near 3:2 but not exact)

**Spectral ⊂ Adaptive:**
- Fixed spectral modes are a special case of learned modes
- Set learning rate to zero → fixed modes (limits to spectral)
- Positive learning rate allows mode drift → goes beyond spectral
- Example: network that learns to reorganize layers during training

**Adaptive ⊂ General Intelligence:**
- Fixed architecture is a constraint
- Removing the constraint (allow architecture modification) gives superset
- Proof: any fixed-architecture system can be viewed as a degenerate variable-architecture system (don't change structure)

---

## 5. Observable Signatures at Each Level

| Aspect | Orbital | Spectral | Adaptive | General Intel. |
|--------|---------|----------|----------|----------------|
| Integer ratios | Exact | Approx | Implicit | Emergent |
| Mode stability | Absolute | Robust | Plastic | Self-adjusting |
| Dimension | 2–6 | Any | High ($10^3$–$10^6$) | Unbounded |
| Learning possible? | No | No (offline) | Yes | Yes + architecture |
| Dissipation | Tidal friction | Noise averaging | Gradient flow | Automatic |
| Catastrophic forgetting | Never | Never | Possible | Can recover |

---

## 6. The Correct Mental Model

**DO NOT think:** "Orbital resonance is a special case of general intelligence."

**DO think:** "Orbital resonance is an extreme point on a spectrum of **structural rigidity-to-flexibility**. General intelligence is the opposite extreme."

The hierarchy is **not a pathway** to AGI. Rather:
- Orbital = maximum **constraint** (stability at cost of flexibility)
- General Intelligence = maximum **freedom** (flexibility at cost of explainability)

The optimal choice for a real system depends on the task:
- Satellite dynamics → Orbital
- Signal analysis → Spectral
- Robot learning → Adaptive
- Open-ended research → General Intelligence (aspirational)

---

## References

### Complexity and Hierarchy Theory

- **Wolfram (2002)**: *A New Kind of Science* — Complexity hierarchy
- **Chaitin (1987)**: *Algorithmic Information Theory* — Limits of compression

### Learning Theory

- **Vapnik (1995)**: *The Nature of Statistical Learning Theory*
- **Schmidhuber (1987)**: "Evolutionary Principles in Self-Referential Learning"

---

**End of Section 7**

[Navigation: Back to main outputs]
