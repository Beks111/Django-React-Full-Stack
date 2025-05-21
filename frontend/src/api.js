import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Получить все заметки (с поддержкой фильтрации)
export const fetchNotes = (filters = {}) => {
  return api.get("/api/notes/", { params: filters });
};

// Удалить заметку
export const deleteNote = (id) => {
  return api.delete(`/api/notes/${id}/`);
};

// Обновить статус is_completed
export const toggleNoteComplete = (id, is_completed) => {
  return api.patch(`/api/notes/${id}/`, { is_completed });
};

// Обновить заголовок и содержание (редактирование)
export const updateNote = (id, data) => {
  return api.patch(`/api/notes/${id}/`, data); // Используем PATCH вместо PUT для частичного обновления
};

// Создать заметку
export const createNote = (data) => {
  return api.post("/api/notes/", data);
};

export default api;