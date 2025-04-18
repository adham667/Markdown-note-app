# 📝 Markdown Note-taking App

A full-stack  web application inspired from (https://roadmap.sh/projects/markdown-note-taking-app) that allows users to upload, view, and save Markdown notes. The app also provides a rendered HTML preview and optional grammar checking. Built using **NestJS** for the backend and **React + Vite** for the frontend.

## 🚀 Features

- 📁 Upload Markdown (`.md`) files
- 📄 Render and preview Markdown as HTML
- 💾 Save uploaded notes to a cloud database
- 📚 View list of previously saved notes
- 🔍 Grammar check for notes using LanguageTool API
- ❌ Delete previously saved notes

## 🛠️ Tech Stack

### Backend (NestJS)
- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/) (with MongoDB Atlas)
- [marked](https://www.npmjs.com/package/marked) – Markdown to HTML converter
- [Axios](https://www.npmjs.com/package/axios) – To consume LanguageTool API
- [multer](https://www.npmjs.com/package/multer) – File uploads

### Frontend (React + Vite)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)



## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/markdown-notes-app.git
cd markdown-notes-app
```

### 2. Set up the Backend

```bash
cd /markdown-notes-api
npm install
```

Create a `.env` file:

```env
MONGODB_URI=mongodb+srv://<your-mongo-uri>
PORT=3000
```

Run the server:
```bash
npm run start:dev
```

### 3. Set up the Frontend

```bash
cd ../md-notes
npm install
npm run dev
```

The frontend will be running at `http://localhost:5173` by default.

## 📤 API Endpoints

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| POST   | `/notes/upload`  | Upload and save a markdown file      |
| GET    | `/notes`         | Get all saved notes                  |
| DELETE | `/notes/`        | Delete a saved note by ID            |
| POST   | `/check`         | Check grammar of markdown text       |

## 🧠 Future Improvements

- User authentication
- Markdown editing within the browser
- Note categorization/tags
- Local grammar corrections
---

### 💬 Feedback

If you have any feedback or feature requests, feel free to open an issue or submit a PR!
