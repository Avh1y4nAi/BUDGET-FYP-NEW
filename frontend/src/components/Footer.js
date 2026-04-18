import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Footer() {
  return (
    <footer className="footer-custom mt-auto">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-4 col-md-12">
            <h4 className="fw-bold text-white mb-3">Budgeter<span className="text-accent">.</span></h4>
            <p className="text-white-50 mb-4" style={{maxWidth: "320px", lineHeight: "1.6"}}>
              Empowering you to take control of your financial future with intuitive tools, smart insights, and secure planning.
            </p>
            <div className="d-flex gap-3">
            </div>
          </div>
          
          <div className="col-lg-3 col-6">
            <h6 className="footer-heading">Platform</h6>
            <ul className="list-unstyled d-flex flex-column">
              <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-6">
            <h6 className="footer-heading">Company</h6>
            <ul className="list-unstyled d-flex flex-column">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2">
            {/* Empty space for better layout */}
          </div>
        </div>
        
        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
          <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} Budgeter Inc. All rights reserved.</p>
          <div className="d-flex gap-4">
             <Link to="#" className="text-white-50 text-decoration-none hover-white">Privacy Policy</Link>
             <Link to="#" className="text-white-50 text-decoration-none hover-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;