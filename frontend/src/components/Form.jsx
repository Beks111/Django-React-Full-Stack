import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const validateForm = () => {
        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        if (username.length < 3) {
            setError("Username must be at least 3 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail ||
                error.response?.data?.username ||
                error.response?.data?.password ||
                "An error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                {error && <p className="form-error">{error}</p>}
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    placeholder="Username"
                    required
                    disabled={loading}
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    disabled={loading}
                />
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : name}
                </button>
                {method === "login" ? (
                    <p className="form-link">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                ) : (
                    <p className="form-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                )}
            </form>
        </div>
    );
}

export default Form;