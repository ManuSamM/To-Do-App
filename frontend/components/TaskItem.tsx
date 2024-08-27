import React from "react";

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    completed: boolean;
  };
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task._id, task.completed)}
        style={{ marginRight: "1em" }}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task._id)} style={{ marginLeft: "1em" }}>
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
