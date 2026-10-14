import EmptyState from "./EmptyState";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, filter, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
