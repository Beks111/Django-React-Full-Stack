import { useState, useEffect } from "react";
import { fetchNotes, deleteNote, toggleNoteComplete, createNote, updateNote } from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [notification, setNotification] = useState("");

    useEffect(() => {
        getNotes();
    }, [filterStatus, searchQuery]);

    const getNotes = () => {
        const filters = {};
        if (filterStatus !== "all") {
            filters.is_completed = filterStatus === "completed";
        }
        if (searchQuery) {
            filters.search = searchQuery;
        }

        fetchNotes(filters)
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => {
                setNotification("Error fetching notes.");
            });
    };

    const validateNoteForm = () => {
        if (!title.trim() || !content.trim()) {
            setNotification("Title and content are required.");
            return false;
        }
        if (title.length < 3) {
            setNotification("Title must be at least 3 characters long.");
            return false;
        }
        return true;
    };

    const handleDeleteNote = (id) => {
        deleteNote(id)
            .then((res) => {
                if (res.status === 204) {
                    setNotification("Note deleted successfully!");
                    getNotes();
                } else {
                    setNotification("Failed to delete note.");
                }
            })
            .catch((error) => setNotification("Error deleting note."));
    };

    const handleCreateNote = (e) => {
        e.preventDefault();
        setNotification("");

        if (!validateNoteForm()) return;

        createNote({ content, title })
            .then((res) => {
                if (res.status === 201) {
                    setNotification("Note created successfully!");
                    getNotes();
                    setTitle("");
                    setContent("");
                } else {
                    setNotification("Failed to create note.");
                }
            })
            .catch((err) => setNotification("Error creating note."));
    };

    const handleToggleComplete = (id, is_completed) => {
        toggleNoteComplete(id, is_completed)
            .then(() => {
                setNotification("Task status updated!");
                getNotes();
            })
            .catch((err) => setNotification("Failed to update task status."));
    };

    const handleEditNote = (id, updatedData) => {
        updateNote(id, updatedData)
            .then(() => {
                setNotification("Note updated successfully!");
                getNotes();
            })
            .catch((err) => setNotification("Failed to update note."));
    };

    return (
        <div className="home-container">
            {/* Уведомления */}
            {notification && (
                <div className={`notification ${notification.includes("Error") || notification.includes("Failed") ? "error" : "success"}`}>
                    {notification}
                </div>
            )}

            {/* Фильтрация */}
            <div className="filter-section">
                <div className="filter-status">
                    <label htmlFor="filter-status">Filter by status:</label>
                    <select
                        id="filter-status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="not_completed">Not Completed</option>
                    </select>
                </div>
                <div className="search-bar">
                    <label htmlFor="search">Search:</label>
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search notes..."
                    />
                </div>
            </div>

            {/* Список заметок */}
            <div className="notes-section">
                <h2>Notes</h2>
                {notes.length === 0 ? (
                    <p>No notes found.</p>
                ) : (
                    notes.map((note) => (
                        <Note
                            note={note}
                            onDelete={handleDeleteNote}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEditNote}
                            key={note.id}
                        />
                    ))
                )}
            </div>

            {/* Форма создания заметки */}
            <div className="create-note-section">
                <h2>Create a Note</h2>
                <form onSubmit={handleCreateNote} className="create-note-form">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="create-note-input"
                    />
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="create-note-textarea"
                    />
                    <button type="submit" className="create-note-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;