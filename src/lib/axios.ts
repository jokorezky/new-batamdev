import axios from "axios";

// Mengambil URL API dari environment variables
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Menggunakan NEXT_PUBLIC_API_URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
