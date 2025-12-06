import { useState } from "react";

const TaskInput = ({ onAdd, warning }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    onAdd(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="task-input-container">
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a new task..."
          className="task-input"
        />
        <button onClick={handleAdd} className="add-btn">
          Add Task
        </button>
      </div>
      {warning && <div className="warning">{warning}</div>}
    </div>
  );
};
export default TaskInput;
