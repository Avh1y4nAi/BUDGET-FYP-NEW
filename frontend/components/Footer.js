import {Link} from "react-router-dom"; // for navigation links
import {ArrowRight} from "Lucide-react"; // UI icon componemt 

function Footer () {
    return (
        <footer className = "footer-custom mt-auto">
            <div className = "container">
                <div className = "row gy-5">
                    <div className = "col-lg-4 col-md-12">
                        <h4 className = "fw-bold text-white mb-3">Budgeter<span className = "text-accent">.</span></h4>
                        <p className = "text-white-50 mb-4" style={{maxWidth: "320px", lineHeight: "1.6"}}>
                            Empowering you to take control of your financial future with intuitive tools, smart insights, and secure planning.
                        </p>
                        <div className = "d-flex gap-3">
                        </div>
                    </div>

                    <div className = "col-lg-2 col-6">
                        <h6 className = "footer-heading">Platform</h6>
                        <ul className = "list-unstyled d-flex flex-column">
                            <li><Link to= "/dashboard" className = "footer-link">Dashboard</Link></li>
                            <li><Link to= "#" className = "footer-link">Expense Tracking</Link></li>
                            <li><Link to= "#" className = "footer-link">Budgeting</Link></li>
                            <li><Link tp= "#" className = "footer-link">Reports</Link></li>
                        </ul>
                    </div>

                    <div className = "col-lg-2 col-6">
                        <h6 className = "footer-heading">Company</h6>
                        <ul className = "list-unstyled d-flex flex-folumn">
                            <li><Link to="/about" className="footer-link">About Us</Link></li>
                            <li><Link to="/contact" className="footer-link">Contact</Link></li>
                            <li><Link to="#" className="footer-link">Careers</Link></li>
                            <li><Link to="#" className="footer-link">Press</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <h6 className="footer-heading">Newsletter</h6>
                        <p className="text-white-50 small mb-3">Subscribe to get the latest financial tips and updates.</p>
                        <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}> {/* event handle to prevent default form submission*/}
                           <div className = "input-group">
                            <input type = "email" className = "form-control border-0 bg-white" placeholder = "Enter email address" style = {{padding: "10px 15px", fontSize: "0.9rem"}}/> 
                            <button className = "btn btn-accent d-flex aligh-items-center gap-2">
                                Subscribe <ArrowRight size = {16} />
                            </button>
                            </div>    
                        </form>
                    </div>
                </div>

                <div className = "footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
                    <p className = "mb-2 mb-md-0"> &copy; {new Date().getFullYear()}Budgeter.</p> {/* For the date on the footer*/}
                    <div className="d-flex gap-4">
                        <Link to="#" className="text-white-50 text-decoration-none hover-white">Privacy Policy</Link>
                        <Link to="#" className="text-white-50 text-decoration-none hover-white">Terms of Service</Link>
                        <Link to="#" className="text-white-50 text-decoration-none hover-white">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    ); 
}

export default Footer; 