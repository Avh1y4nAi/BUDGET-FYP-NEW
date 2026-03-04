import lineChart from "../assets/line-chart.png"; 
import pieChart from "../assets/pie-chart.png"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "react-router-dom"; 

function HomePage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar /> 

            <header className="hero-section text-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="display-4 fw-bold mb-4">
                                Master Your Money, <br />
                                <span className="text-accent">Secure the Future</span>
                            </h1>

                            <p className="lead text-muted mb-5">
                                Effortlessly track expenses, set budgets, and visualize your financial health with our intuitive tools. Start your journey to financial freedom today.
                            </p>

                            <div className="d-flex gap-3 justify-content-center">
                                <Link to="/signup" className="btn btn-accent btn-lg px-5 py-3 shadow-sm">
                                    Get Started for free.
                                </Link>

                                <Link to="/about" className="btn btn-outline-dark btn-lg px-5 py-3">
                                    Learn More about us.
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="py-5">
                <div className="container my-5">

                    <div className="row align-items-center mb-5 gx-5">
                        <div className="col-md-6 order-md-2 mb-4 mb-md-0">
                            <div className="p-2 bg-white rounded-4 shadow-sm">
                                <img src={lineChart} className="img-fluid rounded-3" />
                            </div>
                        </div>

                        <div className="col-md-6 order-md-1">
                            <div className="pe-md-4">
                                <div className="feature-icon mb-3"></div>

                                <h2 className="fw-bold mb-3">Visualize your spending</h2>

                                <p className="text-muted lead">
                                    Don't just guess where your money goes. See the trends with clear, interactive line charts. Identify spikes in spending and adjust your habits in real-time.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center my-5 gx-5">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <div className="p-2 bg-white rounded-4 shadow-sm">
                                <img src={pieChart} className="img-fluid rounded-3" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="ps-md-4">
                                <div className="feature-icon mb-3"></div>

                                <h2 className="fw-bold mb-3">Smart Categorization</h2>

                                <p className="text-muted lead">
                                    Understand your lifestyle by breaking down expenses into categories. Whether it's food, transport, or entertainment, know exactly how much each slice of your budget consumes.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-5 bg-white">
                <div className="container text-center">
                    <h2 className="fw-bold mb-5">Why Choose Budgeter?</h2>

                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card-custom h-100 p-4">
                                <div className="h1 mb-3"></div>
                                <h4 className="fw-bold">Fast & Easy</h4>
                                <p className="text-muted">
                                    Input transactions in seconds. Our interface is designed for speed so you can focus on living.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card-custom h-100 p-4">
                                <div className="h1 mb-3"></div>
                                <h4 className="fw-bold">Secure & Private</h4>
                                <p className="text-muted">
                                    Your financial data is encrypted and safe. We prioritize your privacy above all else.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card-custom h-100 p-4">
                                <div className="h1 mb-3"></div>
                                <h4 className="fw-bold">Goal Oriented</h4>
                                <p className="text-muted">
                                    Set savings goals and track your progress. We help you stay motivated to reach your targets.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}