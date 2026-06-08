import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!name || !email || !password || !confirm) {
    setError('Please fill in all fields');
    return;
  }
  if (password !== confirm) {
    setError('Passwords do not match');
    return;
  }
  if (password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  setLoading(true);
  try {
    const response = await API.post('/api/auth/register', { name, email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('email', response.data.email);
    navigate('/dashboard');
  } catch (err: any) {
    setError('Email already exists');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '420px' }}>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">FlowDesk</h2>
          <p className="text-muted">Create your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-medium">Full name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-medium">Confirm password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-medium"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-3 text-muted small">or</div>

        {/* Google */}
        <button className="btn btn-outline-secondary w-100">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width="18"
            className="me-2"
          />
          Continue with Google
        </button>

        {/* Login link */}
        <p className="text-center text-muted mt-3 mb-0 small">
          Already have an account?{' '}
          <a href="/login" className="text-primary text-decoration-none fw-medium">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;