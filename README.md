# iNotebook-Live

A **MERN stack** (MongoDB, Express.js, React.js, Node.js) application for managing your notes online. iNotebook-Live lets you securely add, update, and delete your personal notes from anywhere, on any device.

## Features

- User authentication (JWT based)
- Add, edit, and delete notes
- Responsive and modern UI
- RESTful API backend
- Separate folders for frontend and backend
- Secure data handling

---

## Project Structure

```
iNotebook-Live/
├── backend/     # Express + Node.js API
├── frontend/    # React.js client
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ahmed0Raza/iNotebook-Live.git
cd iNotebook-Live
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/` with the following variables:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

#### Start the backend server:

```bash
npm start
```

The backend runs at [http://localhost:5000](http://localhost:5000).

---

### 3. Frontend Setup

Open a new terminal window/tab:

```bash
cd frontend
npm install
```

#### Start the React frontend:

```bash
npm start
```

The frontend runs at [http://localhost:3000](http://localhost:3000).

---

## Usage

1. Register for an account or log in.
2. Add, edit, or delete notes securely.
3. Your notes are synced with the backend in real-time.

---

## Scripts

### Backend

- `npm start` - Runs the backend server
- `npm run dev` - Runs backend with nodemon (auto-reloads on changes)

### Frontend

- `npm start` - Runs the React development server

---

## Tech Stack

- **Frontend:** React.js, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Author

**Ahmed Raza**  
[GitHub](https://github.com/Ahmed0Raza)
