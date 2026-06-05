import React, { useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  taskCount: number;
  color: string;
}

const sampleProjects: Project[] = [
  { id: 1, name: 'FlowDesk App', description: 'Main product development', taskCount: 12, color: 'primary' },
  { id: 2, name: 'Marketing Site', description: 'Landing page redesign', taskCount: 5, color: 'success' },
  { id: 3, name: 'API Integration', description: 'Third party integrations', taskCount: 8, color: 'warning' },
];

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = () => {
    if (!newName.trim()) return;
    const newProject: Project = {
      id: projects.length + 1,
      name: newName,
      description: newDesc,
      taskCount: 0,
      color: 'info',
    };
    setProjects([...projects, newProject]);
    setNewName('');
    setNewDesc('');
    setShowModal(false);
  };

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm px-4">
        <span className="navbar-brand fw-bold text-primary fs-4">FlowDesk</span>
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="text-muted small">Welcome, John</span>
          <a href="/upgrade" className="btn btn-sm btn-outline-primary">Upgrade to Pro</a>
          <a href="/login" className="btn btn-sm btn-outline-secondary">Logout</a>
        </div>
      </nav>

      {/* Main content */}
      <div className="container py-5">

        {/* Header row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-0">My Projects</h4>
            <p className="text-muted small mb-0">{projects.length} projects</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + New Project
          </button>
        </div>

        {/* Project cards */}
        <div className="row g-4">
          {projects.map((project) => (
            <div className="col-md-4" key={project.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className={`card-header bg-${project.color} bg-opacity-10 border-0 pt-3`}>
                  <span className={`badge bg-${project.color} mb-2`}>{project.taskCount} tasks</span>
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
      </div>

      {/* Create project modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Create New Project</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
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
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleCreate}
                >
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