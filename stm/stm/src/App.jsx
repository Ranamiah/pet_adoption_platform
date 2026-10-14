import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarDays, Sparkles } from "lucide-react";
import Card from "./components/Card";
import DeleteDialog from "./components/DeleteDialog";
import ErrorBoundary from "./components/ErrorBoundary";
import FilterBar from "./components/FilterBar";
import Stats from "./components/Stats";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const STORAGE_KEY = "studyflow-tasks";
const initialTasks = [
  { id: "starter-1", title: "Outline the science presentation", completed: false },
  { id: "starter-2", title: "Submit the algebra worksheet", completed: true },
  { id: "starter-3", title: "Read chapter five before class", completed: false },
];

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  } catch {
    return initialTasks;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((task) => task.completed);
    if (filter === "pending") return tasks.filter((task) => !task.completed);
    return tasks;
  }, [filter, tasks]);

  const counts = {
    all: tasks.length,
    completed: completedCount,
    pending: remainingCount,
  };

  function addTask(title) {
    setTasks((currentTasks) => [
      { id: crypto.randomUUID(), title, completed: false },
      ...currentTasks,
    ]);
    setFilter("all");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  const cancelDelete = useCallback(() => setTaskToDelete(null), []);

  function confirmDelete(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    setTaskToDelete(null);
  }

  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#main-content" className="brand" aria-label="StudyFlow home">
          <span className="brand__mark" aria-hidden="true">
            <BookOpen size={21} />
          </span>
          <span>StudyFlow</span>
        </a>
        <div className="today">
          <CalendarDays size={17} aria-hidden="true" />
          <span>{today}</span>
        </div>
      </header>

      <main id="main-content">
        <section className="hero">
          <div className="hero__copy">
            <span className="eyebrow">
              <Sparkles size={14} />
              Student task manager
            </span>
            <h1>Make space for what <em>matters.</em></h1>
            <p>
              Turn a busy school day into a clear plan. Add your tasks, track your progress,
              and finish strong.
            </p>
          </div>
          <Stats total={tasks.length} completed={completedCount} remaining={remainingCount} />
        </section>

        <Card className="composer-card">
          <TaskForm onAddTask={addTask} />
        </Card>

        {storageError && (
          <p className="storage-notice" role="status">
            Changes work in this session, but your browser could not save them for later.
          </p>
        )}

        <Card className="tasks-card">
          <div className="tasks-card__header">
            <div>
              <span className="eyebrow">Your focus list</span>
              <h2>Today’s tasks</h2>
            </div>
            <FilterBar activeFilter={filter} counts={counts} onFilterChange={setFilter} />
          </div>

          <ErrorBoundary>
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              onToggle={toggleTask}
              onDelete={setTaskToDelete}
            />
          </ErrorBoundary>

          <footer className="tasks-card__footer">
            <span>
              <strong>{remainingCount}</strong> {remainingCount === 1 ? "task" : "tasks"} remaining
            </span>
            <span className="progress-copy">
              {tasks.length === 0
                ? "Ready when you are"
                : completedCount === tasks.length
                  ? "Everything is complete!"
                  : "One step at a time"}
            </span>
          </footer>
        </Card>
      </main>

      <footer className="page-footer">
        <span>StudyFlow</span>
        <p>Small tasks. Steady progress.</p>
      </footer>

      <DeleteDialog task={taskToDelete} onCancel={cancelDelete} onConfirm={confirmDelete} />
    </div>
  );
}
