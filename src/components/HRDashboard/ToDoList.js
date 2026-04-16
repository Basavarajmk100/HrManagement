import React, { useState } from "react";
import "../../styles/ToDoList.css";

export default function TodoList() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const theme = localStorage.getItem("theme") || "simple";
  const isSimple = theme === "simple";
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (

    <div className

={`todo-panel theme-${theme}`}>

      {/* BACKGROUND EFFECTS */}
      <div className

="bg-canvas">
        {isDark && (
          <>
            <div className

="ambient-orb orb-1"></div>
            <div className

="ambient-orb orb-2"></div>
            <div className

="ambient-orb orb-3"></div>
            <div className

="ambient-orb orb-4"></div>

            <div
              className

="bg-glass-layer"
              style={{
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(100px)"
              }}
            ></div>
          </>
        )}

        {isColorful && (
          <>
            <div className

="ambient-orb orb-1"></div>
            <div className

="ambient-orb orb-2"></div>
            <div className

="ambient-orb orb-3"></div>
            <div className

="ambient-orb orb-4"></div>
            <div className

="bg-glass-layer"></div>
          </>
        )}
      </div>


      <div className

="table-panel theme-light">

        {/* HEADER */}
        <div className

="table-header-row">
          <div>
            <div className

="table-title">To Do List</div>
            <div className

="table-subtitle">
              Manage your daily tasks
            </div>
          </div>
        </div>


        {/* TASK INPUT */}
        <div className

="todo-form">

          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            className

="add-btn"
            style={{
              background: isSimple
                ? "rgba(250,133,185,0.1)"
                : isDark
                ? "rgba(255,255,255,0.1)"
                : "linear-gradient(to right,#FA85B9,#C387C2)",
              color: isSimple ? "#FA85B9" : "#fff"
            }}
            onClick={addTask}
          >
            Add Task
          </button>

        </div>


        {/* TASK TABLE */}
        <div className

="table-wrapper">

          <table className

="styled-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className

="noData">
                    No tasks added
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t.id} className

="table-row">

                    <td>{t.id}</td>

                    <td
                      style={{
                        textDecoration: t.completed ? "line-through" : "none",
                        cursor: "pointer"
                      }}
                      onClick={() => toggleComplete(t.id)}
                    >
                      {t.text}
                    </td>

                    <td>
                      {t.completed ? "Completed" : "Pending"}
                    </td>

                    <td>
                      <button
                        className

="more-action-btn"
                        onClick={() => deleteTask(t.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}