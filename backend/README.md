# Backend API Documentation

This document provides details about the available API endpoints for the backend.

---

## User Routes

### Register User
- **Endpoint:** `POST /users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "secret123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "token": "your.jwt.token.here",
    "user": { /* user details */ }
  }
  ```
- **Errors:** 400 for validation errors, 401 if registration fails.

### Login User
- **Endpoint:** `POST /users/login`
- **Description:** Authenticates an existing user.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "secret123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "your.jwt.token.here",
    "user": { /* user details */ }
  }
  ```
- **Errors:** 400 or 401 on failed validation/authentication.

### Get User Profile
- **Endpoint:** `GET /users/profile`
- **Description:** Retrieves the profile of the authenticated user.
- **Authentication:** Requires valid token.
- **Response (200 OK):**
  ```json
  {
    "user": { /* user details */ }
  }
  ```

### Logout User
- **Endpoint:** `GET /users/logout`
- **Description:** Logs out the user.
- **Authentication:** Requires valid token.
- **Response (200 OK):**
  ```json
  {
    "message": "Logged Out"
  }
  ```

---

## Captain Routes

### Register Captain
- **Endpoint:** `POST /captains/register`
- **Description:** Registers a new captain with vehicle details.
- **Request Body:**
  ```json
  {
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "password": "secret123",
    "vehicle": {
      "color": "red",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "token": "your.jwt.token.here",
    "captain": { /* captain details */ }
  }
  ```
- **Errors:** 400 for validation errors, 401 for duplicate accounts.

### Login Captain
- **Endpoint:** `POST /captains/login`
- **Description:** Authenticates an existing captain.
- **Request Body:**
  ```json
  {
    "email": "jane.doe@example.com",
    "password": "secret123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "your.jwt.token.here",
    "captain": { /* captain details */ }
  }
  ```
- **Errors:** 400 or 401 on failed validation/authentication.

### Get Captain Profile
- **Endpoint:** `GET /captains/profile`
- **Description:** Retrieves the profile of the authenticated captain.
- **Authentication:** Requires valid token.
- **Response (200 OK):**
  ```json
  {
    "captain": { /* captain details */ }
  }
  ```

### Logout Captain
- **Endpoint:** `GET /captains/logout`
- **Description:** Logs out the captain.
- **Authentication:** Requires valid token.
- **Response (200 OK):**
  ```json
  {
    "message": "Logged Out"
  }
  ```

---

## Ride Routes

### Create Ride
- **Endpoint:** `POST /rides/create`
- **Description:** Creates a new ride request. Calculates fare based on pickup and destination.
- **Authentication:** User
- **Request Body:**
  ```json
  {
    "pickup": "Pickup address",
    "destination": "Destination address",
    "vehicleType": "car" // Allowed: "car", "auto", "bike"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "ride": {
      "_id": "ride_id_here",
      "user": "user_id_here",
      "pickup": "Pickup address",
      "destination": "Destination address",
      "vehicleType": "car",
      "fare": 100, // Calculated fare
      "status": "pending"
    }
  }
  ```
- **Errors:** 400 for validation errors, 500 for server errors.

### Get Fare
- **Endpoint:** `GET /rides/get-fare`
- **Description:** Retrieves fare estimates for different vehicle types based on distance and duration.
- **Authentication:** User
- **Query Parameters:**
  - `pickup`: string (min 3 chars)
  - `destination`: string (min 3 chars)
- **Response (201 Created):**
  ```json
  {
    "fare": {
      "car": 100,
      "auto": 80,
      "bike": 60
    }
  }
  ```
- **Errors:** 400 or 500 on failure.

### Confirm Ride
- **Endpoint:** `POST /rides/confirm`
- **Description:** A captain confirms a ride, updating its status to accepted and assigning the captain.
- **Authentication:** Captain
- **Request Body:**
  ```json
  {
    "rideId": "ride_id_here"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "_id": "ride_id_here",
    "user": { /* populated user details */ },
    "captain": "captain_id_here",
    "status": "accepted"
  }
  ```
- **Errors:** 400 for validation errors, 500 for server errors.

### Start Ride
- **Endpoint:** `GET /rides/start-ride`
- **Description:** Starts a ride after verifying the provided OTP.
- **Authentication:** Captain
- **Query Parameters:**
  - `rideId`: string (valid MongoDB ID)
  - `otp`: string (6 characters)
- **Response (200 OK):**
  ```json
  {
    "_id": "ride_id_here",
    "status": "ongoing"
  }
  ```
- **Errors:** 400 for validation errors, 500 for server errors or invalid OTP.

### End Ride
- **Endpoint:** `POST /rides/end-ride`
- **Description:** Ends a ride by updating its status to completed.
- **Authentication:** Captain
- **Request Body:**
  ```json
  {
    "rideId": "ride_id_here"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "_id": "ride_id_here",
    "status": "completed"
  }
  ```
- **Errors:** 400 for validation errors, 500 for server errors.

---

## Maps Routes

### Get Coordinates
- **Endpoint:** `GET /maps/get-coordinates`
- **Description:** Retrieves geographic coordinates (latitude and longitude) for a given address using the Google Maps Geocoding API.
- **Authentication:** User
- **Query Parameters:**
  - `address`: string (min 3 characters)
- **Response (200 OK):**
  ```json
  {
    "ltd": 12.9716,
    "lng": 77.5946
  }
  ```
- **Errors:** 400 if address is invalid or not found.

### Get Distance and Time
- **Endpoint:** `GET /maps/get-distance-time`
- **Description:** Calculates the distance and estimated duration between two addresses using the Google Maps Distance Matrix API.
- **Authentication:** User
- **Query Parameters:**
  - `origin`: string (min 3 characters)
  - `destination`: string (min 3 characters)
- **Response (200 OK):**
  ```json
  {
    "distance": { "text": "10 km", "value": 10000 },
    "duration": { "text": "15 mins", "value": 900 }
  }
  ```
- **Errors:** 400 for invalid addresses or API errors.

### Get AutoComplete Suggestions
- **Endpoint:** `GET /maps/get-suggestions`
- **Description:** Provides address suggestions based on an input query using the Google Maps Places Autocomplete API.
- **Authentication:** User
- **Query Parameters:**
  - `input`: string (min 3 characters)
- **Response (200 OK):**
  ```json
  [
    "Address 1",
    "Address 2",
    "Address 3"
  ]
  ```
- **Errors:** 400 for invalid input values.

---

Ensure your environment variables are correctly set (see `.env`) and that your MongoDB URL and Google Maps API key are valid.

Happy coding!
