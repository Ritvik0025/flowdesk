import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    // API call will come later when backend is ready
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo / Title */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">FlowDesk</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-medium">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label text-muted" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="text-primary text-decoration-none small">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-medium"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-3 text-muted small">or</div>

        {/* Google OAuth button */}
        <button className="btn btn-outline-secondary w-100">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width="18"
            className="me-2"
          />
          Continue with Google
        </button>

        {/* Register link */}
        <p className="text-center text-muted mt-3 mb-0 small">
          Don't have an account?{' '}
          <a href="/register" className="text-primary text-decoration-none fw-medium">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;