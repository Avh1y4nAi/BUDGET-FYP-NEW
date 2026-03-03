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
                            <li><Link to = "/dashboard" className = "footer-link">Dashboard</Link></li>
                        </ul>
                    </div>



                </div>
            </div>
        </footer>
    )
}

