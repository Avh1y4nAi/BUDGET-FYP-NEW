import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { data } = await axios.post("/api/contact", formData);
      if (data.success) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      setStatus({ 
        type: "danger", 
        message: error.response?.data?.message || "Something went wrong. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section py-5 bg-light">
        <div className="container py-5 text-center">
          <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
          <p className="lead text-muted mb-0">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container my-5 py-4">
        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="pe-lg-4">
              <h2 className="fw-bold mb-4">Let's start a conversation</h2>
              <p className="text-muted mb-5">
                Whether you need support, have a feature request, or just want to say hello, our team is ready to help.
              </p>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 text-accent">
                   <Mail size={24} />
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1">Email Us</h5>
                  <p className="text-muted mb-0">khanalavhiyan@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card-custom p-4 p-md-5 border-0 bg-white shadow-sm">
              <h3 className="fw-bold mb-4">Send us a message</h3>
              
              {status && (
                <div className={`alert alert-${status.type} alert-dismissible fade show`} role="alert">
                  {status.message}
                  <button type="button" className="btn-close" onClick={() => setStatus(null)}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-bold text-uppercase">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="Your name" 
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-bold text-uppercase">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="name@example.com" 
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light border-0" 
                    placeholder="How can we help?" 
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light border-0" 
                    rows="5" 
                    placeholder="Tell us more..." 
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-accent btn-lg px-5 rounded-3 d-flex align-items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;