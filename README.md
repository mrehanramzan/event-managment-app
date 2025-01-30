# Event Managment App

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB Cloud

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/mrehanramzan/event-managment-app.git
    ```
2. Navigate into the project directory:
    ```bash
    cd event-managment-app
    ```
3. Install dependencies for both the client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    cd ..
    ```

### Starting the Client and Server
To start the client and server, you'll need to open two terminal windows or tabs:

1. **Client**
    In the first terminal, navigate to the `client` directory and start the client:
    ```bash
    cd client
    npm run dev
    ```
    The client will start on `localhost:5173`.

2. **Server**
    In the second terminal, navigate to the `server` directory and start the server:
    ```bash
    cd server
    npm run dev
    ```
    The server will start on `localhost:8080` (or whatever port you have configured).

### Functionality to Implement

#### Update API
- **Description**: Implement an API endpoint to allow users to update event details.
- **Implementation**:
    - Create an endpoint (e.g., `PUT /api/events/:id`) in your server application.
    - Validate the input data.
    - Update the event in the database.
    - Return the updated event details to the client.

#### Event API
- **Description**: Implement an API to manage events (create, read, update, delete).
- **Implementation**:
    - Create endpoints for each operation (`GET /api/events`, `POST /api/events`, `PUT /api/events/:id`, `DELETE /api/events/:id`) in your server application.
    - Ensure appropriate validation and error handling.

#### Schedule a Cron Job
- **Description**: Schedule a cron job to run every day and check for today's reminders, sending emails to those who follow the event.
- **Implementation**:
    - Use a scheduler library like `node-cron` or similar.
    - Set up a cron job that runs daily.
    - Retrieve events and their reminders for the day.
    - Send email notifications to users.

#### Share Link to Event
- **Description**: Allow users to share a link to the event and collect emails from those who want to follow it.
- **Implementation**:
    - Generate unique shareable links for each event.
    - Create a landing page where users can enter their email to follow the event.
    - Store these emails and associate them with the respective event.
