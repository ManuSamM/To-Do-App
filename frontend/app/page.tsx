"use client";

import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { useAuth } from "../utils/auth";
import api from "../utils/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { requireAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    requireAuth();
  });

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { title: newTask });
      setNewTask("");
      setRefreshTrigger((prev) => prev + 1); // Trigger a refresh of the task list
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button type="submit">Add Task</button>
      </form>
      <br />
      <TaskList refreshTrigger={refreshTrigger} />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
