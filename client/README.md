# Full Stack Developer Internship - Round 1 Task

This is a submission for the Round 1 task to build a fundraising intern portal. The portal features a dummy login/signup system, a dynamic dashboard displaying intern-specific data from a backend API, and a leaderboard of top performers.

The UI is designed to be clean, modern, and responsive, with a focus on providing clear feedback and a premium user experience through subtle animations and a consistent design system.

## Live Demo Links (Optional)
* **Frontend:** [Link to your Vercel/Netlify deployment]
* **Backend:** [Link to your Render/Railway API]

## Tech Stack

- **Frontend**: React (with Vite), Tailwind CSS, Framer Motion, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)

## Core Features

-   **Dummy Authentication:** A toggleable Login and Signup form UI.
-   **Dynamic Intern Dashboard:**
    -   Fetches and displays intern name, referral code, and total donations from the backend.
    -   Features a dynamic progress bar for unlockable rewards.
    -   Uses a responsive, card-based layout with hover effects and animations.
-   **Leaderboard:**
    -   Fetches and displays a sorted list of top-performing interns.
    -   Highlights the current user's position for easy recognition.
    -   Visually distinguishes the top 3 performers.

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm / yarn
- MongoDB (local instance or a cloud URI from MongoDB Atlas)

### 1. Setup Backend
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory and add your variables
# MONGO_URI=your_mongodb_connection_string
# PORT=5001

# Start the development server
npm run dev