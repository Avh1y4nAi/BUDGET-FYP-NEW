import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Zap, Shield, Target, ArrowRight } from "lucide-react";

const lineData = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 9800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];

const pieData = [
  { name: 'Food', value: 400 },
  { name: 'Rent', value: 1200 },
  { name: 'Travel', value: 300 },
  { name: 'Utilities', value: 200 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section text-center">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4 fw-bold">
                 Smart Personal Finance Manager
              </div>
              <h1 className="display-3 fw-bold mb-4">
                Master Your Money, <br />
                <span className="text-accent">Secure Your Future</span>
              </h1>
              <p className="lead text-muted mb-5 mx-auto" style={{maxWidth: '700px'}}>
                Effortlessly track expenses, set budgets, and visualize your financial health with our intuitive tools. Start your journey to financial freedom today.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/signup" className="btn btn-accent btn-lg px-5 py-3 shadow-sm d-flex align-items-center gap-2">
                  Get Started Now <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn btn-outline-dark btn-lg px-5 py-3">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container my-5">
          <div className="row align-items-center mb-5 gx-5">
            <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
              <div className="p-4 bg-white rounded-4 shadow-sm border" style={{height: '350px'}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981' }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={4} dot={{ r: 6, fill: '#ef4444' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="pe-lg-4">
                <div className="feature-icon bg-success bg-opacity-10 text-success p-3 rounded-3 d-inline-flex mb-4">
                    <TrendingUp size={32} />
                </div>
                <h2 className="display-6 fw-bold mb-3">Visualize Your Spending</h2>
                <p className="text-muted lead mb-4">
                  Don't just guess where your money goes. See the trends with clear, interactive line charts. Identify spikes in spending and adjust your habits in real-time.
                </p>
                <ul className="list-unstyled">
                    <li className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle bg-success" style={{width: 8, height: 8}}></div>
                        <span>Real-time income and expense tracking</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle bg-danger" style={{width: 8, height: 8}}></div>
                        <span>Automated spending trend analysis</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row align-items-center my-5 py-lg-5 gx-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
               <div className="p-4 bg-white rounded-4 shadow-sm border d-flex align-items-center justify-content-center" style={{height: '350px'}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="position-absolute text-center">
                    <h4 className="fw-bold mb-0">Total</h4>
                    <p className="text-muted small mb-0">Spending</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <div className="feature-icon bg-primary bg-opacity-10 text-primary p-3 rounded-3 d-inline-flex mb-4">
                    <PieChartIcon size={32} />
                </div>
                <h2 className="display-6 fw-bold mb-3">Smart Categorization</h2>
                <p className="text-muted lead mb-4">
                  Understand your lifestyle by breaking down expenses into categories. Whether it's food, transport, or entertainment, know exactly how much each slice of your budget consumes.
                </p>
                <div className="row g-3">
                    {pieData.map((cat, idx) => (
                        <div key={idx} className="col-6">
                            <div className="d-flex align-items-center gap-2">
                                <div className="rounded-circle" style={{width: 12, height: 12, backgroundColor: COLORS[idx]}}></div>
                                <span className="fw-bold">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-white">
        <div className="container py-5 text-center">
          <h6 className="text-accent text-uppercase fw-bold letter-spacing-2 mb-3">Our Benefits</h6>
          <h2 className="display-5 fw-bold mb-5">Why Choose Budgeter?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card-custom h-100 p-5 border-0 shadow-sm">
                <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle d-inline-flex mb-4">
                    <Zap size={32} />
                </div>
                <h4 className="fw-bold mb-3">Fast & Easy</h4>
                <p className="text-muted mb-0">
                  Input transactions in seconds. Our interface is designed for speed so you can focus on living your life.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-custom h-100 p-5 border-0 shadow-sm">
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle d-inline-flex mb-4">
                    <Shield size={32} />
                </div>
                <h4 className="fw-bold mb-3">Secure & Private</h4>
                <p className="text-muted mb-0">
                  Your financial data is encrypted and safe. We prioritize your privacy and data security above all else.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-custom h-100 p-5 border-0 shadow-sm">
                <div className="bg-accent bg-opacity-10 text-accent p-3 rounded-circle d-inline-flex mb-4">
                    <Target size={32} />
                </div>
                <h4 className="fw-bold mb-3">Goal Oriented</h4>
                <p className="text-muted mb-0">
                  Set savings goals and track your progress. We help you stay motivated to reach your financial targets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-success bg-opacity-10">
        <div className="container text-center py-5">
          <h2 className="display-5 fw-bold mb-3">Ready to Take Control?</h2>
          <p className="lead text-muted mb-5 mx-auto" style={{maxWidth: '600px'}}>Join thousands of users managing their budgets smarter and achieving their financial goals faster.</p>
          <Link to="/signup" className="btn btn-accent btn-lg px-5 py-3 rounded-3 shadow-sm fw-bold">
            Get Started Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;