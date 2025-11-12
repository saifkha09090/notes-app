import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";

const NotesDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);


  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
    setFilteredNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = () => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.patch(`/notes/${editing}`, form);
      setEditing(null);
    } else {
      await API.post("/notes", form);
    }
    setForm({ title: "", content: "" });
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  const startEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditing(note._id);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} min-h-screen sm:p-10 sm:pt-5 transition-colors`}>
      
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        logout={logout}
      />

      <form
        onSubmit={handleSubmit}
        className={`text-center mb-6 p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <input
          type="text"
          name="title"
          placeholder="Note title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className={`w-[85%] mb-2 p-2 rounded-md border text-sm focus:outline-none ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
        <textarea
          name="content"
          placeholder="Note content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          className={`w-[85%] mb-2 p-2 rounded-md border text-sm h-24 resize-none focus:outline-none ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
        <button
          type="submit"
          className="w-[20%] py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition"
        >
          {editing ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
             <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-lg shadow-md transition-transform hover:scale-[1.02] ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
            <div
              key={note._id}
              className={`p-4 rounded-lg shadow-md transition-transform hover:scale-[1.02] ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="text-md font-semibold mb-2 truncate">{note.title}</h3>
              <p className="text-sm mb-3 line-clamp-3">{note.content}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(note)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm transition"
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
             </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No notes found
          </p>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesDashboard;
