import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'secondary',
    tasks: [
      { id: 1, title: 'Design login page', priority: 'High', assignee: 'John' },
      { id: 2, title: 'Setup database', priority: 'Medium', assignee: 'Sara' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    color: 'primary',
    tasks: [
      { id: 3, title: 'Build REST API', priority: 'High', assignee: 'John' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'success',
    tasks: [
      { id: 4, title: 'Project setup', priority: 'Low', assignee: 'Sara' },
    ],
  },
];

const priorityColors: Record<string, string> = {
  High: 'danger',
  Medium: 'warning',
  Low: 'success',
};

function Project() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newAssignee, setNewAssignee] = useState('');

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: newTitle,
      priority: newPriority,
      assignee: newAssignee || 'Unassigned',
    };
    setColumns(columns.map(col =>
      col.id === 'todo'
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
    setNewTitle('');
    setNewAssignee('');
    setNewPriority('Medium');
    setShowModal(false);
  };

  const moveTask = (taskId: number, fromColId: string, toColId: string) => {
    let taskToMove: Task | undefined;
    const updated = columns.map(col => {
      if (col.id === fromColId) {
        taskToMove = col.tasks.find(t => t.id === taskId);
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
      }
      return col;
    });
    setColumns(updated.map(col => {
      if (col.id === toColId && taskToMove) {
        return { ...col, tasks: [...col.tasks, taskToMove] };
      }
      return col;
    }));
  };

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
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

      {/* Board */}
      <div className="container-fluid py-4 px-4">
        <div className="mb-4">
          <h4 className="fw-bold mb-0">FlowDesk App</h4>
          <p className="text-muted small">Kanban Board</p>
        </div>

        <div className="row g-3">
          {columns.map(col => (
            <div className="col-md-4" key={col.id}>

              {/* Column header */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className={"badge bg-" + col.color}>{col.tasks.length}</span>
                <h6 className="fw-bold mb-0">{col.title}</h6>
              </div>

              {/* Task cards */}
              <div
                className="rounded-3 p-2"
                style={{ background: '#f0f2f5', minHeight: '400px' }}
              >
                {col.tasks.map(task => (
                  <div
                    key={task.id}
                    className="card border-0 shadow-sm mb-2 p-3"
                  >
                    <p className="fw-medium mb-2 small">{task.title}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={"badge bg-" + priorityColors[task.priority] + " bg-opacity-10 text-" + priorityColors[task.priority]}>
                        {task.priority}
                      </span>
                      <span className="text-muted small">{task.assignee}</span>
                    </div>

                    {/* Move buttons */}
                    <div className="d-flex gap-1 mt-2">
                      {col.id !== 'todo' && (
                        <button
                          className="btn btn-outline-secondary btn-sm flex-fill"
                          style={{ fontSize: '11px' }}
                          onClick={() => moveTask(task.id, col.id, col.id === 'done' ? 'inprogress' : 'todo')}
                        >
                          ← Back
                        </button>
                      )}
                      {col.id !== 'done' && (
                        <button
                          className="btn btn-outline-primary btn-sm flex-fill"
                          style={{ fontSize: '11px' }}
                          onClick={() => moveTask(task.id, col.id, col.id === 'todo' ? 'inprogress' : 'done')}
                        >
                          Forward →
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {col.tasks.length === 0 && (
                  <div className="text-center text-muted small py-5">
                    No tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
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
                    onChange={(e) => setNewPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Assignee</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. John"
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