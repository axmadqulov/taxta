const MONTHS = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];
export const WEEKDAYS = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];

export function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const todayISO = () => toISO(new Date());

export function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

export function formatDue(iso) {
  if (!iso) return "";
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

export function isOverdue(task) {
  return Boolean(task.due) && task.status !== "done" && task.due < todayISO();
}

export function sameDay(ts, date) {
  return Boolean(ts) && toISO(new Date(ts)) === toISO(date);
}
