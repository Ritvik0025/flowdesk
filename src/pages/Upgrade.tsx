import React from 'react';

function Upgrade() {
  const handleUpgrade = () => {
    // Stripe payment link will come when backend is ready
    alert('Stripe payment will be connected when backend is ready!');
  };

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar bg-white shadow-sm px-4">
        <span className="navbar-brand fw-bold text-primary fs-4">FlowDesk</span>
        <div className="ms-auto">
          <a href="/dashboard" className="btn btn-sm btn-outline-secondary">
            ← Back to Dashboard
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="container py-5">

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Choose your plan</h2>
          <p className="text-muted">Upgrade to Pro and unlock all features</p>
        </div>

        {/* Pricing cards */}
        <div className="row justify-content-center g-4">

          {/* Free plan */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-1">Free</h5>
                <p className="text-muted small mb-3">Perfect to get started</p>
                <div className="mb-4">
                  <span className="fs-1 fw-bold">$0</span>
                  <span className="text-muted">/month</span>
                </div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Up to 3 projects
                  </li>
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Basic Kanban board
                  </li>
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Up to 5 team members
                  </li>
                  <li className="mb-2 text-muted">
                    <span className="me-2">✗</span>
                    AI task summarizer
                  </li>
                  <li className="mb-2 text-muted">
                    <span className="me-2">✗</span>
                    Unlimited projects
                  </li>
                </ul>
                <button className="btn btn-outline-secondary w-100" disabled>
                  Current Plan
                </button>
              </div>
            </div>
          </div>

          {/* Pro plan */}
          <div className="col-md-4">
            <div className="card h-100 border-primary shadow" style={{ borderWidth: '2px' }}>
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h5 className="fw-bold mb-0">Pro</h5>
                  <span className="badge bg-primary">Most Popular</span>
                </div>
                <p className="text-muted small mb-3">For serious teams</p>
                <div className="mb-4">
                  <span className="fs-1 fw-bold text-primary">$12</span>
                  <span className="text-muted">/month</span>
                </div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Unlimited projects
                  </li>
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Advanced Kanban board
                  </li>
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Unlimited team members
                  </li>
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    AI task summarizer
                  </li>
                  <li className="mb-2">
                    <span className="text-success me-2">✓</span>
                    Priority support
                  </li>
                </ul>
                <button
                  className="btn btn-primary w-100 fw-medium"
                  onClick={handleUpgrade}
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-muted small mt-4">
          Secure payment powered by Stripe. Cancel anytime.
        </p>

      </div>
    </div>
  );
}

export default Upgrade;