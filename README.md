
# 🚀 CloudOps Dashboard

A modern **Docker container monitoring dashboard** built using **FastAPI**, **React (Vite)**, **TailwindCSS**, and **Docker SDK**.  
It provides real-time metrics such as **CPU usage**, **memory consumption**, and auto-refreshing performance charts — all inside a clean, responsive UI.

---

## ⚙️ Features

- ✅ **Container Management (`/containers`)** Lists all Docker containers with their ID, name, image, and status.

- ✅ **Live Stats Dashboard (`/containers/:id`)** Real-time charts for:
  - CPU usage (%)
  - Memory usage (MB)
  - Memory consumption (%)

- ✅ **FastAPI Backend** - `/api/containers` — List all containers  
  - `/api/stats/{id}` — Real-time metrics using Docker SDK  

- ✅ **Modern Frontend (React + ShadCN UI)** - Animated charts (Recharts)  
  - Fully responsive  
  - Polished DevOps-style layout  

- ✅ **Stress Testing (Optional)** Run CPU/memory-intensive stress containers to demonstrate live monitoring.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, TypeScript, Vite, TailwindCSS, ShadCN UI |
| **Backend** | FastAPI, Python |
| **Docker Integration** | Docker SDK for Python |
| **Charts** | Recharts |
| **Tools** | stress-ng |

---

## 📁 Project Structure

```bash
CloudOps-Dashboard/
 │
 ├── backend/
 │   ├── app/
 │   │   ├── main.py
 │   │   └── routes/
 │   │       └── monitoring.py
 │   ├── requirements.txt
 │   └── Dockerfile
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── pages/
 │   │   ├── components/
 │   │   ├── services/
 │   │   │   └── api.js
 │   │   └── main.tsx
 │   ├── index.html
 │   └── package.json
 │
 ├── run-all.ps1
 ├── shutdown-all.ps1
 └── stress test commands.txt
````

-----

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2️⃣ Start server

```bash
# start the uvicorn server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> **Backend runs at:** `http://localhost:8000`

-----

## 🖥️ Frontend Setup (React + Vite)

### 1️⃣ Install modules

```bash
cd frontend
npm install
```

### 2️⃣ Start dev server

```bash
npm run dev
```

> **Frontend runs at:** `http://localhost:5173`

-----

## 🧪 Stress Testing (Optional)

Run these commands to simulate high load and watch the charts spike:

```bash
# cpu stress test
docker run -d --name stress1 polinux/stress-ng --cpu 4 --vm 1 --vm-bytes 128M --timeout 300

# moderate load
docker run -d --name stress2 polinux/stress-ng --cpu 2 --vm 1 --vm-bytes 128M --timeout 300

# high load
docker run -d --name stress3 polinux/stress-ng --cpu 6 --vm 2 --vm-bytes 128M --timeout 300
```

-----

## 🚀 Deployment

### Dockerized Backend

```bash
cd backend
docker build -t cloudops-backend .

# run container with access to docker socket
docker run --name cloudops-backend -p 8000:8000 --privileged \
  -v /var/run/docker.sock:/var/run/docker.sock cloudops-backend
```

### Frontend Build

```bash
npm run build
```

Deploy the `dist/` folder to:

  - Netlify
  - Vercel
  - GitHub Pages
  - Nginx/Apache

-----

## 📌 Notes

> ⚠️ **Important:** <br> 1. **Docker Desktop** must be running. <br>
> 2\. The Backend requires access to the **Docker Engine socket**. <br>
> 3\. The Frontend automatically connects to `http://localhost:8000`.

-----

## 👨‍💻 Author

**Fragan D'Souza** <br>
📍 3rd year CSE — NMAM Institute of Technology  
🔗 GitHub: [fragan7dsouza](https://github.com/fragan7dsouza)

-----

## 📜 License

This project is open-source and released under the **MIT License**.

```
