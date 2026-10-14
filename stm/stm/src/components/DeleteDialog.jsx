import { useEffect, useRef } from "react";
import { Trash2, X } from "lucide-react";

export default function DeleteDialog({ task, onCancel, onConfirm }) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  if (!task) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog__close" type="button" onClick={onCancel} aria-label="Close dialog">
          <X size={19} />
        </button>
        <span className="dialog__icon" aria-hidden="true">
          <Trash2 size={24} />
        </span>
        <h2 id="delete-dialog-title">Delete this task?</h2>
        <p>
          <strong>{task.title}</strong> will be permanently removed from your list.
        </p>
        <div className="dialog__actions">
          <button ref={cancelButtonRef} className="button button--soft" type="button" onClick={onCancel}>
            Keep task
          </button>
          <button className="button button--danger" type="button" onClick={() => onConfirm(task.id)}>
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}
