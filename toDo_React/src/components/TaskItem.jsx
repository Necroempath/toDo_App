const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="task-item">
      <div className="task-content">
        <h3>{task.title}</h3>
        <span className="task-date">{task.creationDate}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem