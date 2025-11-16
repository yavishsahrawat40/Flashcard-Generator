# 🎴 AI Flashcard Generator

A beautiful, full-stack flashcard generation application powered by Google's Gemini AI. Enter any topic and instantly get 15 professionally crafted flashcards with questions, answers, and difficulty levels.

![Tech Stack](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)

## ✨ Features

- 🤖 **AI-Powered Generation** - Uses Google Gemini 2.5 Flash for intelligent flashcard creation
- 🎨 **Beautiful Dark UI** - Stunning bluish-black gradient with glass-morphism effects
- 🔄 **Interactive Cards** - Click to flip between questions and answers
- 📊 **Difficulty Levels** - Color-coded badges (Easy, Medium, Hard)
- 📈 **Progress Tracking** - Visual progress bar and card counter
- ⚡ **Fast & Responsive** - Built with Vite and optimized for performance
- 🎯 **Smart Validation** - Automatic retry logic and error handling

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **Vite 7.2** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first styling
- **ES Modules** - Modern JavaScript

### Backend
- **Node.js 22.x** - JavaScript runtime
- **Express 4.18** - Web framework
- **Google Generative AI** - Gemini 2.5 Flash model
- **dotenv** - Environment variable management
- **ES Modules** - Modern JavaScript
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
flashcard-generator/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── App.jsx          # Main component with flip animation
│   │   ├── App.css          # Custom 3D transform styles
│   │   ├── index.css        # Tailwind directives
│   │   └── main.jsx         # React entry point
│   ├── public/              # Public static files
│   ├── index.html           # HTML template
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.js    # PostCSS configuration
│   ├── vite.config.js       # Vite configuration
│   ├── eslint.config.js     # ESLint configuration
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Express backend
│   ├── server.js            # API server with retry logic
│   ├── .env                 # Environment variables (not in git)
│   ├── .env.example         # Environment template
│   └── package.json         # Backend dependencies
│
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Gemini API Key** - [Get one here](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yavishsahrawat40/Flashcard-Generator.git
cd flashcard-generator
```

2. **Set up the Backend**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here
# PORT=3001
```

4. **Set up the Frontend**
```bash
cd ../frontend
npm install
```

### Running the Application

You need to run both backend and frontend servers:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🎯 How to Use

1. Open your browser to `http://localhost:5173`
2. Enter any topic in the input field (e.g., "Photosynthesis", "World War II", "JavaScript")
3. Click **Generate** and wait for AI to create your flashcards
4. Use **Next** and **Previous** buttons to navigate through cards
5. Track your progress with the visual progress bar

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key and paste it into `backend/.env`
5. Restart the backend server

**Note:** The API key is free to use with generous limits for testing and development.

## 📡 API Documentation

### POST `/generate-flashcards`

Generates 15 flashcards for a given topic.

**Request:**
```json
{
  "topic": "Photosynthesis"
}
```

**Response:**
```json
{
  "flashcards": [
    {
      "question": "What is photosynthesis?",
      "answer": "The process by which plants convert light energy into chemical energy",
      "difficulty": "easy"
    }
    // ... 14 more flashcards
  ]
}
```

**Difficulty Distribution:**
- 5 Easy flashcards
- 5 Medium flashcards  
- 5 Hard flashcards

**Features:**
- Automatic retry logic (up to 3 attempts)
- Response validation and cleanup
- Error handling with descriptive messages

### GET `/health`

Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "ok"
}
```
## 📝 Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source.

**Made with ❤️**

For questions or support, please open an issue on GitHub.
