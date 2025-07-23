# VoxityChat

VoxityChat is a modern full-stack chat application featuring real-time messaging, video calls, friend requests, and customizable themes. Built with React, Vite, Zustand, DaisyUI, Tailwind CSS, and Stream API on the frontend, and Node.js, Express, MongoDB, and Stream Chat on the backend.

## Features

- User authentication (signup, login, logout)
- Real-time 1:1 chat powered by Stream
- Video calling with Stream Video SDK
- Friend requests and notifications
- User profiles with avatars, bio, and location
- Theme selector with multiple color themes (DaisyUI)
- Responsive and modern UI

## Tech Stack

- **Frontend:** React, Vite, Zustand, DaisyUI, Tailwind CSS, React Query, Stream Chat, Stream Video, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Stream Chat
- **Other:** Axios, Cookie-based authentication

## Project Structure

```
backend/
  src/
    controllers/
    lib/
    middleware/
    models/
    routes/
    server.js
  .env
  package.json

frontend/
  src/
    components/
    constants/
    hooks/
    lib/
    pages/
    store/
    App.jsx
    main.jsx
    index.css
  public/
  .env
  package.json
  vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- [Get Stream API keys](https://getstream.io/)

### Environment Variables

#### Backend (`backend/.env`)

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

#### Frontend (`frontend/.env`)

```
VITE_STREAM_API_KEY=your_stream_api_key
```

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/voxitychat.git
   cd voxitychat
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

   This will install dependencies for both `backend` and `frontend`.

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` in both `backend` and `frontend` folders and fill in your values.

4. **Start the backend server:**

   ```sh
   cd backend
   npm run dev
   ```

5. **Start the frontend dev server:**

   ```sh
   cd frontend
   npm run dev
   ```

6. **Visit the app:**

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

From the root:

- `npm run build` – Installs dependencies and builds the frontend
- `npm run start` – Starts the backend server

From `frontend/`:

- `npm run dev` – Starts the Vite dev server
- `npm run build` – Builds the frontend
- `npm run lint` – Lints the frontend code

From `backend/`:

- `npm run dev` – Starts the backend with nodemon
- `npm run start` – Starts the backend

## License

[MIT](LICENSE)

---

Made with ❤️ using [Stream](https://getstream.io/) and [DaisyUI](https://daisyui.com/)
