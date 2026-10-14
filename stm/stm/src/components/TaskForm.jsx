import { useId, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputId = useId();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a task before adding it.");
      return;
    }

    onAddTask(trimmedTitle);
    setTitle("");
    setError("");
  }

  function handleChange(event) {
    setTitle(event.target.value);
    if (error) setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__heading">
        <span className="eyebrow">
          <Plus size={14} strokeWidth={2.5} />
          New task
        </span>
        <h2>What needs your attention?</h2>
      </div>

      <div className="task-form__controls">
        <div className="field">
          <label htmlFor={inputId} className="sr-only">
            Task title
          </label>
          <input
            id={inputId}
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="e.g. Review chapter five notes"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            autoComplete="off"
          />
          {error && (
            <p className="field__error" id={`${inputId}-error`} role="alert">
              {error}
            </p>
          )}
        </div>
        <button className="button button--primary" type="submit">
          Add task
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}
