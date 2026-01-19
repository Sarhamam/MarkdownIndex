
# 📘 Geometry Module — Mathematical Documentation

## 1. Overview

The geometry module formalizes how **algebraic transports** (Gaussian/Poisson) are unified in a geometric setting through:

* Submersions and zero sets
* Transversality conditions
* Fisher–Rao pullback metrics
* Curvature diagnostics

---

## 2. Submersion and Zero Set

**Definition 2.1 (Submersion).**
Let $M$ be a smooth manifold of dimension $n$.
A smooth map $f=(\tau,\sigma): M \to \mathbb{R}^2$ is a **submersion** at $x \in M$ if

$$
\operatorname{rank}(df_x) = 2.
$$

**Definition 2.2 (Zero Set).**
The **zero set** of $f$ is

$$
Z = f^{-1}(0) = \{ x \in M : f(x) = (0,0) \}.
$$

**Theorem 2.3 (Regular Value Theorem).**
If 0 is a regular value of $f$, then $Z$ is a smooth submanifold of codimension 2:

$$
\dim Z = n - 2.
$$

**Remark 2.4.**
In our framework, $f=(\tau,\sigma)$ arises from additive vs. multiplicative transport potentials, ensuring the construction is grounded in the algebraic module.

**References.**

* Guillemin & Pollack, *Differential Topology* (Ch. 1–3)
* Milnor, *Topology from the Differentiable Viewpoint*

---

## 3. Transversality

**Definition 3.1 (Transversal Intersection).**
Two submanifolds $A,B \subset M$ intersect **transversally** at $p$ if

$$
T_p A + T_p B = T_p M.
$$

**Lemma 3.2.**
If $\tau^{-1}(0)$ and $\sigma^{-1}(0)$ intersect transversally, then their intersection is exactly the zero set $Z$ and has codimension 2.

**Discrete Condition (for implementation).**
At sampled $x \in Z$, check that

$$
\operatorname{rank}(J_f(x)) = 2, \quad \kappa(J_f(x)^T J_f(x)) \leq \kappa_{\max},
$$

where $J_f$ is the Jacobian and $\kappa$ denotes the condition number.

**References.**

* Guillemin & Pollack, *Differential Topology*, Sec. 2.3 (Transversality)

---

## 4. Fisher–Rao Pullback

**Definition 4.1 (Fisher–Rao Metric).**
For a parametric family of probability distributions $\{p_\theta\}$, the Fisher information matrix is:

$$
g_{ij}(\theta) = \mathbb{E}_\theta\left[ \frac{\partial \log p_\theta}{\partial \theta^i} \frac{\partial \log p_\theta}{\partial \theta^j} \right].
$$

**Definition 4.2 (Pullback Metric).**
Given an embedding map $E: X \to \Theta$ into parameter space, the pullback metric is:

$$
g_x = (dE_x)^T \, g_{FR}(E(x)) \, (dE_x).
$$

**Remark 4.3.**
This allows neural embeddings to inherit geometry from Fisher–Rao, integrating model awareness into the framework.

**Example (Softmax logits).**  
Let \(p_\theta(y)=\mathrm{softmax}(z)_y\) for logits \(z \in \mathbb{R}^C\).  
Then the Fisher information matrix is:
\[
g_{ij} = \sum_{y=1}^C p_\theta(y)\,
\frac{\partial \log p_\theta(y)}{\partial \theta^i}
\frac{\partial \log p_\theta(y)}{\partial \theta^j}.
\]
Pulling back through the Jacobian of the embedding \(E(x)\) gives the effective metric on data space.

**References.**

* Amari, *Information Geometry and Its Applications*
* Nielsen & Chuang, *Quantum Computation and Quantum Information* (for Fisher information in quantum settings)

---

## 5. Curvature Diagnostics

**Definition 5.1 (Sectional Curvature).**
Given a Riemannian metric $g$ on $M$, the sectional curvature of a 2-plane spanned by $u,v \in T_xM$ is

$$
K(u,v) = \frac{\langle R(u,v)v,u \rangle}{\|u\|^2 \|v\|^2 - \langle u,v\rangle^2},
$$

where $R$ is the Riemann curvature tensor.

**Remark.**  
- Forman Ricci curvature is a local, combinatorial proxy suitable for edge-level analysis.  
- Ollivier Ricci curvature is a transport-based global proxy, defined by comparing Wasserstein distances of neighborhood measures.  
These two perspectives complement each other: Forman captures discrete combinatorial structure, while Ollivier connects to diffusion and optimal transport.

**Discrete Proxies.**

* **Forman Ricci curvature** (combinatorial, edge-based).
* **Ollivier Ricci curvature** (optimal transport on graphs).

**Application.**
Curvature is used to measure the stability and distinction of additive vs. multiplicative transports when pulled back through embeddings.

**References.**

* Jost, *Riemannian Geometry and Geometric Analysis*
* Forman, “Bochner’s method for cell complexes” (1993)
* Ollivier, “Ricci curvature of Markov chains” (2009)

---

## 6. Summary of Geometric Interfaces

* `build_submersion(X, method="least_squares")` → returns $f, J_f, Z$.
* `check_transversal(f, Z)` → returns boolean + certificate.
* `fisher_rao_metric(logits, dlogits_dX)` → per-point Fisher–Rao metric.
* `rescale_by_metric(X, M)` → metric-aware embeddings.
* `curvature_forman(G)` / `curvature_ollivier(G)` → curvature proxies.

---

## 7. External Knowledge Base

* Guillemin & Pollack, *Differential Topology* — submersions, transversality.
* Milnor, *Topology from the Differentiable Viewpoint* — regular value theorem.
* Amari, *Information Geometry and Its Applications* — Fisher–Rao metrics.
* Jost, *Riemannian Geometry* — curvature foundations.
* Ollivier, *Ricci curvature of Markov chains on metric spaces* — graph curvature.

