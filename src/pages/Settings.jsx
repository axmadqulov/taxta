import { useRef, useState } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { useStore } from "../store/StoreContext";

export default function Settings() {
  const { state, dispatch } = useStore();
  const fileRef = useRef(null);
  const [msg, setMsg] = useState("");

  function exportJSON() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "taxta-zaxira.json";
    a.click();
    URL.revokeObjectURL(url);
    setMsg("Zaxira fayli yuklab olindi.");
  }

  function importJSON(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.projects) || !Array.isArray(data.tasks) || !data.projects.length) {
          throw new Error("format");
        }
        dispatch({
          type: "IMPORT",
          data: { ...data, activeProjectId: data.activeProjectId ?? data.projects[0].id },
        });
        setMsg("Ma'lumotlar tiklandi.");
      } catch {
        setMsg("Fayl noto'g'ri. Taxta'dan yuklab olingan JSON faylni tanlang.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function reset() {
    if (window.confirm("Barcha ma'lumotlar o'chirilib, namunaviy ma'lumotlar qaytariladi. Davom etasizmi?")) {
      dispatch({ type: "RESET" });
      setMsg("Namunaviy ma'lumotlar qaytarildi.");
    }
  }

  return (
    <>
      <header className="page-head">
        <h1>Sozlamalar</h1>
        <p className="muted">Ma'lumotlar brauzeringizda saqlanadi</p>
      </header>

      <section className="panel settings">
        <div className="row-between">
          <div>
            <h2>Zaxira nusxa</h2>
            <p className="muted">Barcha loyiha va vazifalarni JSON fayl sifatida saqlang.</p>
          </div>
          <button className="btn" onClick={exportJSON}><Download size={16} /> Yuklab olish</button>
        </div>

        <div className="row-between">
          <div>
            <h2>Zaxiradan tiklash</h2>
            <p className="muted">Joriy ma'lumotlar fayldagilar bilan almashtiriladi.</p>
          </div>
          <button className="btn" onClick={() => fileRef.current?.click()}><Upload size={16} /> Fayl tanlash</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={importJSON} />
        </div>

        <div className="row-between">
          <div>
            <h2>Boshidan boshlash</h2>
            <p className="muted">Namunaviy ma'lumotlarni qaytaradi.</p>
          </div>
          <button className="btn btn-danger" onClick={reset}><RotateCcw size={16} /> Tiklash</button>
        </div>

        {msg && <p className="notice" role="status">{msg}</p>}
      </section>
    </>
  );
}
