import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("...");

  useEffect(() => {
    fetch(`${API}/health`).then(r => r.json()).then(d => setStatus(d.status || "unknown")).catch(() => setStatus("down"));
    fetch(`${API}/notes`).then(r => r.json()).then(d => setNotes(d.data || [])).catch(() => setNotes([]));
  }, []);

  async function addNote(e) {
    e.preventDefault();
    const key = prompt("API key (x-api-key):");
    const r = await fetch(`${API}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key || "" },
      body: JSON.stringify({ text })
    });
    if (r.ok) {
      const d = await r.json();
      setNotes(n => [...n, d.data]);
      setText("");
    } else {
      alert("Failed (check API key)");
    }
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "2rem auto", padding: "1rem" }}>
      <h1>Reflektions-demo</h1>
      <p><strong>API health:</strong> {status}</p>

      <form onSubmit={addNote} style={{ margin: "1rem 0" }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Skriv en anteckning..." style={{ padding: 8, width: "70%" }} />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }}>Lägg till</button>
      </form>

      <ul>
        {notes.map(n => <li key={n.id}>#{n.id} – {n.text}</li>)}
      </ul>
    </div>
  );
}
