# Backend Setup

## 1. Environment Variables
Create a `.env` file in this folder with the following content:

```
MONGODB_URI=your_mongodb_connection_string_here
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
PORT=5000
```

## 2. Install Dependencies
```
npm install
```

## 3. Run the Server
```
npm start
```

The backend will run on the port specified in `.env` (default: 5000). 