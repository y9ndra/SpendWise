# 💰 Expense Tracker API

A secure and scalable backend API for managing personal expenses, built using Node.js, Express, MongoDB, and JWT authentication.

---

## 🚀 Live Demo

🔗 **Deployed API:**
https://spendwise-nlql.onrender.com

---

## 🧠 Features

- 🔐 User Authentication (Register & Login)
- 🔑 JWT-based Authorization
- 🔒 Password Hashing using bcrypt
- 📊 Expense Management (CRUD)
- 📂 Category-based Filtering
- 📄 Pagination Support
- 📈 Expense Summary (Total, Category, Monthly)
- 🧩 Clean MVC Architecture

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt
- **Deployment:** Render

---

## 📁 Project Structure

```
project
│
├── controllers
│     auth.controller.js
│     expense.controller.js
│
├── models
│     User.js
│     Expense.js
│
├── routes
│     auth.route.js
│     expense.route.js
│
├── middleware
│     auth.middleware.js
│
├── server.js
└── .env
```

---

## 🔐 Authentication Flow

1. User registers → password hashed and stored
2. User logs in → JWT token generated
3. Client sends token in headers
4. Middleware verifies token for protected routes

---

## 📌 API Endpoints

### 🔑 Auth Routes

#### Register

```
POST /auth/register
```

#### Login

```
POST /auth/login
```

---

### 💸 Expense Routes (Protected)

> ⚠️ Requires Authorization Header:

```
Authorization: <your_token>
```

---

#### ➕ Add Expense

```
POST /expenses/add
```

---

#### 📄 Get All Expenses (with pagination & filter)

```
GET /expenses?page=1&limit=10&category=Food
```

---

#### ❌ Delete Expense

```
DELETE /expenses/:id
```

---

## 📊 Query Parameters

| Parameter | Description                |
| --------- | -------------------------- |
| page      | Page number                |
| limit     | Number of records per page |
| category  | Filter by category         |

---

## 🔐 Security Features

- Passwords hashed using bcrypt
- JWT authentication with expiration
- Protected routes using middleware
- User-specific data access

---

## 🧪 Example Request

### Get Expenses

```
GET /expenses?page=1&limit=5&category=Food
```

---

### Response

```json
{
  "totalRecords": 20,
  "currentPage": 1,
  "totalPages": 4,
  "expenses": [...]
}
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000
MONGO_URL=your_mongodb_connection
SECRET_KEY=your_secret_key
```

---

## 🧑‍💻 How to Run Locally

```bash
git clone https://github.com/YUGI-18/SpendWise.git
cd SpendWise
npm install
npm start
```

---

## 📈 Future Improvements

- Update Expense (PUT)
- Advanced Filtering (date range, amount)
- Charts & Analytics Dashboard
- Frontend Integration (React)

---

## ⭐ If you like this project

If you found this useful, consider giving it a star ⭐!
