import { useEffect, useRef, useState } from "react";
import { Trash2, X } from "lucide-react";
import { PRIORITIES, STATUSES } from "../data/constants";

export default function TaskModal({ task, defaultStatus = "todo", onSave, onDelete, onClose }) {
  const isEdit = Boolean(task?.id);
  const [form, setForm] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    priority: task?.priority ?? "mid",
    status: task?.status ?? defaultStatus,
    due: task?.due ?? "",
  });
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...(isEdit ? { id: task.id } : {}), ...form, title: form.title.trim() });
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} role="dialog" aria-modal="true" aria-label="Vazifa">
        <header className="modal-head">
          <h2>{isEdit ? "Vazifani tahrirlash" : "Yangi vazifa"}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </header>

        <label>
          Nomi
          <input ref={titleRef} value={form.title} onChange={set("title")} placeholder="Masalan: Hisobotni tayyorlash" required />
        </label>

        <label>
          Tavsif
          <textarea rows={3} value={form.description} onChange={set("description")} />
        </label>

        <div className="grid-3">
          <label>
            Holati
            <select value={form.status} onChange={set("status")}>
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
          <label>
            Muhimligi
            <select value={form.priority} onChange={set("priority")}>
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </label>
          <label>
            Muddat
            <input type="date" value={form.due} onChange={set("due")} />
          </label>
        </div>

        <footer className="modal-foot">
          {isEdit && (
            <button type="button" className="btn btn-danger" onClick={() => onDelete(task.id)}>
              <Trash2 size={16} /> O'chirish
            </button>
          )}
          <span className="spacer" />
          <button type="button" className="btn" onClick={onClose}>Bekor qilish</button>
          <button type="submit" className="btn btn-primary">Saqlash</button>
        </footer>
      </form>
    </div>
  );
}
