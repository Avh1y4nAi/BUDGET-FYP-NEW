import {Link, useNavigate} from "react-router-dom"; // importing modules for nav and links
import {useAuth} from "../context/AuthContext"; // importing for authentication 
import {LogOut, User, LayoutDashboard, Home, Info, Mial, Settings} from "Lucide-react"; // importing icons 

function Navbar() // navbar component 
{
    const {user, logout} = useAuth(); 
    const navigate = useNavigate();  

    const handleLogout = () => // to handle logout 
    {
        logout(); 
        navigate("/login"); 
    }; 

    return( //navbar JSX 
        <nav className="navbar navbar-expand-lg navgar-custom sticky-top py-3"> 
            <div className="container"> 
                <Link className="navbar-brand navbar-brand-custom fs-3" to="/">
                    Budgeter<span classname="text-accent">.</span>
                </Link> {/* logo and anme with styling*/} 

                <button 
                    className="navbar-toggler border-0 shadow-none" 
                    type="button"
                    data-bs-toggle="collapse" // using bootstrap for responsiveness 
                    data-bs-target="#navbarNav"
                > 
                    <span className="navbar-toggler-icon"></span> 
                </button> {/* toggle button */}

                <div className="collapse navbar-collape" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/home"> 
                                <Home size={18} /> Home {/* home link with icon and styling */} 
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/dashboard">
                                <LayoutDashboard size={18}/> Dashboard {/*Dashboard link with icon and styling*/} 
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/about">
                                <Info size={18}/> About {/* About link with icon and styling*/} 
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link nav-link-custom mx-2 d-flex align-items-center gap-2" to="/contact">
                                <Mail size={18} /> Contact {/* Contact link with icon and styling*/}
                            </Link>
                        </li>

                        {user ? ( // if user is not logged in 
                            <> 
                                <li className="nav-item ms-lg-4 mt-3 mt-lg-0">
                                    <Link className="btn btn-outline-dark px-4 rounded-pill me-2 border-2 fw-bold" to="/login"> {/*log in link with styling*/}
                                        Login
                                    </Link> 
                                </li>

                                <li className="nav-item mt-2 mt-lg-0" to="/signup"> 
                                    <Link className="btn btn-accent px-4 rounded-pill fw-bold" to="/signup"> {/*singup link with styleing*/}
                                        Sign Up
                                    </Link>
                                </li> 
                            </>
                        ) : ( //if user is logged in
                            <>
                                <li className="nav-item dropdown ms-lg-4 mt-lg-0"> 
                                    <button 
                                        className="nav-link dropdown-toggle d-flex align-items-center gap-2 bg-light px-3 py-2 rounded-pill border-0"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <img 
                                            src={User.profilePicture || 'https://via.placeholder.com/32'} 
                                            alt="profile" 
                                            className="rounded-circle" 
                                            style={{width:'32px', height:"32px", objectFit:"cover"}} 
                                        /> {/*profile picture with styling and alternate*/}
                                        <span className="fw-bold text-dark">
                                            {User.name.split(' ')[0]} 
                                        </span> {/*to display firstname with styling*/} 
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-4 p-2 mt-2"> 
                                        <li>
                                            <Link className="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2" to="/profile">
                                                <User size={16}/> My Profile
                                            </Link>
                                        </li>

                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>

                                        <li>
                                            <button 
                                                className="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2 text-danger" 
                                                onClick={handleLogout}
                                            > 
                                                <LogOut size={16} /> 
                                            </button>
                                        </li>
                                    </ul>

                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div> 
        </nav>
    )
}

export default Navbar; 