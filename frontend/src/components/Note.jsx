import React, { useState, useCallback } from "react";
import "../styles/Note.css";
import { format } from "date-fns";

const Note = ({ note, onDelete, onToggleComplete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); // Для ошибок

    const formattedCreatedDate = format(new Date(note.created_at), "MMM d, yyyy");
    const formattedUpdatedDate = format(new Date(note.updated_at), "MMM d, yyyy");

    const handleCheckboxChange = useCallback(() => {
        setIsLoading(true);
        setError("");
        onToggleComplete(note.id, !note.is_completed)
            .catch(() => setError("Failed to update status."))
            .finally(() => setIsLoading(false));
    }, [note.id, note.is_completed, onToggleComplete]);

    const handleEditSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setIsLoading(true);
            setError("");
            onEdit(note.id, { title: editedTitle, content: editedContent })
                .catch(() => setError("Failed to update note."))
                .finally(() => {
                    setIsLoading(false);
                    setIsEditing(false);
                });
        },
        [note.id, editedTitle, editedContent, onEdit]
    );

    const handleDelete = useCallback(() => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            setIsLoading(true);
            setError("");
            onDelete(note.id)
                .catch(() => setError("Failed to delete note."))
                .finally(() => setIsLoading(false));
        }
    }, [note.id, onDelete]);

    return (
        <div className={`note-container ${note.is_completed ? "completed" : ""} ${isLoading ? "loading" : ""}`}>
            {error && <p className="note-error">{error}</p>}
            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="note-edit-form">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="note-edit-input"
                        placeholder="Title"
                        required
                        disabled={isLoading}
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="note-edit-textarea"
                        placeholder="Content"
                        required
                        disabled={isLoading}
                    />
                    <div className="note-edit-buttons">
                        <button type="submit" className="save-button" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="cancel-button"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="note-header">
                        <input
                            type="checkbox"
                            checked={note.is_completed}
                            onChange={handleCheckboxChange}
                            className="note-checkbox"
                            disabled={isLoading}
                        />
                        <p className="note-title">{note.title}</p>
                    </div>
                    <p className="note-content">{note.content}</p>
                    <p className="note-date">
                        Created: {formattedCreatedDate} | Updated: {formattedUpdatedDate}
                    </p>
                    <div className="note-actions">
                        <button
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                            disabled={isLoading}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-button"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(Note);