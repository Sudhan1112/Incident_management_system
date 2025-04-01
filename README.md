# 🚨 Incident Management System

A full-stack application for tracking, managing, and reporting incidents across an organization. This system enables efficient incident documentation, categorization, and analysis to improve safety and operational response.

![Incident Management System]![image](https://github.com/user-attachments/assets/bf196f2c-3cfb-4f47-bf75-17bcd63123d7)
)

![Incident Management System Form data]![image](https://github.com/user-attachments/assets/e42f7a3b-11a8-4676-a781-7eb85fe3ff97)

## 📋 Table of Contents

- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

## 🎮 Demo

### Frontend Deployment
[Live Demo](https://vibe-copilot-project.vercel.app/)

### Backend Deployment
[API Endpoint](https://vibe-copilot-project.onrender.com)

### Demo Video
[Watch Demo](https://drive.google.com/file/d/1o-rxT_Js--jFpS0OP2RqxhfU9skY7MY1/view?usp=sharing)

## 💻 Tech Stack

### Frontend
- **React** - UI library for building the interface
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Firebase Storage** - Cloud storage for image uploads
- **Axios** - HTTP client for API requests

### Backend
- **FastAPI** - Modern, high-performance web framework for building APIs
- **Python** - Backend programming language
- **Uvicorn** - ASGI server for serving the FastAPI application

## 🏗 Architecture

This application follows the **MVC (Model-View-Controller)** architecture pattern:

**Frontend:**
- **View** - React components for rendering UI elements
- **Controller** - IncidentController for handling user actions and state changes
- **Model** - Local state management using React hooks

**Backend:**
- **Routes** - API endpoints for HTTP requests
- **Controllers** - Business logic for handling requests
- **Models** - Data definitions and database interactions

## 📁 Project Structure

```
incident-management-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IncidentForm.jsx       # Form for creating and editing incidents
│   │   │   └── IncidentList.jsx       # List display of all incidents
│   │   ├── controllers/
│   │   │   └── IncidentController.js  # Logic for handling incident operations
│   │   ├── models/
│   │   │   └── IncidentModel.js       # Data model for incidents
│   │   ├── services/
│   │   │   └── FileUploadService.js   # Handles image uploads to Firebase
│   │   ├── config/
│   │   │   └── firebase.js           # Firebase configuration
│   │   ├── styles/
│   │   │   └── styles.js             # Styling constants
│   │   └── App.js                    # Main application component
│   ├── .env                          # Environment variables
│   └── package.json                  # Dependencies and scripts
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   └── incident_controller.py # Incident API logic
│   │   ├── models/
│   │   │   └── incident_model.py      # Data model for incidents
│   │   ├── routes/
│   │   │   └── incident_routes.py     # API endpoints definition
│   │   └── main.py                    # FastAPI application entry point
│   ├── .env                           # Environment variables
│   └── requirements.txt               # Python dependencies
│
└── README.md                          # Project documentation
```

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Firebase account (for image storage)

### Frontend Setup
```bash
# Clone repository
git clone https://github.com/yourusername/incident-management-system.git

# Navigate to frontend directory
cd incident-management-system/frontend

# Install dependencies
npm install
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate
# OR (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
VITE_API_URL=http://localhost:3500
```

### Backend (.env)
```
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:5173
```

## ⚡ Running Locally

### Frontend
```bash
# Start development server
npm run dev
# App will run on http://localhost:5173
```

### Backend
```bash
# Start FastAPI server
cd backend
python -m uvicorn app.main:app --reload --port 3500
# API will run on http://localhost:3500
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/incidents` | Retrieve all incidents |
| POST | `/incidents` | Create a new incident |
| PUT | `/incidents/{id}` | Update an existing incident |
| DELETE | `/incidents/{id}` | Delete an incident |
| GET | `/incidents/{id}` | Get a specific incident by ID |

## 🚀 My Approach

In developing this Incident Management System, I focused on creating a clean, modular architecture that separates concerns and makes the codebase maintainable:

1. **Component-Based UI**: Created reusable React components for the form, list view, and individual incident cards.

2. **Controller Pattern**: Implemented a controller layer in the frontend to handle business logic separately from UI components, improving maintainability.

3. **State Management**: Used React's useState and useEffect hooks for local state management, with a centralized approach through the IncidentController.

4. **Image Upload**: Integrated Firebase Storage for reliable image uploads with progress tracking.

5. **Backend Architecture**: Built a clean FastAPI backend with distinct layers for routes, controllers, and models.

6. **API Design**: Created intuitive RESTful endpoints for CRUD operations on incidents.

7. **Responsive UI**: Used Tailwind CSS to ensure the application works well on various device sizes.

8. **Error Handling**: Implemented comprehensive error handling in both frontend and backend.

The system architecture allows for easy extension with new features and ensures that different parts of the application can evolve independently.

## 🔮 Future Enhancements

- **User Authentication** - Role-based access control for different incident management permissions
- **Dashboard Analytics** - Visual representations of incident data and trends
- **Email Notifications** - Automated alerts for new incidents and status changes
- **Mobile App** - Native mobile applications for on-the-go incident reporting
- **Offline Support** - Service workers for offline functionality
- **Export Functionality** - Report generation in PDF or Excel formats

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ by [Sudhan](https://github.com/Sudhan1112)
