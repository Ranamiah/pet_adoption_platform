import { Trash2 } from "lucide-react";

export default function TaskItem({ task, index, onToggle, onDelete }) {
  return (
    <li className={task.completed ? "task is-complete" : "task"}>
      <span className="task__number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <label className="check-control">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        />
        <span className="check-control__box" aria-hidden="true" />
      </label>

      <div className="task__content">
        <p>{task.title}</p>
        <span className={task.completed ? "status status--done" : "status"}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <button
        className="icon-button"
        type="button"
        onClick={() => onDelete(task)}
        aria-label={`Delete ${task.title}`}
        title="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
