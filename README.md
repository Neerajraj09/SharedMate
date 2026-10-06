# SharedMate

SharedMate is a web application designed to help users manage and split expenses for trips and group activities. It provides an easy way to track who paid for what and calculates how to settle up the debts, ensuring that everyone pays their fair share.

## Features

- **PWA Optimized:** Progressive Web App with an optimized UI for mobile usage, offering a native-app-like experience.
- **Trip Management:** Create trips and add members to them.
- **Expense Tracking:** Add expenses to a trip and see a history of all expenses.
- **Automated Settlement:** Automatically calculates who owes what to whom when a trip ends.
- **Email Notifications:** Get an email summary when a trip is settled.
- **User Profiles:** Manage your user profile and payment information (UPI ID).

## Tech Stack

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web development.
- **React Router:** For client-side routing.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Axios:** For making HTTP requests to the backend.

### Backend

- **Node.js:** A JavaScript runtime for building the server-side application.
- **Express:** A web framework for Node.js.
- **MongoDB:** A NoSQL database for storing application data.
- **Mongoose:** An object data modeling (ODM) library for MongoDB.
- **JSON Web Tokens (JWT):** For secure user authentication.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB:** You will need a running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/SharedMate.git
    cd SharedMate
    ```

2.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Configure backend environment variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the backend server:**
    From the `backend` directory, run:
    ```sh
    npm start
    ```
    The backend server will start on the port you specified in your `.env` file (e.g., 5000).

2.  **Start the frontend development server:**
    From the `frontend` directory, run:
    ```sh
    npm run dev
    ```
    The frontend development server will start, and you can access the application in your browser, usually at `http://localhost:5173`.

## Screenshots

*(Placeholder for screenshots of the application)*

---

Thank you for checking out SharedMate!
