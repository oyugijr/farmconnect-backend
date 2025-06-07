# Farmconnect Backend

## Overview

Farmconnect Backend is a RESTful API designed to facilitate the management of farm-related data, including crops, livestock, and farm operations. It provides endpoints for CRUD operations on various resources and integrates with a PostgreSQL database.

## Features

- **Crops Management**: Create, read, update, and delete crop records.
- **Livestock Management**: Manage livestock records with detailed information.
- **Farm Operations**: Track farm operations and their associated data.
- **Authentication**: Secure access to the API using JWT tokens.
- **Database Integration**: Uses PostgreSQL for persistent data storage.
- **Environment Configuration**: Configurable via environment variables for flexibility across different environments.
- **Error Handling**: Comprehensive error handling for better debugging and user experience.
- **Logging**: Integrated logging for monitoring and debugging purposes.
- **Testing**: Unit tests for critical components to ensure reliability.
- **Documentation**: API documentation generated using Swagger for easy reference.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for building the RESTful API.
- **PostgreSQL**: Relational database for data storage.
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **JWT**: JSON Web Tokens for authentication.
- **Swagger**: API documentation tool for generating interactive API docs.
- **dotenv**: For managing environment variables.
- **Mocha/Chai**: Testing framework for unit tests.
- **Winston**: Logging library for structured logging.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Neon PostgreSQL (version 12 or higher)
- npm (Node package manager)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```bash
   git Clone <repository-url>
   ```  

2. Navigate to the project directory:

   ```bash
    cd farmconnect-backend
    ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure your environment variables. You can use the `.env.example` file as a reference.
5. Set up the PostgreSQL database and run migrations:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. Start the server:

   ```bash  
   docker-compose up --build
   ```

7. Access the API documentation at `http://localhost:3000/api-docs`.

## Running Tests

To run the unit tests, use the following command:

```bash
npm test        # Run all tests
npm run test:unit  # Run only unit tests
npm run test:integration  # Run only integration tests
npm run test:coverage  # Run with coverage report
```

## Key Features:

- JWT Authentication with session management
- Real-time price alerts via WebSocket
- Market trend analysis algorithm
- Buyer verification system
- Twilio WhatsApp integration
- Prisma ORM with PostgreSQL
- Docker containerization
- Comprehensive error handling
- Request validation
- Production-ready logging
- CORS security
- Rate limiting (to add)
- API documentation (to add)

## Endpoints Structure:

```plaintext
GET    /api/auth/register       - User registration/login
GET    /api/market/prices       - Get market prices
POST   /api/market/refresh      - Refresh market data
GET    /api/buyers              - List verified buyers
POST   /api/buyers/contact      - Log buyer contact
```
