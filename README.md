# 🌐 SensorDash – Backend

SensorDash Backend is the backend API for the SensorDash application. It is built with Node.js, Express, and MongoDB, and provides endpoints for OTP-based user authentication, sensor data handling, flow management, and real-time updates.

---

## 🚀 Features

- 🧑‍💻 User Authentication using OTP
- 🔄 Real-Time Chart Updates for data visualization
- 🔧 Flowchart Management including creation, editing, and persistence
- 🔁 Data Simulation with start/stop functionality for sensor data
- 🧱 Database Integration with MongoDB
- 🌐 API Rate Limiting and Error Handling

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sreejithdev2002/SensorDash-Backend.git
cd SensorDash-Backend
```
### 2. Install dependencies

```bash
npm install
```
### 3. Configure environment variables

```
MONGO_URI=mongodb://127.0.0.1:27017/greon
PORT=5000
MAIL_USER=user_mail_id
MAIL_PASS=user_mail_app_password
JWT_SECRET_KEY=secret_key
```
### 4.Run the development server

```bash
npm start
```
This will start the server at: [http://localhost:5000](http://localhost:5000)

---

## 📬 API Endpoints

### 🔐 Auth

POST ---- `/api/auth/signup` ---- Sends OTP for Signup  
POST ---- `/api/auth/verify-otp` ---- Verifies OTP  
POST ---- `/api/auth/login` ---- Authenticates user

### 📊 Sensor Data

POST ---- `/api/data/start` ---- Start data generation/simulation  
POST ---- `/api/data/stop` ---- Stop data generation/simulation  
GET ---- `/api/data/history` ---- Fetch historical sensor data

### 🔁 Flow

POST ---- `/api/flow/save` ---- Saves the flowchart  
GET ---- `/api/flow/load` ---- Loads the saved flowchart

---
## 🧰 Tools and Libraries Used

- Node.js for server-side logic

- Express.js for handling HTTP requests

- MongoDB for data storage

- Mongoose for MongoDB object modeling

- JWT for authentication and authorization

- Nodemailer for OTP-based user verification

- dotenv for managing environment variables

- cors for handling cross-origin requests

---

## AI Usage

### We use AI tools to:

- Optimize API structure for handling complex data and ensuring scalability.

- Generate JWT token logic for user authentication and authorization.

- Create consistent error handling mechanisms across API routes.