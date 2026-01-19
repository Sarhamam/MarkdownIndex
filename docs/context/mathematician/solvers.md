
# 📘 Solvers Module — Mathematical Documentation

## 1. Overview

The solvers module provides the **numerical backbone** for the framework:

* **Linear solves**: Conjugate Gradient (CG) for symmetric positive semidefinite systems (e.g., graph Laplacians).
* **Spectral approximation**: Lanczos iteration (built on CG principles).
* **Complexity analysis**: scalability to large, sparse graphs.

---

## 2. Conjugate Gradient Method

**Definition 2.1 (Problem Setting).**
Given a symmetric positive semidefinite matrix $A \in \mathbb{R}^{n \times n}$ and a vector $b \in \mathbb{R}^n$, solve:

$$
Au = b.
$$

**Algorithm 2.2 (Conjugate Gradient).**
Initialize $u_0 = 0$, $r_0 = b - Au_0$, $p_0 = r_0$.
For $k = 0,1,2,\dots$:

$$
\alpha_k = \frac{r_k^T r_k}{p_k^T A p_k}, \quad
u_{k+1} = u_k + \alpha_k p_k,
$$

$$
r_{k+1} = r_k - \alpha_k A p_k, \quad
\beta_{k+1} = \frac{r_{k+1}^T r_{k+1}}{r_k^T r_k}, \quad
p_{k+1} = r_{k+1} + \beta_{k+1} p_k.
$$

Stop when $\|r_k\|/\|b\| \leq \varepsilon$.

**Properties.**

* Converges in at most $n$ steps (exact arithmetic).
* Practically: convergence rate depends on $\kappa(A)=\lambda_{\max}/\lambda_{\min}^+$ (condition number of nonzero eigenvalues).
* Each step requires one sparse matrix–vector multiply ($O(m)$, with $m$ edges in the graph).

**Remarks.**

* For Laplacians, the system is singular; we solve $(L+\alpha I)u=b$ with small $\alpha > 0$.
* Preconditioning (e.g., Jacobi) improves convergence.

**Preconditioning Effect.**  
If \(M\) is a symmetric positive definite preconditioner, then CG applied to \(M^{-1}A\) has convergence rate depending on \(\kappa(M^{-1}A)\), which is typically much smaller than \(\kappa(A)\).

**Variational Interpretation.**  
CG solves the minimization problem
\[
u^\star = \arg\min_u \Big( \tfrac{1}{2} u^T A u - b^T u \Big).
\]
Each iteration chooses a search direction that is \(A\)-conjugate to all previous directions, guaranteeing finite-step convergence in exact arithmetic.

**References.**

* Shewchuk, *An Introduction to the Conjugate Gradient Method Without the Agonizing Pain* (1994).
* Saad, *Iterative Methods for Sparse Linear Systems* (2003).

---

## 3. Conjugate Gradient Descent (CGD) in Our Framework

**Role in Construction.**

* Used to solve diffusion-like equations: $(L + \alpha I)u = b$.
* Enables efficient computation of effective resistances and heat kernels on graphs.
* Serves as the **inner dynamics optimizer** on the zero set $Z$ (projected CG iterations).

**Key Insight.**
CG is not just a solver but a **geometric descent along conjugate directions**, aligning naturally with the submersion construction where orthogonality/transversality is enforced.

---

## 4. Lanczos Iteration (Spectral Approximation)

**Definition 4.1 (Lanczos Method).**
Lanczos iteration builds an orthonormal basis of the Krylov subspace

$$
\mathcal{K}_k(A,b) = \operatorname{span}\{b, Ab, A^2 b, \dots, A^{k-1}b\}.
$$

It yields a tridiagonal matrix $T_k$ whose eigenvalues approximate those of $A$.

**Application.**

* Approximates the smallest $k$ eigenvalues/eigenvectors of $L$ or $L_{\text{sym}}$.
* Used for spectral gap, entropy, and curvature diagnostics.

**Complexity.**

* Each iteration: one matvec ($O(m)$).
* Total: $O(k m)$, with $k \ll n$.

**References.**

* Golub & Van Loan, *Matrix Computations* (4th ed., 2013).
* Saad, *Iterative Methods for Sparse Linear Systems* (2003).

---

## 5. Complexity Summary

* **CG Solve**: $O(m \sqrt{\kappa})$, where $m=O(nk)$ edges.
* **Lanczos Spectrum**: $O(k m)$ for $k$ eigenpairs.
* **Memory**: $O(m)$ for graph + $O(n)$ for vectors.

---

## 6. Interfaces (Code Targets)

* `cg_solve(L, b, alpha=1e-3, tol=1e-6, maxiter=2000)`
  → Solve $(L + \alpha I)u = b$. Returns solution and convergence info.

* `topk_eigs(L, k=16, which="SM")`
  → Approximate $k$ smallest-magnitude eigenpairs using Lanczos.

* `effective_resistance(L, i, j)`
  → Estimate via CG solves for multiple RHS.

---

## 7. External Knowledge Base

* Shewchuk (1994), *Conjugate Gradient Method Without the Agonizing Pain*.
* Saad (2003), *Iterative Methods for Sparse Linear Systems*.
* Golub & Van Loan (2013), *Matrix Computations*.

