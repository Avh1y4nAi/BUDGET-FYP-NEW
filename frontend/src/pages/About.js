import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section text-center py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Empowering Your <br />
                <span className="text-accent">Financial Journey</span>
              </h1>
              <p className="lead text-muted mb-4">
                We believe that managing your money should be simple, intuitive, and stress-free. 
                Our mission is to help you take control of your finances and build a secure future.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Our Mission Section */}
      <section className="py-5 bg-white">
        <div className="container my-5">
          <div className="row align-items-center gx-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
               {/* Placeholder for an "About Us" image */}
               <div className="bg-light rounded-3 p-5 text-center shadow-sm" style={{minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div>
                    <span style={{fontSize: '6rem'}}></span>
                    <p className="text-muted mt-3">Building Trust & Financial Freedom</p>
                  </div>
               </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <h6 className="text-accent text-uppercase fw-bold letter-spacing-2 mb-3">Our Mission</h6>
                <h2 className="display-6 fw-bold mb-4">Simplifying Personal Finance for Everyone</h2>
                <p className="text-muted lead mb-4">
                  In today's fast-paced world, managing income, expenses, and savings can be overwhelming. 
                  Budgeter removes the complexity, providing you with a clear, real-time view of your financial health.
                </p>
                <p className="text-muted mb-4">
                  Whether you're saving for a dream vacation, paying off debt, or planning for retirement, 
                  our tools are designed to guide you every step of the way. We replace spreadsheets and guesswork 
                  with automated insights and smart categorization.
                </p>
                <Link to="/signup" className="btn btn-accent px-4 py-2 rounded-3">
                  Join Our Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5 bg-light">
        <div className="container my-5">
          <div className="text-center mb-5">
            <h6 className="text-accent text-uppercase fw-bold letter-spacing-2 mb-3">Our Values</h6>
            <h2 className="fw-bold">What Drives Us</h2>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card-custom h-100 p-4 border-0">
                <div className="mb-4 text-accent">
                   <span style={{fontSize: '3rem'}}></span>
                </div>
                <h4 className="fw-bold mb-3">Innovation</h4>
                <p className="text-muted">
                  We constantly evolve our platform with the latest technology to provide smart, actionable insights that make a real difference.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-custom h-100 p-4 border-0">
                <div className="mb-4 text-accent">
                   <span style={{fontSize: '3rem'}}></span>
                </div>
                <h4 className="fw-bold mb-3">Security</h4>
                <p className="text-muted">
                  Your trust is our top priority. We employ bank-grade encryption and strict privacy protocols to ensure your data stays safe.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-custom h-100 p-4 border-0">
                <div className="mb-4 text-accent">
                   <span style={{fontSize: '3rem'}}></span>
                </div>
                <h4 className="fw-bold mb-3">Simplicity</h4>
                <p className="text-muted">
                  We believe financial tools shouldn't need a manual. Our user-centric design ensures that Budgeter is accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Story Section (Brief) */}
      <section className="py-5 bg-white">
        <div className="container my-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-4">Built by Finance Enthusiasts</h2>
              <p className="text-muted lead mb-5">
                Budgeter started as a small project to help friends manage their monthly expenses. 
                Today, it has grown into a comprehensive platform trusted by users worldwide. 
                We are a passionate team of developers, designers, and financial experts committed to your success.
              </p>
              <Link to="/contact" className="btn btn-outline-dark px-5 py-3 rounded-3">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;