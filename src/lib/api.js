import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 15000,
});

// Attach Authorization and content-type handling
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${u.token}`;
      }
    }
  } catch {}
  if (config.data instanceof FormData) {
    if (config.headers) delete config.headers["Content-Type"]; // let browser set boundary
  } else if (config.data !== undefined) {
    config.headers = config.headers || {};
    config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
  }
  return config;
});

export async function post(path, body, opts = {}) {
  const { data } = await api.post(path, body, opts);
  return data;
}

export async function postForm(path, formData, opts = {}) {
  const { data } = await api.post(path, formData, {
    ...opts,
    headers: { ...(opts.headers || {}), "Content-Type": "multipart/form-data" },
  });
  return data;
}
