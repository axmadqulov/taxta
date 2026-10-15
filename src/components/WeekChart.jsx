import { WEEKDAYS } from "../utils/date";

// Oxirgi 7 kunda bajarilgan vazifalar — kutubxonasiz SVG ustunli diagramma
export default function WeekChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const W = 420;
  const H = 180;
  const pad = 28;
  const slot = (W - pad * 2) / data.length;
  const bar = slot * 0.56;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Oxirgi 7 kunda bajarilgan vazifalar" className="chart">
      <line x1={pad} x2={W - pad} y1={H - 30} y2={H - 30} stroke="var(--line)" />
      {data.map((d, i) => {
        const h = (d.count / max) * (H - 70);
        const x = pad + i * slot + (slot - bar) / 2;
        const y = H - 30 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bar} height={Math.max(h, 2)} rx="4" fill={d.today ? "var(--accent)" : "var(--ink-soft)"} opacity={d.count ? 1 : 0.25} />
            {d.count > 0 && (
              <text x={x + bar / 2} y={y - 6} textAnchor="middle" className="chart-num">{d.count}</text>
            )}
            <text x={x + bar / 2} y={H - 10} textAnchor="middle" className="chart-label">{WEEKDAYS[d.day]}</text>
          </g>
        );
      })}
    </svg>
  );
}
