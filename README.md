# 🌐 Fikar – Vendor Booking Platform (MERN Stack)

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

## 📖 Overview

**Fikar** is a full-stack **MERN** (MongoDB, Express, React, Node) web application that allows users to **browse and book vendors** for different services.  
Vendors can **register, log in, and add their services**, which are displayed publicly **only after admin approval**.  
Admins have full control to **approve or disapprove vendor services** and can also **view all vendors and booking details** in their dashboard.

---

## 🚀 Core Features

### 👤 User Panel
- Browse vendors and available services.
- Book a vendor directly from the home page.
- View vendor details like name, phone number, location, and category.

### 🧑‍🔧 Vendor Panel
- Secure registration and login.
- Add services with all required details.
- Services appear on the platform only after **admin approval**.
- If **disapproved**, the service is automatically **removed**.

### 🧑‍💼 Admin Dashboard
- Admin login authentication.
- **Approve / Disapprove** vendor services.
  - Approved services appear on the **Home Page**.
  - Disapproved services are **deleted automatically**.
- **Vendor Management Card** – View all vendors and their details.
- **Booking Management Card** – View all user bookings in one place.

---

## 🏗️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React.js, HTML, CSS, JavaScript, Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (JSON Web Token) |
| **State Management** | React Context / useState / useEffect |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/fikar.git
cd fixKar

Install dependencies

For backend:
```bash
cd Backend
npm install
```

For frontend:

cd Frontend
npm install


Set up environment variables
Create a .env file in your Backend folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Run the development servers

Start backend:

npm start


Start frontend:

npm run dev


Open your browser and visit:

http://localhost:5173

🧩 Folder Structure
Fikar/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

🔐 Roles Summary
Role	Access	Description
User	Browse, book vendors	Interacts with services and vendors
Vendor	Add services	Waits for admin approval
Admin	Approve/Disapprove, View data	Controls visibility and manages vendors/bookings
🧠 Future Enhancements

Email/SMS notifications for approvals and bookings.

Vendor profile and dashboard for tracking bookings.

Payment gateway integration.

Analytics and reporting for admin.

👨‍💻 Developer

Developed by: Sufiyan Imran

📍 Karachi, Pakistan
🌐 GitHub: sufiyanimran
💼 LinkedIn: sufiyanimran
