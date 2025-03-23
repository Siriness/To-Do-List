import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { loadTasks, saveTasks } from "../utils/storage";
import "../styles/TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const addTask = (task) => {
    const newTask = { ...task, id: crypto.randomUUID(), completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="task-list">
      <h1>To-Do List</h1>
      <TaskForm onSubmit={addTask} />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={editTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
