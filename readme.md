# Yellow Card Fintech Solution

This project is a fintech solution built using the Yellow Card API. The solution allows users to initiate and complete withdrawal transactions. The backend is built with Node.js and Express, and the frontend is built with React. This README provides an overview of the project, setup instructions, and details on the functionality and integration with the Yellow Card API.

## Project Overview

### Features

- **User Authentication**: Secure login for users.
- **Fetch Available Channels, networks and rates**: Retrieve and display available withdrawal channels, networks, and rates.
- **Add Amount**: Allow users to input the withdrawal amount.
- **Confirm Destination**: Confirm recipient details before submitting the payment request.
- **Submit Payment Request**: Allow users to submit withdrawal requests.
- **Transaction Status**: Check the status of transactions to ensure they reach a final state (Complete / Failed).

## API Integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Backend Setup

1. **Navigate to the Backend Directory**

    ```bash
    cd backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or if using yarn
    yarn install
    ```

3. **Environment Variables**

    Create a `.env` file in the root of the backend directory and add the following variables:

    ```env
    PORT=4000
    API_BASE_URL=https://sandbox.yellowcard.io/api
    API_KEY=c5315180696a51ab885023bdc1ae3c0e
    SECRET_KEY=81473a4ca26a28203aa4a8e26afe571bf097ec5a2a5c2acd41c83a7968c4cf3b
    ```

4. **Start the Backend Server**

    ```bash
    npm start
    # or if using yarn
    yarn start
    ```

    The backend server should now be running on `http://localhost:4000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**

    ```bash
    cd frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or if using yarn
    yarn install
    ```

3. **Environment Variables**

    Create a `.env` file in the root of the frontend directory and add the following variables:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:4000/api
    ```

4. **Start the Frontend Application**

    ```bash
    npm start
    # or if using yarn
    yarn start
    ```

    The frontend application should now be running on `http://localhost:3000`.

## Usage

1. **Fetch Available Channels**

    - Get active withdrawal channels from the Yellow Card API.
    - Fetch supported countries for each withdrawal channel.
    - Retrieve available payment networks for selected withdrawal channels.
    - Fetch currency conversion rates for the selected withdrawal channel and amount.

2. **Add Amount**

    - Allow users to input the withdrawal amount.

3. **Confirm Destination**

    - Confirm recipient details before submitting the payment request.

4. **Submit Payment Request**

    - Submit the payment request to Yellow Card API.

5. **Transaction Status**

    - Check the status of transactions to ensure they reach a final state (Complete / Failed).

## Challenges Faced

- **Incorrect API Endpoints**: Some endpoints in the Yellow Card API documentation were incorrect, leading to issues with integration. For example, the `/details/${network.accountNumberType}` endpoint did not return the expected data.

- **CORS Issues**: Initially faced issues with Cross-Origin Resource Sharing (CORS). Solved by properly configuring CORS in the backend.

- **Error Handling**: Ensuring robust error handling for network issues and API errors to provide a smooth user experience.

## Solution Specifications

- **Backend**: Node.js-Typescript with Express
- **Frontend**: React with TypeScript
- **API Integration**: Utilizes Yellow Card API for fetching channels, submitting payment requests, and checking transaction status.
- **Authentication**: Implemented basic authentication for user security.

## Demo Video

A demo of the solution can be accessed [here](https://youtu.be/4bwhEkxb1Uw).

## Conclusion

This project demonstrates a basic integration with Yellow Card's API, enabling users to withdraw funds using various payment methods. It includes detailed setup instructions and documentation on the implemented features.
