import { useState } from "react";
import "../styles/TaskForm.css";

const TaskForm = ({
  onSubmit,
  initialTask = { name: "", description: "" },
}) => {
  const [task, setTask] = useState(initialTask);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.description) {
      setError("Both fields are required!");
      return;
    }
    onSubmit(task);
    setTask({ name: "", description: "" }); // Reset form
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={task.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">
        {initialTask.id ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
