import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assignee?: { name: string };
}

const priorityColors: Record<string, string> = {
  HIGH: 'danger',
  MEDIUM: 'warning',
  LOW: 'success',
};

function Project() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('MEDIUM');
  const [newAssignee, setNewAssignee] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get('/api/tasks/' + id);
        setTasks(response.data);
      } catch (err) {
        console.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [id]);

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;
    try {
      const response = await API.post('/api/tasks/' + id, {
        title: newTitle,
        priority: newPriority,
        assigneeEmail: newAssignee || null,
      });
      setTasks([...tasks, response.data]);
      setNewTitle('');
      setNewAssignee('');
      setNewPriority('MEDIUM');
      setShowModal(false);
    } catch (err) {
      console.error('Failed to create task');
    }
  };

  const moveTask = async (taskId: number, newStatus: string) => {
    try {
      const response = await API.put('/api/tasks/' + taskId + '/status', {
        status: newStatus,
      });
      setTasks(tasks.map(t => t.id === taskId ? response.data : t));
    } catch (err) {
      console.error('Failed to update task');
    }
  };

  const todoTasks = tasks.filter(t => t.status === 'TODO');
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter(t => t.status === 'DONE');

  const columns = [
    { id: 'TODO', title: 'To Do', color: 'secondary', tasks: todoTasks },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'primary', tasks: inProgressTasks },
    { id: 'DONE', title: 'Done', color: 'success', tasks: doneTasks },
  ];

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar bg-white shadow-sm px-4">
        <a href="/dashboard" className="text-decoration-none">
          <span className="navbar-brand fw-bold text-primary fs-4">FlowDesk</span>
        </a>
        <div className="ms-auto d-flex align-items-center gap-3">
          <a href="/dashboard" className="btn btn-sm btn-outline-secondary">
            ← Back to Projects
          </a>
          <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
            + Add Task
          </button>
        </div>
      </nav>

      <div className="container-fluid py-4 px-4">
        <div className="mb-4">
          <h4 className="fw-bold mb-0">Project Board</h4>
          <p className="text-muted small">Kanban Board</p>
        </div>

        <div className="row g-3">
          {columns.map(col => (
            <div className="col-md-4" key={col.id}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className={"badge bg-" + col.color}>{col.tasks.length}</span>
                <h6 className="fw-bold mb-0">{col.title}</h6>
              </div>

              <div className="rounded-3 p-2" style={{ background: '#f0f2f5', minHeight: '400px' }}>
                {col.tasks.map(task => (
                  <div key={task.id} className="card border-0 shadow-sm mb-2 p-3">
                    <p className="fw-medium mb-2 small">{task.title}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={"badge bg-" + priorityColors[task.priority] + " bg-opacity-10 text-" + priorityColors[task.priority]}>
                        {task.priority}
                      </span>
                      <span className="text-muted small">
                        {task.assignee ? task.assignee.name : 'Unassigned'}
                      </span>
                    </div>
                    <div className="d-flex gap-1 mt-2">
                      {col.id !== 'TODO' && (
                        <button
                          className="btn btn-outline-secondary btn-sm flex-fill"
                          style={{ fontSize: '11px' }}
                          onClick={() => moveTask(task.id, col.id === 'DONE' ? 'IN_PROGRESS' : 'TODO')}
                        >
                          ← Back
                        </button>
                      )}
                      {col.id !== 'DONE' && (
                        <button
                          className="btn btn-outline-primary btn-sm flex-fill"
                          style={{ fontSize: '11px' }}
                          onClick={() => moveTask(task.id, col.id === 'TODO' ? 'IN_PROGRESS' : 'DONE')}
                        >
                          Forward →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {col.tasks.length === 0 && (
                  <div className="text-center text-muted small py-5">No tasks here</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Add New Task</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-medium">Task title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Fix login bug"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Priority</label>
                  <select
                    className="form-select"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Assignee email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ritvik@gmail.com"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddTask}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;