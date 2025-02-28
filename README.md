# AI-Powered Candidate Matcher (Mini-Mercor)

## 🚀 Overview
Mini-Mercor is an AI-powered candidate matcher that helps users find relevant job opportunities based on their resumes. Using LLM embeddings, the system matches candidates with job listings to streamline the hiring process.

This project is a **2-hour MVP** that showcases practical AI applications in hiring, job matching, and database design.

## 🔹 Features
- **User Authentication** – Sign up, log in, and manage profiles.
- **Resume Upload** – Users can upload resumes as text or files.
- **AI-Powered Job Matching** – Uses OpenAI/Groq API to rank job relevance.
- **Browse Job Listings** – Simple job listing UI.
- **Admin Dashboard** – View candidates and their matches.

## 🛠 Tech Stack
- **Frontend:** Next.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI API:** OpenAI/Groq API for resume-job similarity scoring
- **File Storage:** Local (for MVP) / AWS S3 (future upgrade)

## 📂 Project Structure
```
📁 mini-mercor/
├── 📁 backend/             # Express.js backend for API handling
│   ├── controllers/        # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── utils/              # Helper functions
│   └── server.js           # Entry point for backend
│
├── 📁 frontend/            # Next.js frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Routes and views
│   ├── services/           # API integration
│   ├── styles/             # CSS and Tailwind styles
│   └── app.js              # Main app file
│
├── 📁 data/                # Job listings in CSV/JSON format (for MVP)
├── .env                    # Environment variables
├── README.md               # Project documentation
└── package.json            # Dependencies and scripts
```

## 🛠 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/mini-mercor.git
cd mini-mercor
```

### 2️⃣ Install Dependencies
```sh
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the backend folder and add:
```sh
MONGO_URI=mongodb+srv://your-mongo-db-url
OPENAI_API_KEY=your-openai-api-key
PORT=5000
```

### 4️⃣ Load Job Listings into Database
For the MVP, we use a JSON file for job listings. You can load it using:
```sh
node backend/utils/loadJobs.js
```

### 5️⃣ Start the Development Server
```sh
cd backend && npm run dev
cd ../frontend && npm run dev
```

### 6️⃣ Open in Browser
Go to `http://localhost:3000` to use the app.

## 🚀 Future Improvements
- **Real-time Job Scraping** – Fetch job listings dynamically.
- **Advanced AI Matching** – Use custom-trained embeddings.
- **Resume Parsing** – Extract structured data from resumes.
- **User Feedback Loop** – Improve recommendations based on user input.

## 📜 License
This project is open-source and available under the **MIT License**.

---
### 🎯 MVP Goal: Launch a working prototype in **2 hours** and iterate based on feedback!

