# EduVerse: AI-Powered Adaptive Learning Platform  

## 🚀 Introduction  
**EduVerse** is an AI-driven adaptive learning platform designed to provide a personalized learning experience. It fetches free Udemy courses, allowing users to access high-quality educational content while incorporating intelligent assessment and evaluation features from **QuizMate**. 📚🚀  

## 🎯 Features  
- **Fetch Free Udemy Courses** – Users can browse and access free Udemy courses in various categories.  
- **AI-Driven Assessments** – Adaptive quizzes evaluate users' understanding and suggest improvements.  
- **Detailed Analytics & Accuracy Scores** – Tracks progress, completion rates, and performance insights.  
- **Leaderboard & Competitive Learning** – Ranks users based on quiz scores and course completion.  
- **Quiz Management (Admin)** – Create, update, and manage quizzes with an intuitive UI.  
- **Mail Notifications** – Sends notifications when new quizzes or courses are available.  
- **User Settings** – Enables reattempt options for quizzes and customization of learning preferences.  
- **Secure Authentication & Role Management** – Users can register, log in, and access content based on their roles.  

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js  
- **Frontend:** Tailwind CSS, Alpine.js  
- **Database:** MySQL  
- **Authentication & Roles:** Csurf, Express Session  
- **API Integration:** Udemy Free Course API  

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```sh  
git clone https://github.com/yourusername/eduverse.git  
cd eduverse  
```

### 2️⃣ Setup Database Credentials  
```js  
const mysql = require('mysql2');  

const db = mysql  
  .createPool({  
    host: 'localhost',  
    user: 'username',  
    password: 'password',  
    database: 'databasename',  
  })  
  .promise();  

module.exports = db;  
```

### 3️⃣ Setup Database  
```sql  
-- Users Table  
CREATE TABLE users (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    username VARCHAR(255) NULL,  
    email VARCHAR(255) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    phone VARCHAR(20) NULL,  
    location VARCHAR(255) NULL,  
    gender VARCHAR(20) NULL,  
    role VARCHAR(20) DEFAULT 'user' ,
    dob date
);

-- Courses Table  
CREATE TABLE courses (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,  
    description TEXT NULL,  
    url VARCHAR(255) NOT NULL,  
    category VARCHAR(255) NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

-- Quizzes Table  
CREATE TABLE quizzes (  
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    quiz_name VARCHAR(255) NOT NULL,  
    description VARCHAR(255) NULL,  
    send_email TINYINT(1) NOT NULL DEFAULT 0,  
    reattempt TINYINT(1) NOT NULL DEFAULT 1  
);

-- Questions Table  
CREATE TABLE questions (  
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    quiz_id INT NULL,  
    question TEXT NOT NULL,  
    option_a TEXT NULL,  
    option_b TEXT NULL,  
    option_c TEXT NULL,  
    option_d TEXT NULL,  
    correct_answer CHAR(1) NULL  
);

-- Quiz Attempts Table  
CREATE TABLE quiz_attempts (  
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    user_id INT NULL,  
    quiz_id INT NULL,  
    score DECIMAL(5,2) NULL,  
    attempt_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP  
);

-- Contacts Table
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4️⃣ Start the Server  
```sh  
node app.js  
```

