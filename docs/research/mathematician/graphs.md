
# 📘 Graphs Module — Mathematical Documentation

## 1. Overview

The graphs module provides **discrete approximations** of the continuous geometry defined in `algebra/` and `geometry/`.
Core objects:

* k-nearest neighbor (k-NN) graphs
* Weighted adjacency matrices
* Graph Laplacians (unnormalized and normalized)
* Discrete measures for spectral and curvature analysis

---

## 2. k-NN Graphs

**Definition 2.1 (k-Nearest Neighbor Graph).**
Let $X = \{x_1,\dots,x_n\} \subset \mathbb{R}^d$.
For each $x_i$, connect edges to its $k$ nearest neighbors under a metric $d(\cdot,\cdot)$.
The resulting graph is $G=(V,E)$ with $V=X$.

**Remark 2.2.**

* `mode="additive"` → Euclidean metric on $X$.
* `mode="multiplicative"` → log-map metric $d(x,y)=\| \log(|x|+\varepsilon) - \log(|y|+\varepsilon)\|$.

**Justification of Multiplicative Distance.**  
The log-map metric
\[
d(x,y) = \big\|\log(|x|+\varepsilon) - \log(|y|+\varepsilon)\big\|
\]
arises from discretizing the Haar measure \(dy/y\).  
In this representation, multiplicative convolution becomes additive convolution in log-space, ensuring consistency with the Mellin framework.

**Weight Function.**
Edge weights defined via Gaussian kernel:

$$
w_{ij} = \exp\!\left( -\frac{d(x_i,x_j)^2}{\sigma^2} \right).
$$

**References.**

* von Luxburg, “A tutorial on spectral clustering” (2007)
* Belkin & Niyogi, *Laplacian Eigenmaps* (2003)

---

## 3. Weighted Matrices

**Definition 3.1 (Adjacency Matrix).**
$A = (w_{ij}) \in \mathbb{R}^{n \times n}$, where $w_{ij}>0$ if $(i,j)\in E$, else 0.
Symmetrization: $A \leftarrow \max(A, A^T)$.

**Definition 3.2 (Degree Matrix).**
Diagonal $D = \mathrm{diag}(d_1,\dots,d_n)$, with $d_i = \sum_j w_{ij}$.

---

## 4. Graph Laplacians

**Definition 4.1 (Unnormalized Laplacian).**

$$
L = D - A.
$$

**Definition 4.2 (Normalized Laplacian).**

$$
L_{\text{sym}} = I - D^{-1/2} A D^{-1/2}.
$$

**Properties.**

* $L$ and $L_{\text{sym}}$ are symmetric positive semidefinite.
* Spectrum encodes connectivity and clustering.
* For connected graphs, $\lambda_0 = 0$ is simple.

**References.**

* Chung, *Spectral Graph Theory* (AMS, 1997)

---

## 5. Continuous–Discrete Link

**Theorem 5.1 (Laplacian Convergence).**
As $n\to\infty, \sigma\to0$, the graph Laplacian converges (after rescaling) to the Laplace–Beltrami operator on the underlying manifold.

**Scaling Factor.**  
For data sampled from a density \(p\) on a manifold \(\mathcal{M}\), the rescaled graph Laplacian satisfies
\[
\frac{1}{n\sigma^{d+2}} L f \;\;\to\;\; c_d \Delta_{\mathcal{M}} f
\]
as \(n \to \infty, \sigma \to 0\), where \(c_d\) is a dimension-dependent constant.  
This clarifies the normalization required for convergence.

**Remark 5.2.**
Thus, k-NN + weights act as discrete approximations of the heat kernel (additive) or Poisson kernel (multiplicative via log).

**References.**

* Belkin & Niyogi (2007), *Convergence of Laplacian Eigenmaps*
* Singer (2006), *Graph Laplacians and Diffusion Maps*

---

## 6. Spectral Properties

**Definition 6.1 (Spectrum).**
Eigenvalues of $L$ or $L_{\text{sym}}$ are denoted $0=\lambda_0 \le \lambda_1 \le \dots \le \lambda_{n-1}$.

**Key Statistics.**

* **Spectral gap:** $\lambda_1$, controls connectivity/mixing.
* **Eigenvalue distribution:** encodes global structure.
* **Spectral entropy:** Shannon entropy of normalized eigenvalues.

---

## 7. Interfaces (Code Targets)

* `build_graph(X, mode="additive"|"multiplicative", k, sigma)` → returns adjacency $A$.
* `laplacian(A, normalized=True)` → returns $L$.
* `spectral_gap(L)` → $\lambda_1$.
* `spectral_entropy(L, k)` → normalized entropy of first $k$ nonzero eigenvalues.

---

## 8. External Knowledge Base

* Chung, *Spectral Graph Theory* — foundational reference.
* von Luxburg, *Tutorial on Spectral Clustering* — practical guide.
* Belkin & Niyogi — Laplacian eigenmaps, convergence results.
* Coifman & Lafon — Diffusion maps.
