# Basic Login with Google

A simple web application demonstrating Google OAuth authentication using React, Express, and Supabase.

## Features

- Google OAuth Authentication
- Protected API Endpoints
- User Dashboard
- Session Management

## Project Structure

```
.
├── frontend/           # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/           # Express backend
    ├── src/
    ├── package.json
    └── tsconfig.json
```

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Supabase account and project

## Environment Variables

### Frontend (.env)
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=your_backend_url
```

### Backend (.env)
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
FRONTEND_URL=your_frontend_url
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/basic-login.git
cd basic-login
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

## Running Locally

1. Start the backend:
```bash
cd backend
npm run dev
```

2. Start the frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

This project is configured for deployment on Render.com. See deployment documentation for detailed instructions.

## License

MIT 