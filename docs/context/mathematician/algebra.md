# 📘 Algebra Module — Mathematical Documentation

## 1. Overview

This module formalizes the **algebraic foundations** of the framework:

* Additive transport (Gaussian / heat semigroup)
* Multiplicative transport (Poisson / log-map / Haar measure)
* Mellin transform (coupling additive and multiplicative)
* Balance principle at $s = \tfrac{1}{2}$

The goal is not to prove new theorems, but to unify existing systems under a single, consistent construction.

---

## 2. Additive Transport

**Definition 2.1 (Heat Semigroup).**
On the additive group $(\mathbb{R},+)$, define the heat semigroup:

$$
(H_t f)(x) = \frac{1}{\sqrt{4\pi t}} \int_{\mathbb{R}} e^{-\frac{(x-y)^2}{4t}} f(y) \, dy,
\quad t>0.
$$

**Properties.**

1. Semigroup law: $H_{t+s} = H_t \circ H_s$.
2. Generator: $\frac{d}{dt} H_t f = \Delta f$ (Laplacian).
3. Invariance: translation-invariant under $(\mathbb{R},+)$.

**References.**

* Evans, *Partial Differential Equations* (Ch. 2)
* Stein & Shakarchi, *Fourier Analysis*

---

## 3. Multiplicative Transport

**Definition 3.1 (Haar Measure).**
On the multiplicative group $(\mathbb{R}_+, \times)$, the Haar measure is:

$$
d\mu(y) = \frac{dy}{y}.
$$

**Definition 3.2 (Multiplicative Convolution).**
For functions $f,g:\mathbb{R}_+\to\mathbb{C}$:

$$
(f \star_\times g)(x) = \int_0^\infty f\!\left(\frac{x}{y}\right) g(y) \frac{dy}{y}.
$$

**Remark 3.3 (Log Map).**
The change of variables $t = \log y$ transforms multiplicative convolution into additive convolution.

**Definition 3.4 (Poisson Kernel on $(\mathbb{R}_+, \times)$).**
Formulate Poisson transport as the harmonic extension operator associated with the multiplicative Laplacian, diagonalized by the Mellin transform.

**Explicit Formula (1D Poisson Kernel).**  
On the real line, the classical Poisson kernel is:
\[
P_t(x) = \frac{t}{\pi(x^2+t^2)}, \quad t > 0.
\]

**Multiplicative Analogue.**  
On \((\mathbb{R}_+, \times)\) with Haar measure \(dy/y\), we define
\[
(P_t f)(x) = \int_0^\infty P_t\!\left(\log \frac{x}{y}\right) f(y)\,\frac{dy}{y}.
\]
This kernel is diagonalized by the Mellin transform.

**References.**

* Folland, *A Course in Abstract Harmonic Analysis*
* Stein, *Harmonic Analysis: Real-Variable Methods*

---

## 4. Mellin Transform

**Definition 4.1.**
For $f:\mathbb{R}_+ \to \mathbb{C}$, the Mellin transform is:

$$
(\mathcal{M}f)(s) = \int_0^\infty y^{s-1} f(y) \, dy, \quad s \in \mathbb{C}.
$$

**Properties.**

* $\partial_s \mathcal{M}f(s) = \mathcal{M}\{(\log y) f(y)\}(s).$
* $\mathcal{M}\{ (y \partial_y f)(y) \}(s) = -s \, \mathcal{M}f(s).$
* Plancherel theorem: Mellin is unitary on $\Re(s) = \tfrac{1}{2}$.

**Remark 4.2 (Fourier on the Log Axis).**
Via $t=\log y$, the Mellin transform reduces to the Fourier transform in $t$.

**References.**

* Titchmarsh, *Introduction to the Theory of Fourier Integrals*
* Doetsch, *Introduction to the Theory and Application of the Laplace Transformation*

---

## 5. Balance Principle

**Definition 5.1 (Mellin Balance at $s=\tfrac{1}{2}$).**
The line $\Re(s)=\tfrac{1}{2}$ is the unique fixed point of the symmetry $s \mapsto 1-s$.
It defines the **canonical balance** between additive (Gaussian) and multiplicative (Poisson) transports.

**Remark 5.2 (Unitary Line).**
On $\Re(s)=\tfrac{1}{2}$, the Mellin transform is an isometry.
This provides the stability principle underlying the framework.

**Proposition.**  
The Mellin transform is unitary on the critical line:
\[
\int_0^\infty |f(y)|^2 \frac{dy}{y} 
= \frac{1}{2\pi}\int_{-\infty}^\infty 
|\mathcal{M}f(\tfrac{1}{2}+it)|^2\, dt.
\]
This is the Plancherel theorem for Mellin, showing that \(s=\tfrac{1}{2}\) is the unique balance point.

**References.**

* Iwaniec & Kowalski, *Analytic Number Theory* (Ch. 1, Mellin transform)
* Stein & Shakarchi, *Complex Analysis*

---

## 6. Summary of Algebraic Interfaces

Each part of the algebra module corresponds to a code interface:

* **Gaussian kernel** → `gaussian_kernel(x, sigma)`
* **Poisson kernel** → `poisson_kernel(x, tau)` (via log-map)
* **Mellin transform** → `mellin_transform(f, s)`
* **Balance check** → `balance_score(f, s=0.5)`

---

## 7. External Knowledge Base

For further details and cross-checking:

* Evans, *Partial Differential Equations* — Heat semigroup.
* Stein & Shakarchi, *Fourier Analysis* — Gaussian kernel, Plancherel.
* Folland, *Abstract Harmonic Analysis* — Haar measure, group convolution.
* Iwaniec & Kowalski, *Analytic Number Theory* — Mellin and critical line.
* Amari, *Information Geometry and Its Applications* — background for Fisher–Rao (links to `geometry/`).

