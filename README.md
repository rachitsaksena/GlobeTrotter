# **Globetrotter Challenge - Backend**

**A Secure and Scalable Backend for a Travel Guessing Game**

---

## **Overview**

The **Globetrotter Challenge Backend** is built with **NestJS** and **PostgreSQL**, providing a robust API for a travel guessing game. It ensures **security**, **efficiency**, and **scalability**, with features like JWT authentication, anti-cheating mechanisms, and optimized database queries.

---

## **Key Features**

### **1. Secure Authentication**

- **JWT-based authentication** ensures secure access to game features.
- Passwords are hashed using **bcrypt** before storage.

### **2. Anti-Cheating Mechanism**

- Correct answers are **never sent to the UI**. Validation happens server-side to prevent cheating.

### **3. Session Persistence**

- Game sessions are tied to user accounts, allowing progress to persist across devices and browsers.

### **4. Efficient Queries**

- PostgreSQL’s `TABLESAMPLE` is used for random destination selection, avoiding full-table scans.
- Indexes on `userId` and `destinationId` optimize session lookups.

### **5. Challenge a Friend**

- Users can share a unique link to challenge friends. The backend fetches the challenger’s score without exposing internal data.

### **6. Extensibility**

- Modular architecture allows easy addition of features like leaderboards, timers, or image-based clues.

---

## **Tech Stack**

- **Backend Framework**: NestJS
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma
- **Authentication**: JWT
- **API Documentation**: Swagger

---

## **Design Decisions**

1. **Database Schema**:

   - **User**: Stores user details (username, hashed password, score).
   - **Destination**: Stores destination details (city, country, clues, fun facts).
   - **GameSession**: Tracks user attempts (userId, destinationId, isCorrect).

2. **Security**:

   - Correct answers are validated server-side to prevent cheating.
   - JWT tokens are signed with a secret key and include the user’s ID and score.

3. **Efficiency**:

   - Indexes on `userId` and `destinationId` optimize query performance.
   - `TABLESAMPLE` ensures fast random destination selection.

4. **Scalability**:
   - Modular architecture allows easy addition of new features.
   - PostgreSQL’s ACID compliance ensures data integrity.

---

## **Getting Started**

### **Prerequisites**

- Node.js (v18 or higher)
- PostgreSQL (hosted on Supabase or locally)
- Prisma CLI (`npm install -g prisma`)

---

### **Setup**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/globetrotter-backend.git
   cd globetrotter-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
   JWT_SECRET="your-secret-key"
   DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
   ```

4. **Run Migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed the Database**:  
   Add initial destinations using the script after updating the `DESTINATIONS` constant in the file `scripts/add_data.ts`:

   ```bash
   npx node-ts ./scripts/add_data.ts
   ```

6. **Start the Server**:
   ```bash
   npm run start:dev
   ```

---

### **API Endpoints**

#### **Authentication**

- **POST `/auth/login`**: Log in with username and password.
- **POST `/users/register`**: Register a new user.

#### **Game**

- **GET `/destinations/hints`**: Fetch a random destination with clues.
- **POST `/game/guess`**: Submit a guess and receive feedback.

#### **User**

- **GET `/users?userId=userId`**: Fetch a user’s profile and score.

## Hosting Services Used

- backend app - render
- frontend app - render
- PostgreSQL - supabase

## **Acknowledgments**

- **NestJS** for the robust backend framework.
- **Prisma** for simplifying database interactions.
- **Supabase** for PostgreSQL hosting.
