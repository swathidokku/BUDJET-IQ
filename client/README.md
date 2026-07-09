# 💰 BudgetIQ - Intelligent Personal Expense Management System

BudgetIQ is a MERN Stack web application that helps users manage their personal finances by tracking income, expenses, monthly budgets, and generating insightful financial reports.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 💰 Add Income
- 💸 Add, Edit & Delete Expenses
- 📅 Track expenses by date
- 🎯 Set Monthly Budget
- 📊 Dashboard with:
  - Income
  - Expense
  - Balance
  - Budget Overview
  - Smart Insights
- 📈 Expense Breakdown (Pie Chart)
- 📉 Income vs Expense (Bar Chart)
- 📅 Monthly Financial Reports
- 📋 Recent Transactions

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Chart.js
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

## 📂 Project Structure

```
BudgetIQ/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/BudgetIQ.git
```

---

### 2. Go to the project

```bash
cd BudgetIQ
```

---

### 3. Install client dependencies

```bash
cd client
npm install
```

---

### 4. Install server dependencies

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

---

## ▶️ Run the Backend

```bash
cd server
npm start
```

or

```bash
nodemon server.js
```

---

## ▶️ Run the Frontend

```bash
cd client
npm start
```

The application will run at:

```
http://localhost:3000
```

---

## 📊 Dashboard Features

- Total Income
- Total Expenses
- Current Balance
- Budget Progress
- Smart Financial Insights
- Expense Breakdown Chart
- Income vs Expense Chart
- Recent Transactions

---

## 📅 Reports

The Reports module provides monthly financial summaries including:

- Monthly Income
- Monthly Expenses
- Savings/Overspending

---

## 🔒 Authentication

Users can:

- Register
- Login
- Access protected routes using JWT Authentication

---
## 🔮 Future Enhancements

- Export reports as PDF
- Email monthly reports
- Expense reminders
- Recurring expenses
- Dark/Light theme
- Mobile responsive UI
- AI-powered spending insights

---
