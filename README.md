Task Management System
A simple and efficient Task Management System built with Django (backend) and React (frontend). This application allows users to manage their notes with features like creating, editing, deleting, marking as completed, filtering, and searching notes. It also includes user authentication for secure access.
Features

User Authentication: Register and login functionality with JWT-based authentication.
Note Management:
Create new notes with a title and content.
Edit existing notes.
Delete notes with confirmation.
Mark notes as completed or not completed.


Filtering and Search:
Filter notes by status (all, completed, not completed).
Search notes by title or content.


Responsive Design: Supports both light and dark themes based on user preferences.
Navigation: Simple menu with Home and Logout options.

Technologies Used

Backend:
Django 5.2
Django REST Framework
PostgreSQL (or SQLite for development)
rest_framework_simplejwt for authentication


Frontend:
React 18
React Router 6
Axios for API requests
date-fns for date formatting
jwt-decode for token validation


Styling: CSS with support for dark/light themes

Project Structure
Task-Management-System/
├── backend/
│   ├── api/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py        # Models for Note
│   │   ├── serializers.py   # Serializers for Note and User
│   │   ├── tests.py
│   │   ├── urls.py          # API routes
│   │   └── views.py         # API views
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py      # Django settings
│   │   ├── urls.py          # Main URL routing
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt     # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Form.jsx      # Login/Register form
│   │   │   ├── Note.jsx      # Note component
│   │   │   ├── ProtectedRoute.jsx  # Route protection
│   │   │   └── LoadingIndicator.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Main page with note list
│   │   │   ├── Login.jsx    # Login page
│   │   │   ├── Register.jsx # Registration page
│   │   │   └── NotFound.jsx # 404 page
│   │   ├── styles/
│   │   │   ├── Home.css     # Styles for Home page
│   │   │   ├── Note.css     # Styles for Note component
│   │   │   ├── Form.css     # Styles for Form component
│   │   │   └── App.css      # Global styles
│   │   ├── api.js           # API client for backend requests
│   │   ├── App.jsx          # Main app component with routing
│   │   └── constants.js     # Constants (e.g., token keys)
│   ├── public/
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js
├── .gitignore
└── README.md

Prerequisites

Python 3.11 or higher
Node.js 18 or higher
npm 9 or higher
PostgreSQL (optional, SQLite can be used for development)
Git

Setup and Installation
1. Clone the Repository
Clone the repository from GitHub:
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system

2. Backend Setup

Navigate to the backend directory:cd backend


Create and activate a virtual environment:python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate


Install dependencies:pip install -r requirements.txt


(Optional) Configure PostgreSQL:
Install PostgreSQL and create a database.
Update backend/settings.py with your database settings:DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


Alternatively, SQLite is configured by default.


Apply migrations:python manage.py makemigrations
python manage.py migrate


(Optional) Create a superuser for admin access:python manage.py createsuperuser


Run the development server:python manage.py runserver

The backend will be available at http://127.0.0.1:8000.

3. Frontend Setup

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Create a .env file in the frontend directory and add the backend URL:VITE_API_URL=http://127.0.0.1:8000


Start the development server:npm run dev

The frontend will be available at http://localhost:5173.

Usage

Open the frontend in your browser at http://localhost:5173.
Register a new account or log in with an existing one.
Use the main page to:
Create new notes.
Edit, delete, or mark notes as completed.
Filter notes by status or search by title/content.


Use the menu to navigate to the home page or log out.

API Endpoints
The backend provides the following API endpoints:

POST /api/register/ - Register a new user
POST /api/token/ - Obtain JWT token (login)
POST /api/token/refresh/ - Refresh JWT token
GET /api/notes/ - List all notes (supports filtering: ?is_completed=true, ?search=query, ?sort_by=-updated_at)
POST /api/notes/ - Create a new note
GET /api/notes/<id>/ - Retrieve a note
PATCH /api/notes/<id>/ - Update a note (or toggle is_completed)
DELETE /api/notes/<id>/ - Delete a note

Deployment
Backend

Set DEBUG = False in backend/settings.py.
Configure environment variables (e.g., DJANGO_SECRET_KEY, database settings).
Collect static files:python manage.py collectstatic


Deploy using a WSGI/ASGI server (e.g., Gunicorn with Uvicorn):pip install gunicorn uvicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000


Use a reverse proxy like Nginx for production.

Frontend

Build the frontend:cd frontend
npm run build


Deploy the dist folder to a static file hosting service (e.g., Netlify, Vercel).

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
Contact
For any questions or suggestions, feel free to reach out:

Email: xxxzora001@gmail.com
GitHub: Beks111

