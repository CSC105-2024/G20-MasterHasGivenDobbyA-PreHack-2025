# G20-MasterHasGivenDobbyA-PreHack-2025

## :musical_score: Lyriverse

_Our project is a website for users to find song lyrics easily ,User can search the song for lyrics  and if that song does not have the lyrics yet users can add the lyrics of that song also can edit the lyrics to improve accuracy of the lyrics. For delete the song only the lyrics provider can delete song. This project helps solve the problem for people who do not know the song lyrics by providing a website where they can search, contribute, and improve accuracy song lyrics in one place._

---

## :eight_spoked_asterisk: Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CSC105-2024/G20-MasterHasGivenDobbyA-PreHack-2025.git
   cd G20-MasterHasGivenDobbyA-PreHack-2025
   ```

---
## :round_pushpin: Alternative for running the server

- Run Front-end only:
  ```bash
  npm run frontend
  ```
- Run Back-end only:
  ```bash
  npm run backend
  ```
- Run the project (front-end & back-end):
  ```bash
  npm run dev
  ```
## :computer: Frontend - React

### :space_invader: Tech Stack

- React.ts
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- Zod
- React Icon

### :bulb: Getting Started - React Client

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The client will be running on [http://localhost:5173](http://localhost:5173).

---

## :open_file_folder: Backend - Node.js

### :space_invader: Tech Stack

- Node.js
- Hono
- MySQL
- Bcrypt
- JWT

### :electric_plug: API Endpoints

- User

| Method |            Endpoint           |                 Description                  |
|--------|-------------------------------|----------------------------------------------|
| GET    | `/user/getuser/:id`           | Get user by query ID.                        |
| GET    | `/user/getusername:username`  | Get the username of user by query username.  |
| GET    | `/user/me/:userId`            | To check that the user is found or not.      |
| POST   | `/user/create`                | Create the user.                             |

- Authentication

| Method |       Endpoint         |              Description               |
|--------|------------------------|----------------------------------------|
| POST    | `/auth/register`      | Create the account for the user.       |
| POST    | `/auth/login`         | Loging in to navigate to our website.  |


- Songs

| Method |          Endpoint        |                   Description                   |
|--------|--------------------------|-------------------------------------------------|
| GET    | `/song/getallsongs`      | Get all song in the System.                     |
| GET    | `/song/getsongbyid/:id`  | Get song by user ID.                            |
| GET    | `/song/search/:keyword`  | Get song by name of the song using keyword.     |
| POST   | `/song/create`           | Create the new song with lyrics.                |
| PUT    | `/song/edit/:id`         | Update the lyrics of that songs by using ID.    |
| DELETE | `/song/delete/:userId`   | Delete song by get authToken to use user ID.    |


### :bulb: Getting Started - Node.js Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies & Genrate the database:
   ```bash
   npm install
   npx prisma generate
   ```

3. Create a `.env` file and configure the following variables:
   ```
   DATABASE_URL="mysql://user20:y6cMhAfkiK6i@cshackathon.sit.kmutt.ac.th:3306/group20_prehack"

   SHADOW_DATABASE_URL="mysql://user20:y6cMhAfkiK6i@cshackathon.sit.kmutt.ac.th:3306/group20_prehack_shadow"

   JWT_SECRET="974e96071630764a65667643433153c60a9e33e33a4319eb1468273a8b496b0d"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The server will be running on [http://localhost:3000](http://localhost:3000)
