import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { makeSeed } from "../data/seed";

const KEY = "taxta:v1";
const Ctx = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* buzilgan ma'lumot — boshidan boshlaymiz */
  }
  return makeSeed();
}

// status o'zgarganda doneAt ni to'g'ri yuritadi
function withStatus(task, status) {
  if (task.status === status) return task;
  return { ...task, status, doneAt: status === "done" ? Date.now() : null };
}

function reducer(state, a) {
  switch (a.type) {
    case "ADD_TASK": {
      const status = a.task.status || "todo";
      const task = {
        description: "",
        priority: "mid",
        due: "",
        ...a.task,
        id: crypto.randomUUID(),
        status,
        createdAt: Date.now(),
        doneAt: status === "done" ? Date.now() : null,
      };
      return { ...state, tasks: [task, ...state.tasks] };
    }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id !== a.task.id) return t;
          const { status, ...rest } = a.task;
          return withStatus({ ...t, ...rest }, status ?? t.status);
        }),
      };
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === a.id ? withStatus(t, a.status) : t)),
      };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== a.id) };
    case "ADD_PROJECT": {
      const project = { id: crypto.randomUUID(), name: a.name, color: a.color };
      return { ...state, projects: [...state.projects, project], activeProjectId: project.id };
    }
    case "DELETE_PROJECT": {
      if (state.projects.length <= 1) return state;
      const projects = state.projects.filter((p) => p.id !== a.id);
      return {
        ...state,
        projects,
        tasks: state.tasks.filter((t) => t.projectId !== a.id),
        activeProjectId: state.activeProjectId === a.id ? projects[0].id : state.activeProjectId,
      };
    }
    case "SET_ACTIVE":
      return { ...state, activeProjectId: a.id };
    case "IMPORT":
      return a.data;
    case "RESET":
      return makeSeed();
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* xotira to'lgan bo'lishi mumkin */
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore faqat StoreProvider ichida ishlaydi");
  return ctx;
}
