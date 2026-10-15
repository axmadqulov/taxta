import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { PRIORITIES, STATUSES } from "../data/constants";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";

export default function Board() {
  const { state, dispatch } = useStore();
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("all");
  const [modal, setModal] = useState(null); // { task?, status? }

  const project = state.projects.find((p) => p.id === state.activeProjectId);

  const tasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.tasks.filter(
      (t) =>
        t.projectId === state.activeProjectId &&
        (priority === "all" || t.priority === priority) &&
        (!q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    );
  }, [state.tasks, state.activeProjectId, query, priority]);

  function save(data) {
    if (data.id) dispatch({ type: "UPDATE_TASK", task: data });
    else dispatch({ type: "ADD_TASK", task: { ...data, projectId: state.activeProjectId } });
    setModal(null);
  }

  function remove(id) {
    if (window.confirm("Vazifa o'chirilsinmi?")) {
      dispatch({ type: "DELETE_TASK", id });
      setModal(null);
    }
  }

  return (
    <>
      <header className="page-head row-between">
        <div>
          <h1>
            <span className="dot dot-lg" style={{ background: project?.color }} />
            {project?.name}
          </h1>
          <p className="muted">{tasks.length} ta vazifa</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({ status: "todo" })}>
          <Plus size={16} /> Yangi vazifa
        </button>
      </header>

      <div className="toolbar">
        <label className="search">
          <Search size={16} aria-hidden />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Vazifa qidirish" aria-label="Vazifa qidirish" />
        </label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Muhimlik bo'yicha filtr">
          <option value="all">Barcha muhimlik</option>
          {PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="board">
        {STATUSES.map((s) => (
          <Column
            key={s.id}
            status={s}
            tasks={tasks.filter((t) => t.status === s.id)}
            onMove={(id, status) => dispatch({ type: "MOVE_TASK", id, status })}
            onOpen={(task) => setModal({ task })}
            onAdd={(status) => setModal({ status })}
          />
        ))}
      </div>

      {modal && (
        <TaskModal
          task={modal.task}
          defaultStatus={modal.status}
          onSave={save}
          onDelete={remove}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
