# 2. Spectral Signatures: Identity through Frequency Decomposition

## Overview

While orbital resonances are confined to low-dimensional Hamiltonian systems, **spectral signatures** provide a general framework for defining identity in arbitrary dynamical systems. The key shift:

| Orbital | Spectral |
|---------|----------|
| Identity = exact integer phase locking | Identity = equivalence class of frequency distributions |
| Fixed topology (gravity) | Arbitrary dynamical system $\dot{x} = F(x)$ |
| Low dimension | Any dimension |
| Truth = libration | Truth = persistence under perturbation |

This section formalizes:
1. Spectral signature representations
2. Distance metrics and equivalence classes
3. Stability and robustness
4. Connection back to orbital resonance as a special case

---

## 1. Spectral Signature Representations

### Definition 2.1 (Power Spectral Density)

For a time series $y(t)$, the **power spectral density** (PSD) is:

$$S_y(\omega) = \lim_{T \to \infty} \mathbb{E}\left[\left|\int_0^T y(t)e^{-i\omega t}dt\right|^2 / T\right]$$

In practice, estimated via Welch's method:
$$S_y(\omega) = \text{Welch}(y(t), \text{window}, \text{overlap})$$

This produces $S_y(\omega) \ge 0$ for all frequencies $\omega \in [0, \omega_{\max}]$.

### Definition 2.2 (Dense Spectral Signature)

A **dense spectral signature** is the histogram of power across frequency bins:

$$\mathcal{S}_{\text{dense}} = \{s_b\}_{b=1}^B$$

where:
$$s_b = \int_{\omega_b}^{\omega_{b+1}} S_y(\omega) d\omega$$

Normalized to a probability distribution:
$$p_b = \frac{s_b}{\sum_b s_b}$$

**Interpretation:** $p_b$ is the fraction of total power in frequency band $b$. This is a point on the **probability simplex**:

$$\mathcal{P}^{B-1} = \{p \in \mathbb{R}^B_{\ge 0} : \sum_b p_b = 1\}$$

### Definition 2.3 (Sparse Spectral Signature)

A **sparse signature** is a peak list:

$$\mathcal{S}_{\text{sparse}} = \{(\omega_k, a_k, \gamma_k)\}_{k=1}^K$$

where:
- $\omega_k$ = peak frequency
- $a_k$ = amplitude (height)
- $\gamma_k$ = linewidth (damping)

This is a **weighted point measure on frequency space**:

$$\mu = \sum_{k=1}^K a_k \delta_{\omega_k}$$

where $\delta_{\omega}$ is a Dirac point mass at $\omega$.

**Interpretation:** Each peak represents an oscillatory mode with its own timescale and dissipation.

---

## 2. Distance Metrics: Measuring Signature Similarity

Two signatures are "the same" if they are **close** in some metric. We present three canonical choices.

### 2.1 Jensen–Shannon Distance

**Definition 2.4:**

$$d_{\text{JS}}(p, q) = \sqrt{\frac{1}{2}\mathrm{KL}(p \| m) + \frac{1}{2}\mathrm{KL}(q \| m)}$$

where:
$$\mathrm{KL}(p \| m) = \sum_b p_b \log(p_b / m_b), \quad m_b = \frac{p_b + q_b}{2}$$

**Properties:**
- Symmetric: $d_{\text{JS}}(p,q) = d_{\text{JS}}(q,p)$
- Bounded: $d_{\text{JS}} \in [0, 1]$ (max when supports disjoint)
- Triangle inequality: $d_{\text{JS}}(p,r) \le d_{\text{JS}}(p,q) + d_{\text{JS}}(q,r)$
- Metric space: $\mathcal{P}^{B-1}$ with $d_{\text{JS}}$ is a metric

**Interpretation:** Measures divergence in log-likelihood. Invariant to frequency relabeling (symmetric KL).

### 2.2 Wasserstein Distance (Earth Mover's)

**Definition 2.5 (1D case):**

For probability distributions on the frequency axis $\omega \in [0, \omega_{\max}]$:

$$W_1(p, q) = \int_0^{\omega_{\max}} |F_p(\omega) - F_q(\omega)| d\omega$$

where $F_p(\omega) = \sum_{b: \omega_b \le \omega} p_b$ is the cumulative distribution.

**Properties:**
- Geometric: measures how much "mass" must be transported
- Accounts for frequency ordering: modes at different frequencies are distinguishable
- Bounded by frequency range: $W_1 \in [0, \omega_{\max}]$

**Interpretation:** If $p$ has peak at 5 Hz and $q$ at 7 Hz, Wasserstein cost is proportional to the 2 Hz shift. JS divergence only sees that distributions differ.

### 2.3 Fisher–Rao Distance

**Definition 2.6:**

$$d_{\text{FR}}(p, q) = \arccos\left(\sum_b \sqrt{p_b q_b}\right)$$

The argument $\sum_b \sqrt{p_b q_b}$ is the **Bhattacharyya coefficient**. This equals the geodesic distance on the probability simplex under the Fisher–Rao metric.

**Properties:**
- Geodesic distance on statistical manifold (Riemannian)
- Invariant to reparametrization (intrinsic geometry)
- $d_{\text{FR}} \in [0, \pi/2]$ (since $\sum_b \sqrt{p_b q_b} \in [0, 1]$)
- Connects to information geometry (Amari)

**Interpretation:** The "straightest path" between two probability distributions in the space of all distributions. Equivalently, identify each distribution $p$ with $\sqrt{p} \in S^{B-1}$ (the unit sphere), and $d_{\text{FR}}$ is the great-circle distance.

### Comparison

| Metric | Best for | Geometry |
|--------|----------|----------|
| Jensen–Shannon | Information-theoretic divergence | Divergence-based |
| Wasserstein | Accounting for frequency shifts | Transportation cost |
| Fisher–Rao | Differential geometry perspective | Riemannian manifold |

**Recommendation for learning systems:** Fisher–Rao, because it connects to differential geometry of representation spaces. See [05_soft_resonances.md](05_soft_resonances.md) § 3.

---

## 3. Entities via ε-Connectivity

### Definition 2.7 (Entity via ε-Connectivity)

Fix a metric $d$ on signature space. Define the **ε-neighborhood graph** $G_\varepsilon$:
- Vertices: signatures $\{\mathcal{S}_i\}$
- Edges: $(\mathcal{S}_i, \mathcal{S}_j) \in E \iff d(\mathcal{S}_i, \mathcal{S}_j) \le \varepsilon$

An **entity** is a **connected component** of $G_\varepsilon$:

$$e = \{\mathcal{S}_i : \mathcal{S}_i \text{ reachable from } \mathcal{S}_0 \text{ via edges in } G_\varepsilon\}$$

> **Technical note:** The naive definition "$\mathcal{S}_1 \sim \mathcal{S}_2 \iff d(\mathcal{S}_1, \mathcal{S}_2) \le \varepsilon$" is reflexive and symmetric but **not transitive** (if $d(A,B) \le \varepsilon$ and $d(B,C) \le \varepsilon$, we only have $d(A,C) \le 2\varepsilon$ by triangle inequality). Using connected components restores transitivity by construction: reachability in a graph is transitive.

**Interpretation:**
- Entity $e$ is a set of signatures reachable from each other via ε-chains
- Tolerance $\varepsilon$ is the **resolution of identity** for that system
- Different $\varepsilon$ give different ontologies (coarse vs fine-grained)

**In practice:** Use a clustering algorithm (HDBSCAN, single-linkage, etc.) with the chosen metric.

### Definition 2.8 (Entity Prototype as Fréchet Mean)

An entity $e$ has a **prototype** (representative) given by the **Fréchet mean**:

$$\mu_e = \arg\min_{\mathcal{S}} \sum_{\mathcal{S}_i \in e} d(\mathcal{S}_i, \mathcal{S})^2$$

This minimizes the sum of squared distances to all members.

> **Note:** Using unsquared distances gives the **median** (1-center). For Fisher–Rao on the simplex, the Fréchet mean is the **Karcher mean** in the Riemannian sense.

The **basin radius** is:

$$r_e = \max_{\mathcal{S}_i \in e} d(\mathcal{S}_i, \mu_e)$$

(Or 95th percentile distance for robustness.)

### Mathematical Structure

The collection of all entities forms a **partition** of signature space:

$$\mathcal{P}^{B-1} = \bigsqcup_{e \in \mathcal{E}} e$$

This is the **entity ontology**. The partition depends on $\varepsilon$; decreasing $\varepsilon$ splits entities into finer components.

---

## 4. Stability: Persistence Under Perturbation

### Definition 2.9 (Structural Stability of an Entity)

Entity $e$ is **$(\delta, \rho)$-stable** if:

$$\mathbb{P}(d(\mathcal{S}_{\text{perturbed}}, \mu_e) \le r_e) \ge 1 - \rho$$

when the system undergoes perturbations of magnitude $\delta$:

$$\dot{x} = F(x) \to \dot{x} = F(x) + \delta G(x, \xi_t)$$

**Interpretation:**
- Stability = robustness to noise/perturbation
- With probability $\ge 1 - \rho$, perturbations keep the system in the same entity
- A stable entity "exists" more strongly than an unstable one

> **Notation:** $\rho$ denotes failure probability; $\eta(t)$ is reserved for learning rate.

### Theorem 2.1 (Persistence of Dominant Frequencies)

**Claim:** If a dynamical system $\dot{x} = F(x)$ has a **hyperbolic** periodic orbit or attractor with frequency $\omega_0$, then the spectral signature has a peak at $\omega_0$ that persists under small perturbations.

**Hypothesis (Hyperbolicity):** The periodic orbit is hyperbolic, i.e., the Floquet multipliers (eigenvalues of the Poincaré return map) are bounded away from the unit circle except for the trivial multiplier at 1.

**Proof sketch:**
1. Unperturbed system: $\omega_0$ is part of the flow's spectral decomposition
2. Perturbed system ($\dot{x} = F(x) + \epsilon G(x)$, $\epsilon$ small): Implicit Function Theorem applies to the hyperbolic orbit
3. The peak shifts by $O(\epsilon)$, but doesn't vanish
4. For $\epsilon < \epsilon_0(\omega_0)$, peak remains detectable

> **Caveat:** Near bifurcations (where hyperbolicity fails), spectral peaks can split, merge, or vanish. The theorem is restricted to the hyperbolic case.

**Conclusion:** Spectral signatures are **structurally stable** against small perturbations when the underlying dynamics are hyperbolic.

---

## 5. Connection to Orbital Resonances

### Theorem 2.2 (Orbital MMR as Spectral Pattern)

In an orbital resonance system, the spectral signature has a characteristic **integer ratio pattern**:

$$\{\omega_k\}_{k=1}^K \text{ satisfy } p\omega_1 - q\omega_2 \approx 0$$

for small integer $p, q$.

**Proof:**
- In orbital resonance, mean motions satisfy $n_1/n_2 = p/q$
- Mean motion is the dominant frequency component
- Thus $\omega_1/\omega_2 \approx p/q$
- This is a special case of a **rational frequency relation**

**Implication:** Orbital resonances are spectral systems with **exact** integer relations. Spectral signatures generalize to allow **approximate** relations under capacity pressure.

### Definition 2.10 (Integer Relation Detection)

Test whether frequencies $\{\omega_k\}$ satisfy an approximate integer relation:

$$\left|\sum_{k=1}^K c_k \omega_k\right| \le \delta$$

for small integers $c_k \in \mathbb{Z}$ with $\|c\|_1 \le N$.

This is the **PSLQ problem** (Partial Sum LQ decomposition), solvable in polynomial time.

**For learning systems:** When does a neural network develop approximate frequency ratios? See [06_capture_in_learning.md](06_capture_in_learning.md) § 3.

---

## 6. Spectral Features: Beyond Raw Power

For richer entity descriptions, extract features from spectral signatures:

### Definition 2.11 (Spectral Features)

For a signature $\mathcal{S} = \{s_b\}$:

$$\begin{align}
f_1 &= \text{dominant frequency} = \arg\max_b s_b \\
f_2 &= \text{spectral centroid} = \sum_b b \cdot p_b \\
f_3 &= \text{spectral spread} = \sqrt{\sum_b (b - f_2)^2 p_b} \\
f_4 &= \text{spectral entropy} = -\sum_b p_b \log p_b \\
f_5 &= \text{skewness} = \mathbb{E}[(b - f_2)^3] / f_3^3 \\
f_6 &= \text{kurtosis} = \mathbb{E}[(b - f_2)^4] / f_3^4
\end{align}$$

**Interpretation:**
- $f_1$: Characteristic timescale
- $f_2, f_3$: Distribution width and shape
- $f_4$: Complexity (high entropy = many modes)
- $f_5, f_6$: Non-Gaussian structure

These form a **feature vector** $\mathbf{f} \in \mathbb{R}^6$ for rapid entity classification.

---

## 7. Multi-Channel and Higher-Order Spectra

### Definition 2.12 (Cross-Spectral Matrix)

For multichannel data $y(t) \in \mathbb{R}^m$, define:

$$S_{ij}(\omega) = \text{cross-spectrum between channels } i, j$$

$$S(\omega) \in \mathbb{C}^{m \times m}, \quad S(\omega)^* = S(\omega)^T$$

The **coherence** between channels is:

$$\text{coh}_{ij}(\omega) = \frac{|S_{ij}(\omega)|^2}{S_{ii}(\omega)S_{jj}(\omega)} \in [0, 1]$$

**Interpretation:** Coherence measures frequency-dependent correlation. Value 1 = perfectly synchronized at that frequency.

### Definition 2.13 (Bispectrum)

For nonlinear interactions, the **bispectrum** is:

$$B(\omega_1, \omega_2) = \mathbb{E}[Y(\omega_1)Y(\omega_2)Y^*(\omega_1 + \omega_2)]$$

Detects **phase coupling** between frequencies. Example: if a signal has $\omega_1$ and $\omega_2$ components that interact nonlinearly, the bispectrum has power at $(\omega_1, \omega_2)$.

**For learning systems:** Bispectral analysis detects mode interactions. High bispectral power at small frequency combinations suggests **Laplace-like resonances** (irreducibly multi-modal). See [06_capture_in_learning.md](06_capture_in_learning.md) § 5.

---

## 8. Algorithm: Signature Extraction from Time Series

### Algorithm 2.1 (Dense Signature Extraction)

```
Input: time series y(t), t = 0,...,T-1
       sampling frequency f_s
       n_bins (number of frequency bins)
       
Output: signature s ∈ ℝ^n_bins

Steps:
  1. Detrend: y ← y - mean(y) - linear_trend(y)
  2. Window: apply Hann window to y
  3. Welch: compute S_y(ω) via Welch method
            (nperseg = min(256, T/4), noverlap = nperseg/2)
  4. Bin: create n_bins frequency bins from 0 to f_s/2
  5. Aggregate: s_b = ∫_ω_b S_y(ω) dω
  6. Normalize: p = s / sum(s)
  
  Return p
```

### Algorithm 2.2 (Sparse Signature Extraction)

```
Input: time series y(t), n_modes (max peaks)
       
Output: peaks = [(ω_k, a_k, γ_k)]_{k=1}^K

Steps:
  1. Compute PSD: S_y(ω) via Welch
  2. Find peaks: peaks, properties ← find_peaks(S_y, prominence=threshold)
  3. For each peak at ω_k:
       - Amplitude a_k ← S_y(ω_k)
       - Linewidth γ_k ← FWHM (full width at half max)
  4. Rank by amplitude, keep top n_modes
  5. Merge nearby peaks (within Δω)
  
  Return sorted(peaks by ω)
```

---

## 9. Computational Complexity

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Welch PSD (T samples, nperseg) | $O(T \log T)$ | FFT-based |
| Dense signature distance (JS) | $O(B)$ | $B$ bins |
| Sparse signature distance (Wasserstein) | $O(K \log K)$ | Hungarian algorithm |
| Clustering (HDBSCAN, $n$ signatures) | $O(n \log n)$ to $O(n^2)$ | Depends on density |
| Feature extraction (6 features) | $O(B)$ or $O(K)$ | Linear in signature size |

**For online learning:** Signatures can be updated **incrementally** with exponential moving average:

$$p_t^{(new)} = \alpha p_t^{(observed)} + (1-\alpha) p_t^{(old)}$$

Complexity: $O(B)$ per step, constant memory.

---

## References

### Spectral Methods

- **Welch (1967)**: "The Use of Fast Fourier Transform for Estimation of Power Spectra"
- **Stoica & Moses (2005)**: *Spectral Analysis of Signals*

### Information Geometry

- **Amari (2016)**: *Information Geometry and Its Applications*
- **Nielsen & Nock (2011)**: "On the Chi Square Distance for Measuring Similarity"

### Distance Metrics on Distributions

- **Wasserstein (1957)**: Original optimal transport theory
- **Kantorovich (1942)**: Linear programming formulation

---

## See Also

- **Previous:** [01_orbital_resonances.md](01_orbital_resonances.md) — Special case with exact integer ratios
- **Next:** [03-07_mathematics_consolidated.md §3](03-07_mathematics_consolidated.md) — Libration/circulation in abstract phase space
- **Applications:** [03-07_mathematics_consolidated.md §6](03-07_mathematics_consolidated.md) — How to use signatures in learning

---

**End of Section 2**

[← Back to README](00_README.md) | [← Previous](01_orbital_resonances.md) | [Next →](03-07_mathematics_consolidated.md)
