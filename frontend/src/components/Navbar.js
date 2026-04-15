import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, LayoutDashboard, Home, Info, Mail, Settings, ReceiptText, ShieldAlert } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand navbar-brand-custom fs-3" to="/">
          Budgeter<span className="text-accent">.</span>
        </Link>
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
             <li className="nav-item">
              <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/home">
                <Home size={18} /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/dashboard">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/about">
                <Info size={18} /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/contact">
                <Mail size={18} /> Contact
              </Link>
            </li>
            
            {!user ? (
              <>
                <li className="nav-item ms-lg-4 mt-3 mt-lg-0">
                  <Link className="btn btn-outline-dark px-4 rounded-3 me-2 border-2 fw-bold" to="/login">
                    Log In
                  </Link>
                </li>
                <li className="nav-item mt-2 mt-lg-0">
                  <Link className="btn btn-accent px-4 rounded-3 fw-bold" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown ms-lg-4 mt-3 mt-lg-0">
                <button 
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2 bg-light px-3 py-2 rounded-3 border-0" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <img 
                    src={user.profilePic || 'https://via.placeholder.com/32'} 
                    alt="profile" 
                    className="rounded-circle border"
                    style={{width: '32px', height: '32px', objectFit: 'cover'}}
                  />
                  <span className="fw-bold text-dark">{user.name.split(' ')[0]}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 p-2 mt-2">
                  {user.isAdmin && (
                    <li>
                      <Link className="dropdown-item rounded-2 d-flex align-items-center gap-2 py-2 text-danger fw-bold" to="/admin">
                        <ShieldAlert size={16} /> Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item rounded-2 d-flex align-items-center gap-2 py-2" to="/profile">
                      <User size={16} /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item rounded-2 d-flex align-items-center gap-2 py-2" to="/transactions">
                      <ReceiptText size={16} /> Transactions
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item rounded-2 d-flex align-items-center gap-2 py-2" to="/settings">
                      <Settings size={16} /> Settings
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item rounded-2 d-flex align-items-center gap-2 py-2 text-danger" 
                      onClick={handleLogout} 
                    >
                      <LogOut size={16} /> Log Out
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;