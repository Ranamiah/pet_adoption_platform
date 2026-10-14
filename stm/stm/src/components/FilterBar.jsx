const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export default function FilterBar({ activeFilter, counts, onFilterChange }) {
  return (
    <div className="filter-bar" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          type="button"
          className={activeFilter === filter.value ? "filter is-active" : "filter"}
          aria-pressed={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
          key={filter.value}
        >
          {filter.label}
          <span>{counts[filter.value]}</span>
        </button>
      ))}
    </div>
  );
}
