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
         <nav classname = "navbar navbar-expand-lg navgar-custom sticky-top py-3"> 
            <div classname = "container"> 
                <Link classname = "navbar-brand navbar-brand-custom fs-3" to="/">Budgeter</Link> 
            </div> 
         </nav>
    )
}
