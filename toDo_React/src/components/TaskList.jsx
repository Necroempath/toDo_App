import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet. Add one to get started!</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default TaskList