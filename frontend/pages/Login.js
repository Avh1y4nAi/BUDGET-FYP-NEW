import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-dark">
                Budgeter<span className="text-accent">.</span>
              </h1>
              <p className="text-muted">
                Welcome back! Please login to your account.
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold text-uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-0">
                    Password
                  </label>
                  <a href="#" className="small text-accent text-decoration-none">
                    Forgot?
                  </a>
                </div>

                <input
                  type="password"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-accent w-100 btn-lg mb-3" type="submit">
                Log In
              </button>
            </form>

            <div className="text-center">
              <p className="text-muted mb-0">
                Don't have an account?
                <a href="/signup" className="text-accent fw-bold text-decoration-none">
                  Sign up
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
  );
};

export default Login;
