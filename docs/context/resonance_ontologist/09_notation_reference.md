# 9. Notation Reference and Symbol Index

Quick lookup table for all symbols used across the resonance ontology documentation.

---

## Symbol Disambiguation Contract

Several Greek letters have potential for collision across different contexts. This documentation follows a strict disambiguation contract:

| Symbol | Reserved Meaning | **Not Used For** |
|--------|-----------------|------------------|
| $\kappa$ | Adiabatic parameter (capture theory) | ~~Convergence rate~~ |
| $\lambda$ | Convergence rate (Lyapunov exponent) | (Also: mean longitude in orbital context) |
| $\eta(t)$ | Learning rate (time-dependent) | ~~Failure probability~~, ~~adiabatic parameter~~ |
| $\rho$ | Failure probability (stability bounds) | ~~Pearson correlation~~ (see `coh` instead) |

**Rationale:**
- $\kappa$ exclusively denotes the adiabatic parameter $v_{\text{mig}} T_{\text{conv}} / \varepsilon$
- $\lambda$ denotes both convergence rate (dynamical systems) and mean longitude (orbital); context disambiguates
- $\eta$ with explicit time dependence $\eta(t)$ is always learning rate; scalar $\eta$ in orbital adiabatic theory follows Henrard (1982)
- $\rho$ is failure probability in $(\delta, \rho)$-stability theorems; Pearson correlation uses $\text{coh}$ or explicit subscript

---

## A. Orbital Mechanics

### Orbital Elements

| Symbol | Name | Units | Range |
|--------|------|-------|-------|
| $a$ | Semi-major axis | AU, km | $(0, \infty)$ |
| $e$ | Eccentricity | dimensionless | $[0, 1)$ |
| $i$ | Inclination | radians, degrees | $[0, \pi]$ |
| $\Omega$ | Longitude of ascending node | radians | $[0, 2\pi)$ |
| $\varpi$ | Longitude of perihelion | radians | $[0, 2\pi)$ |
| $\lambda$ | Mean longitude | radians | $[0, 2\pi)$ |
| $M$ | Mean anomaly | radians | $[0, 2\pi)$ |
| $T$ | Orbital period | years, days | $(0, \infty)$ |
| $n$ | Mean motion | rad/time | $(0, \infty)$ |

### Resonant Parameters

| Symbol | Meaning | Typical Values |
|--------|---------|-----------------|
| $p, q$ | Integer resonance ratio (p:q) | Small integers (2,3,5,7) |
| $\gcd(p,q)$ | Greatest common divisor | = 1 for primitive resonances |
| $p - q$ | Resonance order | 1 (strong), 2, 3, ... (weak) |
| $\phi, \Phi$ | Resonant angle | Radians, librates bounded if in resonance |
| $\phi_0$ | Libration center | $0°$ or $180°$ |
| $A$ | Libration amplitude | Radians, $< \pi$ for libration |
| $T_{\text{lib}}$ | Libration period | Years |

---

## B. Spectral Analysis

### Signals and Spectra

| Symbol | Meaning | Domain | Type |
|--------|---------|--------|------|
| $y(t)$ | Time series | $t \in [0, T]$ | $\mathbb{R}$ or $\mathbb{R}^m$ |
| $Y(\omega)$ | Fourier transform of $y$ | $\omega \in [0, \omega_{\max}]$ | $\mathbb{C}$ |
| $S_y(\omega)$ | Power spectral density | $\omega \in [0, \omega_{\max}]$ | $\mathbb{R}_{\ge 0}$ |
| $S_{ij}(\omega)$ | Cross-spectral density (channels) | $\omega$ | $\mathbb{C}^{m \times m}$ |
| $p(\omega)$ | Probability distribution (normalized) | $\omega$ or bins | $\mathbb{P}^{B-1}$ |
| $s_b$ | Energy in frequency bin $b$ | bin index | $\mathbb{R}_{\ge 0}$ |
| $p_b = s_b/\sum s_b$ | Probability of bin $b$ | bin index | $[0,1]$ |

### Spectral Signatures (Dense)

| Symbol | Meaning | Dimension | Type |
|--------|---------|-----------|------|
| $\mathcal{S}$ | Spectral signature | $\mathbb{R}^B$ or $\mathbb{P}^{B-1}$ | Vector/Distribution |
| $B$ | Number of frequency bins | Typically 32, 64, 128 | $\mathbb{N}$ |
| $m$ | Dimension of representation space | Typically 64–512 | $\mathbb{N}$ |
| $\mu_k$ | Prototype (mean) signature of entity $k$ | $\mathbb{R}^B$ | Vector |
| $\Sigma_k$ | Covariance of entity $k$ | $\mathbb{R}^{B \times B}$ | Matrix |

### Spectral Signatures (Sparse)

| Symbol | Meaning | Units | Example |
|--------|---------|-------|---------|
| $\omega_k$ | Peak frequency | Hz | 5.2 |
| $a_k$ | Peak amplitude | Power units | 0.8 |
| $\gamma_k$ | Linewidth (FWHM) | Hz | 0.3 |
| $K$ | Number of peaks | Count | 8–32 |

### Features (from Spectral Signatures)

| Symbol | Meaning | Formula |
|--------|---------|---------|
| $f_{\text{dom}}$ | Dominant frequency | $\arg\max_b s_b$ |
| $f_{\text{c}}$ | Spectral centroid | $\sum_b b \cdot p_b$ |
| $\sigma$ | Spectral spread | $\sqrt{\sum_b (b - f_c)^2 p_b}$ |
| $H$ | Spectral entropy | $-\sum_b p_b \log p_b$ |
| $\gamma_{\text{skew}}$ | Skewness | $\mathbb{E}[(b-f_c)^3]/\sigma^3$ |
| $\gamma_{\text{kurt}}$ | Kurtosis | $\mathbb{E}[(b-f_c)^4]/\sigma^4$ |

---

## C. Distance and Similarity Metrics

### Distance Functions

| Symbol | Name | Formula | Range |
|--------|------|---------|-------|
| $d_{\text{JS}}(p,q)$ | Jensen–Shannon | $\sqrt{\frac{1}{2}\text{KL}(p\|m) + \frac{1}{2}\text{KL}(q\|m)}$ | $[0,1]$ |
| $d_W(p,q)$ | Wasserstein-1 | $\int\|F_p - F_q\|d\omega$ | $[0, \omega_{\max}]$ |
| $d_{\text{FR}}(p,q)$ | Fisher–Rao | $\arccos(\sum\sqrt{p_b q_b})$ | $[0, \pi/2]$ |
| $\text{KL}(p\|q)$ | Kullback–Leibler | $\sum_b p_b \log(p_b/q_b)$ | $[0,\infty)$ |
| $d_L^2$ | Euclidean | $\sqrt{\sum_b (p_b-q_b)^2}$ | $[0,\sqrt{2}]$ |

### Similarity

| Symbol | Meaning | Range | Interpretation |
|--------|---------|-------|-----------------|
| $\text{coh}(\omega)$ | Magnitude-squared coherence | $[0,1]$ | 1 = synchronized, 0 = independent |
| $r_{\text{Pearson}}$ | Pearson correlation | $[-1, 1]$ | 1 = perfect positive, 0 = uncorrelated |

---

## D. Phase Space and Dynamics

### State and Phase Variables

| Symbol | Meaning | Domain | Type |
|--------|---------|--------|------|
| $x(t)$ | State (general) | $\mathbb{R}^d$ | Vector |
| $\theta$ | Parameters (learning) | $\mathbb{R}^d$ | Weight vector |
| $z = h(\theta)$ | Representation/observable | $\mathbb{R}^m$ | Low-dim projection |
| $(q_i, p_i)$ | Canonical coordinates | Phase space | Position, momentum |
| $(L_i, \ell_i)$ | Delaunay elements | Action-angle | Orbital elements |
| $\phi_t$ | Resonant angle (learning) | $(-\pi, \pi]$ | Wrapped phase |
| $\tilde{\phi}_t$ | Unwrapped phase | $\mathbb{R}$ | Continuous phase |

### Dynamics

| Symbol | Meaning | Equation |
|--------|---------|----------|
| $F(x)$ | Vector field | $\dot{x} = F(x)$ |
| $\Phi_t$ | Flow map | $x(t) = \Phi_t(x_0)$ |
| $H$ | Hamiltonian | $\dot{q} = \partial H/\partial p$ |
| $\nabla L$ | Gradient | $g = \nabla_\theta L(\theta)$ |
| $\eta(t)$ | Learning rate | Typical $\eta(t) = \eta_0/t^{\alpha}$ |

---

## E. Equivalence Classes and Entities

### Sets and Topology

| Symbol | Meaning | Context | Type |
|--------|---------|---------|------|
| $\mathcal{M}_k$ | Attractor manifold for entity $k$ | Mode geometry | Submanifold of phase space |
| $B_k$ | Ball around prototype $\mu_k$ | Clustering | Metric ball, radius $\varepsilon_k$ |
| $e_k$ | Entity $k$ | Ontology | Equivalence class |
| $[\mathcal{S}]_{\sim}$ | Equivalence class of signature $\mathcal{S}$ | Under metric $d$ | Quotient space |
| $\mathcal{E}$ | Set of all entities | Complete ontology | Partition of signature space |
| $\varepsilon$ | Tolerance (identity threshold) | Entity definition | Distance $[0, \infty)$ |

### Geometric Objects

| Symbol | Meaning | Derived from | Interpretation |
|--------|---------|--------------|-----------------|
| $\pi_k(z)$ | Projection onto manifold $\mathcal{M}_k$ | PCA of residuals | Nearest point on manifold |
| $\delta_t = z_t - \pi(z_t)$ | Residual (transverse component) | Distance from manifold | How far from mode |
| $r_t = \|\delta_t\|$ | Amplitude (transverse distance) | Norm of residual | Magnitude of oscillation |
| $U_\perp$ | Normal basis (2D) | Top-2 eigenvectors of residual covariance | Directions perpendicular to manifold |
| $x_t = U_\perp^T \delta_t$ | Transverse coordinates | Projection onto normal subspace | 2D point for phase |

---

## F. Stability and Capture

### Adiabatic Theory

| Symbol | Meaning | Formula/Units | Typical Range |
|--------|---------|----------------|----------------|
| $\kappa$ | Adiabatic parameter | $v_{\text{mig}} T_{\text{conv}} / \varepsilon$ | Dimensionless, $(0,\infty)$ |
| $v_{\text{mig}}$ | Migration rate | $\|d\mu/dt\|$ | Distance/time |
| $T_{\text{conv}}$ | Convergence timescale | $1/\lambda$ (reciprocal convergence rate) | Time |
| $\lambda$ | Convergence rate | Lyapunov exponent / contraction rate | Time$^{-1}$, $> 0$ |
| $\varepsilon$ | Basin radius | 95th percentile distance | Distance |
| $\delta$ | Perturbation magnitude | Typical $10^{-3}$ to $10^{-6}$ | Dimensionless fraction |
| $\rho$ | Failure probability | Typical $0.05$ | $[0, 1]$ |

### Libration Indicators

| Symbol | Meaning | Threshold | Interpretation |
|--------|---------|-----------|-----------------|
| $A_{\text{lib}}$ | Libration amplitude | $< \pi/2$ | Bounded phase oscillation |
| $v_{\text{drift}}$ | Phase drift rate | $< 0.1$ rad/step | Unwrapped phase slope |
| $\text{acf}(\phi)$ | Autocorrelation of phase | Peak at nonzero lag | Oscillatory structure |

---

## G. Learning Dynamics

### Network and Training

| Symbol | Meaning | Type | Example |
|--------|---------|------|---------|
| $\theta_t$ | Parameters at step $t$ | $\mathbb{R}^d$ | Weights, biases |
| $L(\theta)$ | Loss function | $\mathbb{R}^d \to \mathbb{R}$ | Cross-entropy, MSE |
| $g_t = \nabla L$ | Gradient | $\mathbb{R}^d$ | Direction of steepest descent |
| $\xi_t$ | Noise (stochasticity) | $\mathbb{R}^d$ | Effective Brownian motion |
| $d$ | Parameter dimension | Integer | $10^3$ to $10^{11}$ |
| $m$ | Representation dimension | Integer | $64$ to $10^4$ |
| $B$ | Batch size | Integer | 32, 128, 1024 |
| $\mathcal{D}(t)$ | Data distribution (time-dependent) | Probability | Curriculum |

### Metrics

| Symbol | Meaning | Formula | Range |
|--------|---------|---------|-------|
| $L_{\text{train}}$ | Training loss | Average on $\mathcal{D}_{\text{train}}$ | $[0, \infty)$ |
| $\text{Acc}_{\text{test}}$ | Test accuracy | Fraction correct | $[0, 1]$ |
| $\nabla L^2$ | Gradient norm squared | $\|\nabla L\|^2$ | $[0, \infty)$ |
| $\|\theta_t - \theta_0\|$ | Parameter movement | Euclidean distance | $[0, \infty)$ |

---

## H. Frequency and Resonance in Learning

### Spectral Analysis of Internal Dynamics

| Symbol | Meaning | Source | Units |
|--------|---------|--------|-------|
| $\omega_i$ | Dominant frequency | Loss time series, activations | Hz or "updates per epoch" |
| $\omega_L$ | Loss oscillation frequency | $\text{FFT}(\text{loss}(t))$ | Updates$^{-1}$ |
| $\omega_{\text{acc}}$ | Accuracy change frequency | $\text{FFT}(\text{Acc}(t))$ | Updates$^{-1}$ |
| $\omega_{\text{norm}}$ | Layer norm frequency | $\text{FFT}(\|\theta_l\|(t))$ per layer | Updates$^{-1}$ |

### Integer Relations

| Symbol | Meaning | Domain | Interpretation |
|--------|---------|--------|-----------------|
| $c_i \in \mathbb{Z}$ | Integer coefficient | Resonant relation $\sum c_i \omega_i$ | Mode allocation factor |
| $\delta$ | Residual tolerance | $[0, 0.1]$ | Approximate integer relation threshold |
| $\mathbf{c} = (c_1, \ldots, c_d)$ | Coefficient vector | $\mathbb{Z}^d$ | Full integer relation |
| $\|\mathbf{c}\|_1 = \sum\|c_i\|$ | $L^1$ norm of coefficients | $[0, \infty)$ | Relation order/complexity |

---

## I. Summary Table: Key Distinctions

### Levels of Hierarchy

```
ORBITAL RESONANCE:
  p, q ∈ ℤ (exact)
  φ librates (bounded)
  T_lib = (years)
  
SPECTRAL RESONANCE:
  ω_i/ω_j ≈ p/q (approx.)
  φ oscillates (damped)
  T_lib = (many steps)
  
ADAPTIVE RESONANCE:
  ω_i/ω_j emergent (learned)
  φ drifts gradually (plastic)
  T_lib = (many epochs)
```

---

## J. Abbreviations

| Abbr | Meaning | Context |
|------|---------|---------|
| MMR | Mean-Motion Resonance | Orbital mechanics |
| PSD | Power Spectral Density | Signal processing |
| FFT | Fast Fourier Transform | Spectral analysis |
| FWHM | Full Width at Half Maximum | Peak linewidth |
| KL | Kullback–Leibler | Divergence measure |
| SGD | Stochastic Gradient Descent | Optimization |
| EMA | Exponential Moving Average | Filtering |
| DOF | Degrees of Freedom | Dynamical systems |
| LTI | Linear Time-Invariant | Systems theory |
| GCN | Gated Convolutional Networks | Architecture |

---

**End of Reference**

[← Back to README](00_README.md)
