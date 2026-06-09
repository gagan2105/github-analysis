# GitHub Profile Analyzer API

A backend service built with Node.js, Express.js, and MySQL that analyzes a GitHub user profile using the public GitHub API and stores insights.

## Features
- Fetch public profile data from GitHub using a username
- Store useful insights (Public repositories, followers, following, bio, location, etc.) in MySQL
- API to fetch a list of all stored analyzed profiles
- API to fetch data of a single stored profile

## Tech Stack
- **Node.js**
- **Express.js**
- **MySQL**
- **Axios** (for GitHub API requests)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/gagan2105/github-analysis.git
   cd github-analysis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Ensure MySQL is installed and running.
   - Run the provided `database.sql` script to create the database and table.
   ```sql
   source database.sql;
   ```

4. **Environment Variables**
   - Rename `.env.example` to `.env`
   - Update the database credentials in `.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=github_analyzer
   ```

5. **Run the server**
   ```bash
   # Development
   npm run dev
   # OR
   node server.js
   ```

## API Endpoints

- `POST /api/profiles/analyze/:username` - Analyzes a GitHub profile and stores it in the database.
- `GET /api/profiles` - Returns a list of all analyzed profiles.
- `GET /api/profiles/:username` - Returns details of a specific analyzed profile.

## Postman Collection
A Postman collection is included in the `postman` directory to test the API endpoints easily. Import `GitHub_Profile_Analyzer.postman_collection.json` into Postman.
