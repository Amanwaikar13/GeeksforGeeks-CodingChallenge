# GeeksforGeeks-CodingChallenge

This task demonstrates how to fetch and integrate data from multiple APIs using Express.js on the backend.

## Overview

This application fetches data from three different APIs:
- **Transactions API**: Provides data about product transactions.
- **Statistics API**: Computes various statistics based on transaction data.
- **Bar Chart API**: Aggregates data for displaying a bar chart based on transaction prices.

The backend server is built with Node.js and Express.js. The frontend is developed using React.js to visualize the fetched data.

## Features

- **Fetch Data**: Fetches transaction data, computes statistics, and aggregates data for the bar chart.
- **Integrated API**: Combines responses from multiple APIs into a single JSON response.
- **Search and Pagination**: Allows users to search transactions and paginate through the results.
- **Dynamic Charts**: Displays dynamic pie charts, bar charts, and statistical data based on selected criteria.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Axios for API calls
- **Charts**: Chart.js for visual representations

## Getting Started

To run this task locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <task_directory>
   
2. **Install dependencies:**

    ```bash
    Copy code
    cd backend
    npm install

    cd ../frontend
    npm install

3. **Set up environment variables:**

**Create a .env file in the backend directory and define the following variables:**

env
Copy code
PORT=5000
MONGODB_URI=<your_mongodb_uri>
Run the backend server:

    ```bash
        cd backend
        npm start
        Run the frontend development server:
  
        cd frontend
        npm start
        
        
**Access the application:**
**Open your browser and go to http://localhost:3000 to view the application.**
