import express from "express";
import noteModel from "../models/Note.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", async (req, res) => {
  try {
    const notes = await noteModel.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new noteModel({ user: req.userId, title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await noteModel.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await noteModel.findOneAndDelete({ _id: id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

export default router;
