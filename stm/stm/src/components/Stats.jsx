import { CircleCheck, ListTodo, TimerReset } from "lucide-react";

const statItems = [
  { key: "total", label: "Total tasks", Icon: ListTodo },
  { key: "completed", label: "Completed", Icon: CircleCheck },
  { key: "remaining", label: "Remaining", Icon: TimerReset },
];

export default function Stats({ total, completed, remaining }) {
  const values = { total, completed, remaining };

  return (
    <div className="stats" aria-label="Task statistics">
      {statItems.map(({ key, label, Icon }) => (
        <div className={`stat stat--${key}`} key={key}>
          <span className="stat__icon" aria-hidden="true">
            <Icon size={19} strokeWidth={2.2} />
          </span>
          <span>
            <strong>{values[key]}</strong>
            <small>{label}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
