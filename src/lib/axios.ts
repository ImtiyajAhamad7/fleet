import axios from "axios"

export const qaxios = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})