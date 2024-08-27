import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import api from '../utils/api';

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  refreshTrigger: number;
}

const TaskList: React.FC<TaskListProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleComplete = async (id: string, completed: boolean) => {
    try {
      await api.patch(`/tasks/${id}`, { completed: !completed, });
      fetchTasks();
    } catch (error) {
      console.error('Error completing task', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;