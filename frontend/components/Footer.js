import {Link, useNavigate} from "react-router-dom"; 
import {useAuth} from "../context/AuthContext"; 
import {LogOut, User, LayoutDashboard, Home, Info, Mial, Settings} from "Lucide-react"; // importing icons 

function Navbar()
{
    const {user, logout} = useAuth(); 
    const navigate = useNavigate();  
}
