<div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)" }}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-5 col-lg-4">

        <div className="text-center mb-4">
          <h1 className="fw-bold text-dark">
            Budgeter<span className="text-accent">.</span>
          </h1>
          <p className="text-muted">
            Create your free account to get started.
          </p>
        </div>

          <form>
            <div className="mb-3">
              <label className="form-label text-muted small fw-bold text-uppercase">
                Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-light border-0"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted small fw-bold text-uppercase">
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg bg-light border-0"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small fw-bold text-uppercase">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg bg-light border-0"
                placeholder="••••••••"
                required
              />
            </div>

            <button className="btn btn-accent w-100 btn-lg mb-3" type="submit">
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-muted mb-0">
              Already have an account?
              <a href="/login" className="text-accent fw-bold text-decoration-none">
                Log in
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-muted small text-decoration-none">
            ← Back to Home
          </a>
        </div>

      </div>
    </div>
  </div>