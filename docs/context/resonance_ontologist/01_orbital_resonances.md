# 1. Orbital Resonances: Formal Definitions and Examples

## Overview

An **orbital resonance** is a dynamical configuration where two or more orbiting bodies maintain a fixed integer ratio of orbital periods through phase-locking. This is not merely a numerical coincidence—it is enforced by **librating resonant angles** that remain bounded despite perturbations.

This section provides:
1. Formal definition of mean-motion resonances (MMRs)
2. The resonant angle condition
3. Classification by order and type
4. Solar System examples with full specifications
5. Why orbital resonance is too constrained for general systems

---

## 1. Mean-Motion Resonance: Formal Definition

### Definition 1.1 (p:q Mean-Motion Resonance)

Two bodies orbiting a primary (the Sun, Jupiter, or Saturn) with mean motions $n_1 > n_2$ are in a **p:q mean-motion resonance** if:

$$\frac{n_1}{n_2} = \frac{p}{q}$$

equivalently, their periods satisfy:

$$\frac{T_2}{T_1} = \frac{p}{q}$$

where $p > q$ are **coprime positive integers** (definition: $\gcd(p,q) = 1$).

The **resonance order** is $|p - q|$, with first-order resonances ($|p-q|=1$) being the strongest and most stable.

### The Libration Condition (Critical)

A p:q period ratio is merely a **near-integer coincidence** unless accompanied by **libration**. Specifically, there must exist at least one **resonant angle**:

$$\phi = p\lambda_2 - q\lambda_1 + \text{(terms in } \varpi_i, \Omega_i\text{)}$$

such that:

$$\boxed{\phi(t) = \phi_0 + \delta\phi(t)}$$

where:
- $\phi_0$ is a constant (libration center, typically $0°$ or $180°$)
- $\delta\phi(t)$ is **bounded**: $|\delta\phi(t)| \le A$ (libration amplitude $A < \pi$)

**Without libration**, the angle circulates ($\phi(t) \to \phi(t) + 2\pi$ unboundedly), and there is no resonance—only transient passage.

### Definition 1.2 (Resonant Angle)

A **resonant angle** for a p:q MMR has the form:

$$\phi = j_1\lambda_1 + j_2\lambda_2 + j_3\varpi_1 + j_4\varpi_2 + j_5\Omega_1 + j_6\Omega_2$$

where:
- $\lambda_i$ = mean longitude of body $i$
- $\varpi_i$ = longitude of perihelion
- $\Omega_i$ = longitude of ascending node
- $j_k \in \mathbb{Z}$ are integer coefficients

Subject to **d'Alembert's rules**:
1. $j_1 + j_2 + j_3 + j_4 + j_5 + j_6 = 0$ (linear momentum conservation)
2. $j_5 + j_6$ is even (reflection symmetry)

The primary resonant angle satisfies:

$$j_1 + j_2 = -(p - q), \quad j_1 = -p, \quad j_2 = q$$

---

## 2. Classification: e-Type and i-Type Resonances

### Definition 2.1 (Resonance Type)

- **e-type resonance**: The resonant angle involves $\varpi$ (longitudes of perihelion) → couples to **eccentricity** $e$

- **i-type resonance**: The resonant angle involves $\Omega$ (longitudes of ascending node) → couples to **inclination** $i$

The **resonance order** = number of slow angles involved.

### Order Hierarchy

- **First-order** ($|p-q| = 1$): e.g., 2:1, 3:2, 4:3
  - Single resonant angle dominates
  - Strongest libration
  - Example: Pluto–Neptune 3:2

- **Second-order** ($|p-q| = 2$): e.g., 3:1, 5:2
  - Two slow angles required
  - Weaker libration
  - Example: Mimas–Tethys 4:2 (same as 2:1 in periods, but second-order)

- **Higher-order**: Increasingly weak

### e-type vs i-type Examples

| System | Ratio | Type | Order | Primary Angle |
|--------|-------|------|-------|---------------|
| Pluto–Neptune | 3:2 | e | 1 | $3\lambda_N - 2\lambda_P - \varpi_P$ |
| Enceladus–Dione | 2:1 | e | 1 | $2\lambda_D - \lambda_E - \varpi_E$ |
| Mimas–Tethys | 4:2 | i | 2 | $4\lambda_T - 2\lambda_M - \Omega_M - \Omega_T$ |

---

## 3. Solar System Examples

### Example 3.1: Pluto–Neptune (3:2, e-type)

**Configuration:**
- Pluto orbital period: $T_P \approx 247.94$ years
- Neptune orbital period: $T_N \approx 164.79$ years
- Period ratio: $T_P / T_N = 1.503... \approx 3/2$

**Primary resonant angle:**
$$\phi = 3\lambda_N - 2\lambda_P - \varpi_P$$

**Libration:**
- Center: $\phi_0 = 180°$ (Pluto lags behind the conjunction)
- Amplitude: $\approx 82°$ (very large, but bounded)
- Period: $\approx 20,000$ years

**Consequence:** This resonance protects Pluto from close encounters with Neptune. When Pluto approaches Neptune's orbit (at perihelion), Neptune is always $\sim 90°$ away, preventing collision.

**Formal statement:**

The resonant angle librates (does not circulate), ensuring that the conjunction geometry repeats with a period much longer than the orbital periods. This is a **stable, protective resonance**.

---

### Example 3.2: Asteroid Belt Kirkwood Gaps (Jupiter resonances)

The asteroid belt has prominent depletions at specific semimajor axes corresponding to high-order resonances with Jupiter.

**Primary gaps:**

| Ratio | Semimajor axis (AU) | Order | Status |
|-------|-------------------|-------|--------|
| 4:1 | 2.06 | 3 | Moderate depletion |
| 3:1 | 2.50 | 2 | **Strong depletion** |
| 5:2 | 2.82 | 3 | Moderate |
| 2:1 | 3.27 | 1 | Severe depletion |

**Why gaps form:**

Unlike Pluto–Neptune (stable, protective), these are **destabilizing resonances**. When combined with the $\nu_6$ secular resonance (Mars + asteroid perihelion precession alignment), the overlapping resonances create **chaotic diffusion**:

1. Asteroid enters resonance
2. Oscillates in resonant angle
3. Overlaps with another resonance zone
4. Chaotic diffusion increases eccentricity
5. Orbit crosses inner planets
6. Ejected from asteroid belt

**Mathematical signature:**

The 3:1 resonance has resonant angle:
$$\phi = 3\lambda_J - \lambda_a - 2\varpi_a$$

When this resonance overlaps with secular resonance, the combined phase space becomes **chaotic**, and bounded orbits cease to exist in that region.

---

### Example 3.3: Io–Europa–Ganymede Laplace Resonance (1:2:4)

This is a **genuinely three-body resonance**—irreducible to pairwise terms.

**Configuration:**
- Io period: $T_I = 1.769$ days
- Europa period: $T_E = 3.551$ days  
- Ganymede period: $T_G = 7.155$ days

**Period ratios:**
$$T_I : T_E : T_G = 1 : 2.009 : 4.044$$

**The Laplace resonant angle:**

$$\Phi_L = \lambda_I - 3\lambda_E + 2\lambda_G$$

librates around $\Phi_L \approx 180°$ with amplitude $< 1°$ (very tight locking).

**Why three-body?**

- The individual pairwise ratios (Io–Europa 1:2, Europa–Ganymede 1:2) both **circulate** (unbounded drift)
- Only the linear combination $\Phi_L$ librates
- Cannot decompose into independent 2-body resonances

**Consequence:**

The three moons are locked in a **rigid triad**:
- Prevents triple conjunctions
- Distributes tidal stress across the system
- Io–Europa tidal interaction heats Io (volcanism)
- Europa–Ganymede interaction maintains Europa's subsurface ocean

**Mathematically:**

The constraint $\lambda_I - 3\lambda_E + 2\lambda_G \approx \text{const}$ is a **single constraint surface** in the 3-body phase space:

$$\dim(\text{constraint surface}) = 6 - 1 = 5$$

This cannot be factored as two independent 2-body constraints.

---

### Example 3.4: Enceladus–Dione (2:1, e-type)

**Configuration:**
- Enceladus period: $T_E = 1.370$ days
- Dione period: $T_D = 2.737$ days
- Ratio: $T_D / T_E \approx 2.0$

**Resonant angle:**
$$\phi = 2\lambda_D - \lambda_E - \varpi_E$$

librates around $0°$ (Enceladus is "ahead" of the resonance center).

**Effect on eccentricity:**

The resonance maintains Enceladus's forced eccentricity at $e \approx 0.0047$. This small-but-nonzero eccentricity drives **tidal dissipation**:

$$\dot{E} \propto e^2$$

where $\dot{E}$ is energy dissipation rate. This heats Enceladus's interior, maintaining liquid water beneath the ice shell and driving the south-polar geysers.

**Dynamical significance:**

Without the resonance, Enceladus's eccentricity would damp to zero (circular orbit). The resonance **sustains** the eccentricity against dissipation, enabling geology.

---

### Example 3.5: Mimas–Tethys (4:2 = 2:1 period ratio, i-type)

**Configuration:**
- Mimas period: $T_M = 0.942$ days
- Tethys period: $T_T = 1.888$ days
- Ratio: $T_T / T_M = 2.007$ (same as Enceladus–Dione)

**Key difference from Enceladus–Dione:**

This is a **second-order i-type resonance**, not first-order e-type.

**Resonant angle:**
$$\phi = 4\lambda_T - 2\lambda_M - \Omega_M - \Omega_T$$

librates around $0°$ with amplitude $\approx 95°$.

**Effect on inclination:**

The resonance **pumps inclination**. Mimas has anomalously high inclination ($i_M \approx 1.5°$, unusual for a large moon) maintained by this resonance. The nodes $\Omega_M, \Omega_T$ are locked in a fixed relationship.

**Implication:**

i-type resonances control vertical orbital structure, while e-type control shape. This system demonstrates both can coexist.

---

## 4. Why Orbital Resonance Is Too Constrained

### Theorem 4.1 (Rigidity of Orbital Resonances)

Orbital resonances require **all** of the following conditions:

1. **Low-dimensional phase space** (typically 2–6 DOF)
2. **Conservative/near-Hamiltonian dynamics** ($H = \sum p_i^2/2 + V(q_i)$ up to perturbation)
3. **Exact integer ratios** ($p$:$q$ with $p, q \in \mathbb{Z}$)
4. **Fixed topology** (gravity is long-range, always present)
5. **Phase coherence** over Gyear timescales (slow dissipation)

### Formal Obstruction to Generalization

**Claim:** Orbital resonance cannot directly generalize to high-dimensional stochastic systems.

**Proof sketch:**

Let $X = \mathbb{R}^d$ be a learning system's weight space with $d \gg 6$.

For an orbital-like resonance to exist, we need:
- Exact integer relation: $\sum_{i=1}^d k_i n_i = 0$ with $k_i \in \mathbb{Z}$
- Phase locking: $\phi = \sum_{i=1}^d k_i \lambda_i$ librates
- Stability: Perturbations $\delta\theta$ preserve $\phi$ up to libration

In $d$ dimensions with $d \gg 6$:
- Integer relations are **over-constrained**: most frequency sets admit no exact relations
- Phase locking requires **all $d$ components to conspire**, which noise destroys
- Small perturbations almost certainly break the relations (measure-zero condition)

**Conclusion:** Exact orbital-style integer locking is impossible in high dimensions without explicit design.

However, **approximate rational locking** (soft resonance) under capacity pressure is possible. See [05_soft_resonances.md](05_soft_resonances.md).

---

## 5. Mathematical Structure Summary

### Key Invariants

| Quantity | Symbol | Conservation | Role |
|----------|--------|--------------|------|
| Mean longitude | $\lambda_i$ | Fast variable (mod $2\pi$) | Conjugate to $n_i$ |
| Mean motion | $n_i = 2\pi/T_i$ | Nearly conserved | Defines resonance ratio |
| Perihelion longitude | $\varpi_i$ | Slow (precesses) | e-type resonances |
| Node longitude | $\Omega_i$ | Slow (precesses) | i-type resonances |
| Eccentricity | $e_i$ | Slow (varies) | Forced by e-type resonances |
| Inclination | $i_i$ | Slow (varies) | Forced by i-type resonances |

### Canonical Hamiltonian Form

In Delaunay elements $(L_i, G_i, H_i, \ell_i, g_i, h_i)$ where:
- $L_i = m_i\sqrt{\mu a_i}$ (Delaunay action, related to semi-major axis)
- $\ell_i = M_i$ (mean anomaly, related to $\lambda_i$)
- $g_i = \varpi_i$ (perihelion argument)
- $h_i = \Omega_i$ (node argument)

The Hamiltonian near resonance takes the form:

$$H = H_0(L_1, L_2) + \epsilon H_1(L_1, L_2, \ell_1, \ell_2, g_1, g_2, h_1, h_2) + O(\epsilon^2)$$

where $\epsilon \sim 10^{-3}$ to $10^{-6}$ (perturbation small compared to unperturbed energies).

Resonant terms in $H_1$ have the form:

$$H_{\text{res}} \propto \cos(p\ell_2 - q\ell_1 + \text{slow terms})$$

Near the resonance, action-angle variables can be transformed to **resonant coordinates**:

$$\Phi = p\ell_2 - q\ell_1 + \text{(slow)}, \quad J = \text{(conjugate)}$$

where $\Phi$ is the resonant angle and its conjugate $J$ evolves slowly.

---

## References

### Classical Results

- **Henrard (1982)**: "Capture into Resonance: An Extension of the Use of Adiabatic Invariants" — Seminal adiabatic capture theory
- **Murray & Dermott (1999)**: *Solar System Dynamics* — Comprehensive reference for orbital mechanics
- **Wisdom (1985)**: "A Perturbative Treatment of Motion near the 3/1 Kirkwood Gap" — Chaotic diffusion in asteroid belt
- **D'Alembert (18th c.)**: Rules for resonant angle structure in planetary problems

### Recent Work

- **Batygin & Brown (2016)**: Evidence for Planet 9 from resonance structure in Kuiper Belt
- **Petrovich et al. (2019)**: Migration-induced resonance capture in exoplanet systems

---

## See Also

- **Next:** [02_spectral_signatures.md](02_spectral_signatures.md) — How to generalize from orbital to spectral resonance
- **Phase space:** [03_phase_space_dynamics.md](03_phase_space_dynamics.md) — Libration/circulation in abstract systems
- **Why it fails here:** [07_hierarchy.md](07_hierarchy.md) § 2 — Formal obstruction to universalizing orbital resonance

---

**End of Section 1**

[← Back to README](00_README.md) | [Next: Spectral Signatures →](02_spectral_signatures.md)
