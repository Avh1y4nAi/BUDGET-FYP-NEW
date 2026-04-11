import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/register", { name, email, password });
      login(data, data.token); // The register endpoint returns more info now
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
             <div className="text-center mb-4">
              <h1 className="fw-bold text-dark mb-1">Budgeter<span className="text-accent">.</span></h1>
              <p className="text-muted small">Create your free account to get started.</p>
            </div>

            <div className="card-custom bg-white p-4 p-md-5">
              {error && <div className="alert alert-danger py-2 small border-0 rounded-2">{error}</div>}
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light border-0"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Email Address</label>
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
                  <label className="form-label text-muted small fw-bold text-uppercase">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light border-0"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button 
                  className="btn btn-accent w-100 btn-lg mb-4 py-3 fw-bold" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
               <div className="text-center">
                <p className="text-muted mb-0 small">
                  Already have an account? <Link to="/login" className="text-accent fw-bold text-decoration-none">Log in</Link>
                </p>
              </div>
            </div>
            
             <div className="text-center mt-5">
              <Link to="/" className="text-muted small text-decoration-none opacity-75">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;