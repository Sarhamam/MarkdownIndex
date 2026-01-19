# 📘 Statistics & Validation Module — Mathematical Documentation

## 1. Overview

This module defines **quantitative diagnostics** used to test stability, separability, and correctness of the framework.
Key measures:

* Spectral gap
* Spectral entropy
* Transversality score
* Stability under noise / seeds
* Balance score ($s = \tfrac{1}{2}$)

---

## 2. Spectral Gap

**Definition 2.1.**
Let $L$ be the (normalized) Laplacian with eigenvalues

$$
0 = \lambda_0 \le \lambda_1 \le \dots \le \lambda_{n-1}.
$$

The **spectral gap** is

$$
\gamma = \lambda_1.
$$

**Interpretation.**

* Connectivity measure: $\gamma > 0$ iff graph is connected.
* Larger $\gamma$ ⇒ faster mixing, stronger cohesion.

**Discrete Implementation.**

* Approximate $\lambda_1$ via Lanczos (smallest nonzero eigenvalue).

**Reference.**

* Chung, *Spectral Graph Theory* (1997)

---

## 3. Spectral Entropy

**Definition 3.1.**
Let $\{\lambda_i\}_{i=1}^k$ be the first $k$ nonzero eigenvalues of $L$.
Normalize: $p_i = \lambda_i / \sum_{j=1}^k \lambda_j$.
Define **spectral entropy**:

$$
H = - \sum_{i=1}^k p_i \log p_i.
$$

**Interpretation.**

* High entropy ⇒ spread-out spectrum (diffuse structure).
* Low entropy ⇒ concentrated spectrum (tight clusters).

**Reference.**

* Anand et al., *Entropy Measures for Networks* (2011)

---

## 4. Transversality Score

**Definition 4.1.**
For submersion $f: M\to\mathbb{R}^2$ with Jacobian $J_f(x)$:
At point $x \in Z=f^{-1}(0)$, define

$$
T(x) = \frac{\sigma_{\min}(J_f(x))}{\sigma_{\max}(J_f(x))},
$$

where $\sigma_{\min}, \sigma_{\max}$ are singular values.

**Remark 4.2.**

* $T(x) \approx 1$ ⇒ well-conditioned transversal intersection.
* $T(x) \approx 0$ ⇒ nearly degenerate, fails transversality.

**Discrete Certificate.**
Require $\min_{x \in Z} T(x) \geq \tau_{\min}$, with $\tau_{\min}$ set (e.g., $10^{-6}$).

---

## 5. Stability Score

**Definition 5.1.**
Given statistic $\phi$ (e.g. gap, entropy), compute variance under:

* Random seed changes
* ±10% perturbation of input points
* Small kernel parameter changes ($\sigma, \tau$)

Stability score:

$$
S(\phi) = 1 - \frac{\operatorname{Var}(\phi)}{(\mathbb{E}[\phi])^2}.
$$

**Interpretation.**

* $S(\phi)\approx 1$: robust statistic.
* $S(\phi)\ll 1$: unstable, not trustworthy.

---

## 6. Balance Score

**Definition 6.1.**
For statistic $\phi(s)$ depending on Mellin parameter $s$, define

$$
B = \arg\max_s S(\phi(s)).
$$

**Remark.**
If $B = \tfrac{1}{2}$, then the system is balanced at the critical line.

---

## 7. Separability

**Definition 7.1.**
Additive vs. multiplicative geometries are **separable** if

$$
|\mathbb{E}[\phi_{\text{add}}] - \mathbb{E}[\phi_{\text{mult}}]| \geq \delta,
$$

with confidence interval not overlapping zero.

**Alternative Definition (Coefficient of Variation).**  
A less preferable choice is
\[
S(\phi) = 1 - \frac{\mathrm{Std}(\phi)}{\mathbb{E}[\phi]},
\]
so that stability directly measures normalized fluctuations.  
In practice, both formulations (variance- or std-based) are acceptable if consistently applied.

**Interpretation.**
Guarantees that additive and multiplicative transports produce measurably different statistics.

---

## 8. Interfaces (Code Targets)

* `spectral_gap(L)` → $\lambda_1$
* `spectral_entropy(L, k)` → entropy of first $k$ eigenvalues
* `transversality_score(J_f)` → min/max singular value ratio
* `stability_score(stat_fn, perturbations)` → robustness measure
* `balance_score(stat_fn, s_range)` → optimum balance point
* `separability_test(phi_add, phi_mult)` → effect size + confidence

---

## 9. External Knowledge Base

* Chung, *Spectral Graph Theory* — gap and eigenvalues
* Anand et al., *Entropy Measures for Networks* — spectral entropy
* Guillemin & Pollack, *Differential Topology* — transversality
* von Luxburg, *Spectral Clustering* — empirical spectral stability
* Iwaniec & Kowalski, *Analytic Number Theory* — Mellin symmetry at $s=\tfrac{1}{2}$

