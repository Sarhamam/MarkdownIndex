# 📘 Dynamics & Physics Module — Mathematical Documentation

## 1. Overview

This module interprets the algebra + geometry + solvers in **dynamical terms**.
Core ideas:

* Diffusion and transport (heat / Poisson flows)
* Inner dynamics constrained to the zero set $Z$
* Gradient flows with Fisher–Rao metrics
* Conjugate Gradient as a dynamical descent
* Physics analogy: balance, critical line, stability

---

## 2. Diffusion Dynamics

**Definition 2.1 (Heat Flow).**
On $(\mathbb{R},+)$, the heat equation is:

$$
\partial_t u = \Delta u, \quad u(x,0)=f(x).
$$

Solution: $u(x,t) = (H_t f)(x)$ with Gaussian kernel.

**Definition 2.2 (Poisson Flow).**
On $(\mathbb{R}_+,\times)$, the Poisson semigroup arises from harmonic extension:

$$
\partial_t u = -(-\Delta)^{1/2} u.
$$

**Remark 2.3.**
These are the **continuous counterparts** of graph Laplacian flows:

$$
\frac{d}{dt} u(t) = -L u(t).
$$

---

## 3. Inner Dynamics on the Zero Set $Z$

**Definition 3.1 (Constrained Flow).**
Given a submersion $f: M \to \mathbb{R}^2$ with zero set $Z=f^{-1}(0)$, define dynamics on $Z$ by:

$$
\dot{x}(t) = P_{T_x Z}(v(x)),
$$

where $P_{T_x Z}$ projects onto the tangent space of $Z$.

**Remark 3.2.**
This ensures the system remains **inside** the zero set during evolution.

**Discrete Version.**

* Compute Jacobian $J_f(x)$.
* Project velocity vector $v$ via:

$$
P_{T_x Z} = I - J_f(x)^\top (J_f(x) J_f(x)^\top)^{-1} J_f(x).
$$

**Remark.**  
The projection
\[
P_{T_x Z} = I - J_f(x)^\top (J_f(x) J_f(x)^\top)^{-1} J_f(x)
\]
is valid only when \(\operatorname{rank}(J_f(x)) = 2\).  
This is precisely the transversality condition required for \(Z\) to be a smooth codimension-2 submanifold.

---

## 4. Gradient Flows with Fisher–Rao

**Definition 4.1 (Fisher–Rao Gradient Flow).**
For probability distribution embeddings, the gradient flow of functional $\mathcal{F}$ w\.r.t. Fisher–Rao metric is:

$$
\dot{x}(t) = - \nabla_{FR} \mathcal{F}(x(t)).
$$

**Remark 4.2.**
When pulled back to embeddings, this defines **model-aware dynamics**, coupling algebraic transport with information geometry.

---

## 5. Conjugate Gradient as Dynamics

**Interpretation.**
Conjugate Gradient can be viewed as **dynamical descent**:

* Each iteration generates a new direction conjugate w\.r.t. $A$ (here Laplacian).
* Orthogonality in residuals corresponds to **transversality** in the submersion setting.
* Minimization is along **geodesic-like conjugate directions**, making it a natural optimizer on $Z$.

**Remark 5.1.**
Thus CG is not only a solver but the **intrinsic dynamics** of the system, respecting geometry and constraints.

---

## 6. Physics Analogy

* **Balance principle**: Mellin symmetry at $s=1/2$ = equilibrium between additive/multiplicative modes.
* **Critical line**: analogous to “energy neutrality” — flows neither blow up nor collapse.
* **Zero set $Z$**: acts as a **constraint surface**, like a conservation law manifold in physics.
* **CG dynamics**: analog of least-action descent respecting transversal constraints.
* **Curvature**: corresponds to forces shaping stability (positive curvature = local confinement, negative = instability).

---

## 7. Interfaces (Code Targets)

* `simulate_diffusion(L, u0, t, method="cg")` → heat/Poisson flow on graph.
* `projected_dynamics(Z, v)` → tangent projection onto zero set.
* `fr_gradient_flow(X, logits, F)` → Fisher–Rao aware gradient dynamics.
* `inner_cg_dynamics(L, b, Z)` → conjugate gradient descent constrained to $Z$.

---

## 8. External Knowledge Base

* Evans, *Partial Differential Equations* — diffusion, semigroups.
* Amari, *Information Geometry* — Fisher–Rao flows.
* Shewchuk, *Conjugate Gradient Method* — CG as iterative dynamics.
* Arnold, *Mathematical Methods of Classical Mechanics* — manifolds, flows, constraints.
