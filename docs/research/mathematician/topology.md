# 📘 Möbius Module — Mathematical Documentation

## 1. Overview

This module formalizes the **Möbius topology** underlying the framework.
It specifies:

* Parameter domain and seam identification
* Deck map and tangent pushforward
* Seam-compatibility of the pullback Fisher–Rao metric
* Geodesic completeness on the Möbius quotient
* Implementation invariants for numerical stability

---

## 2. Parameter Domain and Identification

**Definition 2.1 (Strip Model).**
Let

$$
\mathcal{D} = [0,2\pi) \times [-w,w]
$$

with edges identified via the deck map

$$
T(u,v) = (u+\pi,\,-v) \quad (\mathrm{mod}\; 2\pi).
$$

This quotient space \$\mathcal{D}/!!\sim\$ is the Möbius band.

---

## 3. Deck Map and Tangent Pushforward

**Definition 3.1 (Deck Map Differential).**
The Jacobian of \$T\$ is

$$
dT = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}.
$$

**Invariant.**
At seam crossings \$v=\pm w\$, states transform as

$$
(u,v,\dot u,\dot v)\;\mapsto\;(u\pm \pi,\ \mp w,\ \dot u,\ -\dot v).
$$

This ensures geodesics and flows are well-defined on the Möbius quotient.

---

## 4. Seam Compatibility of the Metric

**Definition 4.1 (Seam Compatibility).**
Let \$g\$ be the Fisher–Rao pullback metric from information map \$\Phi\$.
Then \$g\$ descends to the quotient iff

$$
g(u+\pi,-v) \;=\; (dT)^\top g(u,v)\, dT.
$$

**Sufficient condition.**
If \$\Phi \circ T = \Phi\$ or \$\Phi \circ T = R \circ \Phi\$ for some Fisher–Rao isometry \$R\$, then seam-compatibility holds automatically.

---

## 5. Geodesic Equations on the Möbius Quotient

**Definition 5.1 (Christoffel Symbols).**

$$
\Gamma^k_{ij}(q) = \tfrac12 g^{k\ell}(\partial_i g_{j\ell}+\partial_j g_{i\ell}-\partial_\ell g_{ij}).
$$

**Equation.**
Geodesics satisfy

$$
\ddot q^k + \Gamma^k_{ij}(q)\,\dot q^i \dot q^j = 0,\quad k=1,2.
$$

**Invariant.**
Metric speed is conserved:

$$
\|\dot q\|_g^2 = g_{ij}\dot q^i\dot q^j = \mathrm{const}.
$$

---

## 6. Completeness and Global Existence

**Proposition 6.1.**
If \$g\$ is smooth, uniformly positive-definite, and seam-compatible, then:

1. Geodesics extend for all affine time (no blow-up).
2. Seam crossings are chart transitions via \$T\$.
3. Energy \$\tfrac12|\dot q|\_g^2\$ is conserved.

Thus, flows on the Möbius quotient are globally defined.

---

## 7. Implementation Invariants

* **Seam enforcement:** always apply \$T\$ and \$dT\$ at \$v=\pm w\$.
* **Metric check:** enforce \$g(u+\pi,-v)=(dT)^\top g(u,v)dT\$.
* **Integrator choice:** prefer symplectic or energy-preserving schemes (midpoint, leapfrog).
* **Numerical stability:** compute FR pullback with log-sum-exp when mixing Gaussian/Poisson kernels.
* **Validation:** seam invariance tests must hold for statistics \$\phi\$:

  $$
  \phi(u,v) = \phi(u+\pi,-v).
  $$

---

## 8. Interfaces (Code Targets)

* `apply_deck_map(q)` → enforce seam identification on \$(u,v,\dot u,\dot v)\$.
* `check_seam_compatibility(g, u, v)` → validate metric compatibility.
* `geodesic_step(q, g, method="leapfrog")` → advance geodesic flow.
* `seam_invariance_test(phi)` → assert statistics are quotient-consistent.

---

## 9. External Knowledge Base

* Guillemin & Pollack, *Differential Topology* — quotients, manifolds with identification.
* Amari, *Information Geometry* — Fisher–Rao metrics.
* Arnold, *Mathematical Methods of Classical Mechanics* — geodesic flows.
* Stillwell, *Classical Topology and Combinatorial Group Theory* — Möbius band construction.
