import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { PROJECT_COLORS } from "../data/constants";

export default function Projects() {
  const { state, dispatch } = useStore();
  const [name, setName] = useState("");
  const [color, setColor] = useState(PROJECT_COLORS[0]);

  function add(e) {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({ type: "ADD_PROJECT", name: name.trim(), color });
    setName("");
  }

  function remove(p) {
    if (state.projects.length <= 1) return;
    if (window.confirm(`"${p.name}" va uning barcha vazifalari o'chirilsinmi?`)) {
      dispatch({ type: "DELETE_PROJECT", id: p.id });
    }
  }

  return (
    <>
      <header className="page-head">
        <h1>Loyihalar</h1>
        <p className="muted">Har bir loyihaning o'z taxtasi bor</p>
      </header>

      <form className="panel add-project" onSubmit={add}>
        <label className="grow">
          Yangi loyiha nomi
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Masalan: Diplom ishi" />
        </label>
        <div className="swatches" role="radiogroup" aria-label="Rang">
          {PROJECT_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={c === color}
              aria-label={c}
              className={"swatch" + (c === color ? " is-on" : "")}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <button className="btn btn-primary" type="submit">Loyiha qo'shish</button>
      </form>

      <ul className="project-cards">
        {state.projects.map((p) => {
          const list = state.tasks.filter((t) => t.projectId === p.id);
          const done = list.filter((t) => t.status === "done").length;
          const pct = list.length ? Math.round((done / list.length) * 100) : 0;
          return (
            <li key={p.id} className="panel">
              <div className="row-between">
                <h2><span className="dot dot-lg" style={{ background: p.color }} />{p.name}</h2>
                <button
                  className="icon-btn"
                  aria-label={`${p.name} loyihasini o'chirish`}
                  disabled={state.projects.length <= 1}
                  onClick={() => remove(p)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="muted">{list.length} ta vazifa · {done} ta bajarilgan</p>
              <div className="bar"><div style={{ width: pct + "%", background: p.color }} /></div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
