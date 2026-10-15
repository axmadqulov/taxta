import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import WeekChart from "../components/WeekChart";
import { addDays, formatDue, isOverdue, sameDay } from "../utils/date";

export default function Dashboard() {
  const { state } = useStore();
  const { tasks, projects } = state;

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.status === "done").length;
    return {
      total: tasks.length,
      active: tasks.filter((t) => t.status === "doing" || t.status === "review").length,
      done,
      late: tasks.filter(isOverdue).length,
    };
  }, [tasks]);

  const week = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const date = addDays(i - 6);
        return {
          day: date.getDay(),
          today: i === 6,
          count: tasks.filter((t) => sameDay(t.doneAt, date)).length,
        };
      }),
    [tasks]
  );

  const upcoming = useMemo(
    () =>
      tasks
        .filter((t) => t.due && t.status !== "done")
        .sort((a, b) => a.due.localeCompare(b.due))
        .slice(0, 6),
    [tasks]
  );

  const projectName = (id) => projects.find((p) => p.id === id);

  return (
    <>
      <header className="page-head">
        <h1>Umumiy ko'rinish</h1>
        <p className="muted">Barcha loyihalar bo'yicha holat</p>
      </header>

      <div className="stats">
        <div className="stat"><span>Jami vazifalar</span><strong>{stats.total}</strong></div>
        <div className="stat"><span>Ishlanmoqda</span><strong>{stats.active}</strong></div>
        <div className="stat"><span>Bajarilgan</span><strong>{stats.done}</strong></div>
        <div className={"stat" + (stats.late ? " is-warn" : "")}><span>Muddati o'tgan</span><strong>{stats.late}</strong></div>
      </div>

      <div className="panels">
        <section className="panel">
          <h2>Bu hafta bajarilganlar</h2>
          <WeekChart data={week} />
        </section>

        <section className="panel">
          <h2>Loyihalar bo'yicha jarayon</h2>
          <ul className="progress-list">
            {projects.map((p) => {
              const list = tasks.filter((t) => t.projectId === p.id);
              const done = list.filter((t) => t.status === "done").length;
              const pct = list.length ? Math.round((done / list.length) * 100) : 0;
              return (
                <li key={p.id}>
                  <div className="row-between">
                    <span>{p.name}</span>
                    <span className="muted">{done}/{list.length} · {pct}%</span>
                  </div>
                  <div className="bar"><div style={{ width: pct + "%", background: p.color }} /></div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="panel panel-wide">
          <div className="row-between">
            <h2>Yaqin muddatlar</h2>
            <Link to="/board" className="link">Taxtaga o'tish</Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="empty">Muddatli vazifa yo'q. Taxtada vazifaga muddat qo'shing.</p>
          ) : (
            <ul className="deadline-list">
              {upcoming.map((t) => {
                const p = projectName(t.projectId);
                return (
                  <li key={t.id}>
                    <span className="dot" style={{ background: p?.color }} />
                    <span className="grow">{t.title}</span>
                    <span className="muted">{p?.name}</span>
                    <span className={"due" + (isOverdue(t) ? " is-late" : "")}>{formatDue(t.due)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
