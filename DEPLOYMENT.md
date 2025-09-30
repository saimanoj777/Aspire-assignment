# Aspire Assignment - Render Deployment Guide

This guide will help you deploy your React + Node.js application to Render.

## Project Structure
- `backend/` - Node.js/Express API server
- `frontend/` - React application built with Vite

## Prerequisites
1. Push your code to a GitHub repository
2. Create a free account on [Render](https://render.com)

## Deployment Steps

### 1. Deploy the Backend (API Service)

1. **Create a Web Service:**
   - Go to your Render dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Backend Service:**
   - **Name:** `aspire-backend` (or your preferred name)
   - **Runtime:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Free

3. **Set Environment Variables:**
   - Go to your service's Environment tab
   - Add the following variables:
     ```
     NODE_ENV=production
     DATABASE_PATH=./database.db
     ```

4. **Health Check:**
   - Set Health Check Path to `/colleges`

### 2. Deploy the Frontend (Static Site)

1. **Create a Static Site:**
   - Click "New" → "Static Site"
   - Connect the same GitHub repository

2. **Configure the Frontend Service:**
   - **Name:** `aspire-frontend` (or your preferred name)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`

3. **Set Environment Variables:**
   - Add the following variable:
     ```
     VITE_API_URL=https://your-backend-service-url.onrender.com
     ```
   - Replace `your-backend-service-url` with your actual backend service URL from step 1

### 3. Important Notes

- **Database:** The backend uses SQLite with file storage. The database will persist between deployments.
- **CORS:** Already configured to allow cross-origin requests
- **Port:** Backend automatically uses the PORT environment variable provided by Render
- **Build Time:** First deployment may take 5-10 minutes

### 4. Post-Deployment

1. **Test the Backend:**
   - Visit `https://your-backend-url.onrender.com/colleges`
   - You should see the colleges data

2. **Test the Frontend:**
   - Visit your frontend URL
   - All features should work including API calls

### 5. Environment Variables Reference

#### Backend (.env)
```
NODE_ENV=production
DATABASE_PATH=./database.db
PORT=3000  # Automatically set by Render
```

#### Frontend (.env)
```
VITE_API_URL=https://your-backend-service-url.onrender.com
```

### 6. Troubleshooting

- **Build Failures:** Check the build logs in Render dashboard
- **API Errors:** Ensure VITE_API_URL points to the correct backend URL
- **Database Issues:** Check if the database file has proper permissions
- **CORS Errors:** Backend is configured with `cors()` middleware

### 7. Local Development

For local development, use:
```bash
# Backend
cd backend
npm install
npm start  # Runs on http://localhost:3000

# Frontend
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

The frontend is configured to use `http://localhost:3000` for local API calls.

## Files Modified for Deployment

1. **backend/server.js** - Added dynamic port and host configuration
2. **backend/package.json** - Added Node.js version requirement
3. **frontend/vite.config.js** - Added build configuration and environment variables
4. **frontend/src/config.js** - API base URL configuration
5. **All frontend pages** - Updated to use configurable API URL
6. **Environment files** - Created for local and production environments

Your application is now ready for deployment on Render! 🚀