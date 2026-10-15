import { NavLink } from "react-router-dom";
import { KanbanSquare, LayoutDashboard, Folder, Settings } from "lucide-react";
import { useStore } from "../store/StoreContext";

const links = [
  { to: "/", label: "Umumiy ko'rinish", icon: LayoutDashboard },
  { to: "/board", label: "Taxta", icon: KanbanSquare },
  { to: "/projects", label: "Loyihalar", icon: Folder },
  { to: "/settings", label: "Sozlamalar", icon: Settings },
];

export default function Sidebar() {
  const { state, dispatch } = useStore();

  return (
    <aside className="sidebar">
      <div className="brand">Taxta</div>

      <nav className="nav" aria-label="Asosiy menyu">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className="nav-link">
            <Icon size={18} aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="side-section">
        <p className="side-title">Faol loyiha</p>
        <ul className="project-list">
          {state.projects.map((p) => (
            <li key={p.id}>
              <button
                className={"project-pill" + (p.id === state.activeProjectId ? " is-active" : "")}
                onClick={() => dispatch({ type: "SET_ACTIVE", id: p.id })}
              >
                <span className="dot" style={{ background: p.color }} />
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
