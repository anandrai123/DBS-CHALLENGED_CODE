# DBS-CaseStudy
# React.js + Spring Boot Authentication System

This project implements a registration and login system using React.js for the frontend and Spring Boot with JWT token authentication for the backend. MongoDB is used as the database.

## Features

- User Registration: Allows users to register with a unique username and password.
- User Login: Users can log in with their credentials.
- JWT Authentication: Uses JWT tokens for authentication, ensuring secure communication between frontend and backend.
- Bad Credentials Handling: Handles bad credentials gracefully, providing appropriate error messages.
- Account Locking: Implements account locking functionality to prevent brute-force attacks.
- MongoDB Integration: Utilizes MongoDB as the database for storing user information.

## Technologies Used

- React.js: A JavaScript library for building user interfaces.
- Spring Boot: A Java-based framework for building web applications and RESTful APIs.
- JSON Web Tokens (JWT): A compact, URL-safe means of representing claims to be transferred between two parties.
- MongoDB: A NoSQL database program.

## Setup Instructions

### Frontend (React.js)

1. Clone this repository: `git clone <repository_url>`
2. Navigate to the `frontend` directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Access the application at `http://localhost:3000`

### Backend (Spring Boot)

1. Make sure you have Java and Maven installed on your system.
2. Clone this repository: `git clone <repository_url>`
3. Navigate to the `backend` directory: `cd backend`
4. Configure MongoDB: Update `application.properties` file with your MongoDB connection details.
5. Run the application: `mvn spring-boot:run`
6. The backend server will start at `http://localhost:9090`

## API Endpoints

- `POST /api/auth/createuser`: Register a new user.
- `POST /api/auth/login`: Login an existing user.


## Security

- JWT tokens are used for authentication.
- Passwords are hashed before storing in the database.
- Account locking mechanism implemented to prevent brute-force attacks.

## Folder Structure

- `my-react-app`: Contains the React.js frontend code.
- `regitrationWithAuth`: Contains the Spring Boot backend code.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
