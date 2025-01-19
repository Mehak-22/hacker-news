# Hacker News Scraper

This Node.js service scrapes real-time stories from Hacker News and stores them in a MySQL database. It also uses WebSocket to broadcast new stories to connected clients in real-time.

## Features

- **Scrapes** new stories from Hacker News and stores them in a MySQL database.
- **WebSocket Streaming**: Broadcast new stories to clients as soon as they are scraped.
- **REST API**: Provides access to the scraped stories.
- **MySQL Integration**: Stores and manages stories in the MySQL database.
- **Real-Time Updates**: Clients receive updates for new stories published in the last 5 minutes.

## Technologies Used

- Node.js
- Express.js
- Axios (for HTTP requests)
- MySQL (for data storage)
- WebSocket (for real-time communication)
- dotenv (for environment variables)
- nodemon (for auto-reloading during development)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mehak-22/hacker-news.git
cd hacker-news-scraper

Install Dependencies
npm install

Do changes in .env file as per your database
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=hackernews

Run the following command 
npm run dev
