import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  description: string;
  owner: any;
  createdAt: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem('name') || 'User';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchProjects = async () => {
      try {
        const response = await API.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const response = await API.post('/api/projects', {
        name: newName,
        description: newDesc,
      });
      setProjects([...projects, response.data]);
      setNewName('');
      setNewDesc('');
      setShowModal(false);
    } catch (err) {
      console.error('Failed to create project');
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm px-4">
        <span className="navbar-brand fw-bold text-primary fs-4">FlowDesk</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="text-muted small">Welcome, {name}</span>
          <a href="/upgrade" className="btn btn-sm btn-outline-primary">Upgrade to Pro</a>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-0">My Projects</h4>
            <p className="text-muted small mb-0">{projects.length} projects</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p>No projects yet. Create your first project!</p>
          </div>
        ) : (
          <div className="row g-4">
            {projects.map((project) => (
              <div className="col-md-4" key={project.id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header bg-primary bg-opacity-10 border-0 pt-3">
                    <h5 className="fw-bold mb-0">{project.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted small">{project.description}</p>
                  </div>
                  <div className="card-footer bg-white border-0 pb-3">
                    <a href={"/project/" + project.id} className="btn btn-sm btn-outline-primary w-100">
                      Open Board
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Create New Project</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-medium">Project name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Mobile App"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Description</label>
                  <textarea
                    className="form-control"
                    placeholder="What is this project about?"
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;