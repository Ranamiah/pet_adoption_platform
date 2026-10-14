import { CheckCheck, ClipboardList } from "lucide-react";

export default function EmptyState({ filter }) {
  const isAll = filter === "all";

  return (
    <div className="empty-state">
      <span className="empty-state__art" aria-hidden="true">
        {isAll ? <ClipboardList size={34} /> : <CheckCheck size={34} />}
      </span>
      <h3>{isAll ? "No tasks available" : `No ${filter} tasks`}</h3>
      <p>
        {isAll
          ? "Add your first task above and take one small step forward."
          : `You're all clear - there are no ${filter} tasks right now.`}
      </p>
    </div>
  );
}
