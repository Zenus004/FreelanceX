# FreelanceX 🚀

**FreelanceX** is a modern, full-stack micro-freelancing platform designed to connect clients with skilled freelancers. Built with the **MERN Stack** (MongoDB, Express, React, Node.js), it features real-time communication, secure authentication, and a comprehensive dashboard for managing jobs, proposals, and milestones.

---

## ✨ Features

### 🎨 UI/UX & Animations
- **Immersive Visuals**: Custom-tailored animations including **Shooting Stars**, **Floating Icons**, and **Interactive Mouse Glow** on landing and auth pages.
- **Responsive Design**: Fully mobile-responsive layouts built with **Tailwind CSS**.
- **Modern Components**: Glassmorphism effects, gradient text, and smooth transitions using **Framer Motion**.

### 🔐 Authentication & Security
- **Secure Login/Register**: JWT-based authentication with Access (15m) and Refresh (7d) tokens.
- **Role-Based Access Control (RBAC)**: Distinct portals for **Clients**, **Freelancers**, and **Admins**.
- **protected Routes**: Ensures sensitive pages are accessible only to authorized users.

### 👨‍💼 Client Portal
- **Dashboard**: Real-time stats on spending, active jobs, and total hires.
- **Post Jobs**: Create detailed job listings with budget ranges and requirements.
- **Manage Proposals**: Review incoming bids, view freelancer profiles, and accept proposals.
- **Milestone Management**: Create, track, and approve project milestones.
- **Escrow System**: Funds are deducted upon milestone creation and held securely until completion.

### 👩‍💻 Freelancer Portal
- **Dashboard**: Visual tracking of earnings, completed jobs, and active contracts.
- **Job Search**: Browse and filter available jobs by category, budget, and skills.
- **Submit Proposals**: Send detailed bids with cover letters and delivery estimates.
- **Profile & Portfolio**: Showcase skills, bio, and a gallery of past work.
- **Wallet**: View current balance and transaction history.

### ⭐ Reputation System
- **Reviews & Ratings**: Clients can leave star ratings and detailed feedback upon job completion.
- **Public Profiles**: View verified stats (Total Earnings, Jobs Completed) on user profiles.
- **Edit Profiles**: Easily update personal or company information via intuitive modals.

### 🛠️ Admin Dashboard
- **System Overview**: View key metrics like Total Users, Active Jobs, and Revenue.
- **Visual Analytics**: Interactive charts (Bar & Pie) powered by **Recharts**.
- **User Management**: Monitor user activity and ban/unban users as needed.

### 💬 Real-Time Collaboration
- **Live Chat**: Socket.io-powered messaging for active engagements.
- **Instant Notifications**: Real-time updates for messages and milestone changes.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Fast, modern UI development.
- **Tailwind CSS**: Utility-first styling for a responsive design.
- **Framer Motion**: Smooth animations and complex transitions.
- **Lucide React**: Beautiful, consistent icons.
- **Recharts**: Data visualization for dashboards.
- **Socket.io-client**: Real-time bidirectional communication.
- **Axios**: Promise-based HTTP client.

### Backend
- **Node.js & Express**: Robust REST API architecture.
- **MongoDB & Mongoose**: Flexible, schema-based data modeling.
- **Socket.io**: Real-time event handling for chat and notifications.
- **JWT (JSON Web Tokens)**: Secure stateless authentication.
- **Bcrypt**: Password hashing for security.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+ recommended)
- **MongoDB** (Local or Atlas connection string)

### 1️⃣ Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` root:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_access_key
    JWT_REFRESH_SECRET=your_super_secret_refresh_key
    CLIENT_URL=http://localhost:5173
    NODE_ENV=development
    ```
4.  (Optional) Seed the database with test data:
    ```bash
    node seed.js
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```

### 2️⃣ Frontend Setup
1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `client` root:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### 3️⃣ Access the App
Open your browser and visit: `http://localhost:5173`

---


## 📂 Project Structure

```
FreelanceX/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth & Socket contexts
│   │   ├── pages/          # Application pages (Home, Dashboard, etc.)
│   │   └── ...
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── ...
└── README.md               # Project Documentation
```

---

## 📚 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login user & get tokens | Public |
| `POST` | `/api/auth/refresh` | Refresh access token | Public |
| `POST` | `/api/auth/logout` | Logout user | Private |
| `POST` | `/api/auth/forgot-password` | Request password reset | Public |
| `PUT` | `/api/auth/reset-password/:token` | Reset password | Public |
| `GET` | `/api/auth/profile` | Get current logged in user | Private |
| **Users & Profiles** | | | |
| `GET` | `/api/users/:id` | Get user profile stats | Public |
| `PATCH` | `/api/users/profile` | Update profile details | Private |
| `POST` | `/api/users/deposit` | Add funds to wallet | Client |
| **Jobs** | | | |
| `GET` | `/api/jobs` | Get all jobs (with filters) | Public |
| `POST` | `/api/jobs` | Post a new job | Client |
| `GET` | `/api/jobs/:id` | Get job details | Public |
| `GET` | `/api/jobs/client/me` | Get client's posted jobs | Client |
| `PATCH` | `/api/jobs/:id` | Update job | Client/Admin |
| `DELETE` | `/api/jobs/:id` | Delete job | Client/Admin |
| **Proposals** | | | |
| `POST` | `/api/proposals` | Submit a proposal | Freelancer |
| `GET` | `/api/proposals/job/:jobId` | Get proposals for a job | Client |
| `GET` | `/api/proposals/freelancer/me` | Get freelancer's proposals | Freelancer |
| `PATCH` | `/api/proposals/:id` | Update proposal status | Client |
| **Engagements** | | | |
| `GET` | `/api/engagements/:id` | Get engagement details | Private |
| `GET` | `/api/engagements/job/:jobId` | Get engagement by Job ID | Private |
| `POST` | `/api/engagements/:id/milestones` | Add a milestone | Client |
| `PATCH` | `/api/engagements/milestones/:id/approve` | Approve milestone | Client |
| `PATCH` | `/api/engagements/:id/complete` | Complete contract | Client |
| **Reviews** | | | |
| `POST` | `/api/reviews` | Submit a review | Client |
| `GET` | `/api/reviews/:userId` | Get user reviews | Public |
| **Admin** | | | |
| `GET` | `/api/admin/stats` | Get system statistics | Admin |
| `PATCH` | `/api/admin/users/:id/ban` | Ban a user | Admin |
| `DELETE` | `/api/admin/jobs/:id` | Delete any job | Admin |

---
