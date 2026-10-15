import { useState } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

export default function Column({ status, tasks, onMove, onOpen, onAdd }) {
  const [over, setOver] = useState(false);

  return (
    <section
      className={"column" + (over ? " is-over" : "")}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onMove(id, status.id);
      }}
    >
      <header className="column-head">
        <h3>
          {status.label} <span className="count">{tasks.length}</span>
        </h3>
        <button className="icon-btn" aria-label={`${status.label} ustuniga vazifa qo'shish`} onClick={() => onAdd(status.id)}>
          <Plus size={18} />
        </button>
      </header>

      <div className="column-body">
        {tasks.length === 0 && <p className="empty">Vazifani bu yerga sudrab keling</p>}
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
