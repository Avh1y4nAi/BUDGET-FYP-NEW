<div className="d-flex flex-column min-vh-100">
    <div className="hero-section py-5" style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)" }}>
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
                   <span style={{fontSize: '1.5rem'}}></span>
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1">Email Us</h5>
                  <p className="text-muted mb-0">support@budgeter.com</p>
                  <p className="text-muted">info@budgeter.com</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 text-accent">
                   <span style={{fontSize: '1.5rem'}}></span>
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1">Call Us</h5>
                  <p className="text-muted mb-0">+1 (555) 123-4567</p>
                  <p className="text-muted">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 text-accent">
                   <span style={{fontSize: '1.5rem'}}></span>
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1">Visit Us</h5>
                  <p className="text-muted mb-0">123 Financial District Blvd,</p>
                  <p className="text-muted">New York, NY 10005</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card-custom p-4 p-md-5 border-0 bg-white">
              <h3 className="fw-bold mb-4">Send us a message</h3>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-bold text-uppercase">Name</label>
                      <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="Your name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted small fw-bold text-uppercase">Email</label>
                      <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="name@example.com" />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase">Subject</label>
                  <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="How can we help?" />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase">Message</label>
                  <textarea className="form-control form-control-lg bg-light border-0" rows="5" placeholder="Tell us more..."></textarea>
                </div>

                <button type="button" className="btn btn-accent btn-lg px-5 rounded-pill">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

       {/* Map Placeholder */}
       <div className="bg-light w-100" style={{height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <div className="text-center text-muted">
               <span style={{fontSize: '3rem'}}></span>
               <p className="mt-2">Map Integration Placeholder</p>
           </div>
       </div>
</div>