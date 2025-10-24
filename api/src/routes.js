import express from "express";

export function createRouter({ log, apiKey }) {
  const router = express.Router();
  const notes = [];

  router.get("/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  router.get("/notes", (_req, res) => {
    res.json({ data: notes });
  });

  router.post("/notes", (req, res) => {
    const key = req.header("x-api-key");
    if (!apiKey || key !== apiKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid payload" });
    }
    const note = { id: notes.length + 1, text, ts: Date.now() };
    notes.push(note);
    log.info({ noteId: note.id }, "note_created");
    res.status(201).json({ data: note });
  });

  return router;
}
