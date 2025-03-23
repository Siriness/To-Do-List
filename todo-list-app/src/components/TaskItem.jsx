import { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import "../styles/TaskItem.css";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedTask) => {
    onEdit(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <TaskForm onSubmit={handleEdit} initialTask={task} />
      ) : (
        <>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>
            <button onClick={() => onDelete(task.id)}>
              <FaTrash />
            </button>
            <button onClick={() => onToggleComplete(task.id)}>
              <FaCheck />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
