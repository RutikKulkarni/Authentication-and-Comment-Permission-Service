# Authentication-and-Comment-Permission-Service

Authentication-and-Comment-Permission-Service is a full-stack web application that provides user authentication, role-based permission management, and comment functionality. The backend, built with Node.js, Express, and MongoDB, handles user authentication, session management with JWT tokens, and comment CRUD operations with role-based access control. The frontend, developed with React and styled with Tailwind CSS, offers a responsive interface for user authentication, comment management, and permission updates, with authentication state persisted in `localStorage`. And backend & frontend hosted on the vercel.

- Live URL: https://authentication-and-comment-permission-service-1g87.vercel.app/
- Backend hosted URL: https://authentication-and-comment-permission-service.vercel.app/

## Setup
1. **Fetch the Project**:
   ```bash
   git clone https://github.com/RutikKulkarni/Authentication-and-Comment-Permission-Service.git
   cd Authentication-and-Comment-Permission-Service
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory with:
   ```
   MONGO_URL=mongodb://localhost:27017/comment-permission-service
   PORT=5000
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend/` directory with:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```
   Start the frontend:
   ```bash
   npm start
   ```

## Features
- **User Authentication**: Sign up, log in, log out, forgot password, and password reset functionality.
- **Role-Based Permissions**: Users can have `read`, `write`, and `delete` permissions, configurable via an admin interface.
- **Comment Management**: Create, view, and delete comments based on user permissions.
- **Session Management**: JWT-based access (15m) and refresh tokens (7d), with automatic token refresh on 401 errors.
- **Responsive UI**: Modern, user-friendly interface with Tailwind CSS and toast notifications for feedback.
- **Persisted Auth State**: Authentication state stored in `localStorage` for seamless experience across page refreshes.

## API Endpoints
### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in and receive access/refresh tokens
- `POST /api/auth/logout` - Log out and invalidate refresh token
- `POST /api/auth/forgot-password` - Generate password reset token
- `POST /api/auth/reset-password` - Reset password using token
- `POST /api/auth/refresh-token` - Refresh access token

### Comments
- `GET /api/comments` - Get all comments (requires `read` permission)
- `POST /api/comments` - Create a comment (requires `write` permission)
- `DELETE /api/comments/:id` - Delete a comment (requires `delete` permission)

### Users
- `PUT /api/users/permissions/:userId` - Update user permissions (requires authorization)
- `GET /api/users/permissions/:userId` - Get user permissions
