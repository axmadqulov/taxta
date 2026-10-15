import { CalendarDays } from "lucide-react";
import { PRIORITIES } from "../data/constants";
import { formatDue, isOverdue } from "../utils/date";

export default function TaskCard({ task, onOpen }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const overdue = isOverdue(task);

  return (
    <article
      className={"card prio-" + task.priority}
      draggable
      tabIndex={0}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={() => onOpen(task)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(task)}
    >
      <h4>{task.title}</h4>
      {task.description && <p className="card-desc">{task.description}</p>}
      <div className="card-meta">
        <span className={"tag tag-" + task.priority}>{priority?.label}</span>
        {task.due && (
          <span className={"due" + (overdue ? " is-late" : "")}>
            <CalendarDays size={14} aria-hidden />
            {formatDue(task.due)}
            {overdue && " · muddati o'tgan"}
          </span>
        )}
      </div>
    </article>
  );
}
