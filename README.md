# 🚀 JobTrackr — AI Powered Job Application Tracker

A modern full-stack web application that helps users track, manage, and analyze their job applications with AI-powered resume analysis, Kanban workflow management, analytics dashboards, reminders, and interview scheduling.

---

# 📌 Features

## 🔐 Authentication System

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Sessions
* Logout Functionality

---

## 📊 Dashboard Analytics

* Total Applications Count
* Status-wise Application Tracking
* Recent Applications
* Success Rate Analytics
* Monthly Application Trends
* Upcoming Interviews
* Interactive Charts & Graphs

---

## 📁 Job Application Management

* Add Applications
* Edit Applications
* Delete Applications
* Search Applications
* Filter by Status
* Pagination Support
* Detailed Application View

---

## 📄 Resume Upload System

* Upload Resume (PDF/DOC/DOCX)
* View Uploaded Resume
* Attach Resume to Specific Application

---

## 📝 Notes & Interview Tracking

* Add Personal Notes
* Save HR Feedback
* Track Interview Discussions
* Follow-up Management

---

## 📌 Activity Timeline

Tracks activities like:

* Application Created
* Status Updated
* Resume Uploaded
* Interview Scheduled
* Notes Updated

---

## 🎯 Kanban Board

* Drag & Drop Workflow
* Move Applications Between Stages
* Real-Time Status Updates

Stages include:

* Applied
* Screening
* Interview
* Offer
* Rejected
* Withdrawn

---

## 🤖 AI Resume Analyzer

Analyze resumes using AI:

* Extract Skills
* Detect Strengths
* Identify Weaknesses
* Suggest Improvements

Supports:

* Text Input
* File Upload

---

## 🔔 Reminder System

* Upcoming Follow-up Reminders
* Interview Reminders
* Deadline Tracking

---

## 📅 Calendar Integration

Visualize:

* Interview Dates
* Follow-up Dates
* Application Dates

Using FullCalendar integration.

---

# 🏗️ Tech Stack

## Frontend

* Next.js 14
* React
* TypeScript
* Tailwind CSS
* React Query
* React Hook Form
* Zod Validation
* Recharts
* FullCalendar
* Zustand

---

## Backend

* Django
* Django REST Framework
* JWT Authentication
* Django Filters
* File Upload APIs

---

# 📂 Project Structure

## Frontend Structure

```bash
frontend/
│
├── app/
├── components/
├── hooks/
├── lib/
├── store/
├── styles/
└── types/
```

---

## Backend Structure

```bash
backend/
│
├── applications/
├── authentication/
├── analytics/
├── reminders/
├── media/
└── jobtrackr_backend/
```

---

# ⚙️ Installation

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/jobtrackr.git
```

---

# 2️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 3️⃣ Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start server:

```bash
python manage.py runserver
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# 🔑 Environment Variables

## Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

---

# 📡 API Endpoints

## Authentication

```bash
POST /api/auth/register/
POST /api/auth/login/
```

---

## Applications

```bash
GET    /api/applications/
POST   /api/applications/
PATCH  /api/applications/:id/
DELETE /api/applications/:id/
```

---

## Kanban Status Update

```bash
PATCH /api/applications/:id/status/
```

---

## Calendar Events

```bash
GET /api/applications/calendar-events/
```

---

## Resume Analyzer

```bash
POST /api/resume/analyze/
```

---

# 🎨 UI Features

* Modern Responsive Design
* Gradient Backgrounds
* Professional Dashboard Layout
* Mobile Responsive
* Reusable Components
* Interactive Hover Effects

---

# 🧠 Key Concepts Learned

## Frontend

* React Hooks
* API Integration
* State Management
* Form Validation
* Dynamic Routing
* File Upload Handling
* Drag & Drop Systems
* Calendar Integration

---

## Backend

* REST API Development
* Authentication
* Filtering & Search
* Pagination
* File Handling
* Serializer Logic
* Query Optimization

---

# 🚀 Future Improvements

* Dark Mode
* Email Notifications
* CSV/Excel Export
* AI Job Matching
* WebSocket Notifications
* Chrome Extension
* Mobile Application
* Company Analytics
* Team Collaboration
* Interview Question Generator

---

# 📷 Screens Included

* Login Page
* Dashboard
* Applications Page
* Kanban Board
* Resume Analyzer
* Calendar Page
* Reminder System

---

# 💼 Resume Description

> Built a full-stack AI-powered Job Application Tracking platform using Next.js and Django REST Framework featuring authentication, Kanban workflow management, resume analysis, analytics dashboard, interview scheduling, reminders, calendar integration, and activity tracking.

---

# 👨‍💻 Author

Ganesh Mirashi

* Python Full Stack Developer
* Next.js + Django Developer

---

# ⭐ Final Note

This project demonstrates:

* Full Stack Development
* Production-Level UI
* API Architecture
* Authentication Systems
* AI Integration
* Real-Time User Experience
* Data Visualization
* Advanced Frontend Concepts

A complete portfolio-ready SaaS-style application 🚀
