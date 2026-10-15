import { addDays, toISO } from "../utils/date";

export function makeSeed() {
  const now = Date.now();
  const day = 86400000;
  const p1 = crypto.randomUUID();
  const p2 = crypto.randomUUID();
  const t = (projectId, title, status, priority, dueOffset, description = "", doneAgo = 1) => ({
    id: crypto.randomUUID(),
    projectId,
    title,
    description,
    status,
    priority,
    due: dueOffset === null ? "" : toISO(addDays(dueOffset)),
    createdAt: now - 8 * day,
    doneAt: status === "done" ? now - doneAgo * day : null,
  });

  return {
    activeProjectId: p1,
    projects: [
      { id: p1, name: "Mobil ilova", color: "#2b4eff" },
      { id: p2, name: "Veb-sayt yangilash", color: "#1fb58f" },
    ],
    tasks: [
      t(p1, "Kirish ekrani dizayni", "done", "high", -3, "Figma maketini tasdiqlash", 5),
      t(p1, "Autentifikatsiya API", "done", "high", -1, "", 2),
      t(p1, "Push-xabarnomalar", "doing", "mid", 2, "Firebase bilan ulash"),
      t(p1, "Profil sahifasi", "doing", "mid", 4),
      t(p1, "Onboarding animatsiyasi", "review", "low", 5),
      t(p1, "Oflayn rejim", "todo", "high", -1, "Keshlash strategiyasini tanlash"),
      t(p1, "Play Market uchun skrinshotlar", "todo", "low", 9),
      t(p2, "Yangi bosh sahifa", "review", "high", 1),
      t(p2, "Tezlikni optimallashtirish", "doing", "mid", 3, "Rasmlarni WebP ga o'tkazish"),
      t(p2, "SEO sarlavhalari", "done", "low", -4, "", 3),
      t(p2, "Blog bo'limi", "todo", "mid", 7),
      t(p2, "Aloqa shakli", "done", "mid", -2, "", 0),
    ],
  };
}
