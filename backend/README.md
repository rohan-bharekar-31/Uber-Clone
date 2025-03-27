# User Registration API

## Endpoint
**POST /users/register**

## Description
Registers a new user by validating the provided email, full name, and password. It uses `express-validator` to enforce:
- A valid email format.
- `fullname.firstName` with at least 3 characters.
- A password with a minimum of 6 characters.

## Request Body
- **email** (string): Required, must be a valid email.
- **fullname.firstName** (string): Required, at least 3 characters.
- **password** (string): Required, at least 6 characters.

## Validation Rules
The endpoint uses `express-validator` to ensure:
- `email` is a valid email.
- `fullname.firstName` meets the minimum character requirement.
- `password` meets the length requirement.

## Response Format

### Success (201 Created)
Returns a JSON containing:
- `token`: Authentication token.
- `user`: The created user object.

Example Response:
```json
{
  "token": "your.jwt.token.here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    // Other user details...
  }
}
```

### Error (400 Bad Request)
Returns a JSON object with an `errors` array detailing the validation errors.

Example Response:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstName",
      "location": "body"
    }
  ]
}
```

## Example Request

Request:
```json
{
  "email": "john.doe@example.com",
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "secret123"
}
```

## User Login API

### Endpoint
**POST /users/login**

### Description
Logs in an existing user by validating the provided email and password. Returns a JSON web token and the user object.

### Request Body
- **email** (string): Required, must be a valid email.
- **password** (string): Required, at least 6 characters.

### Response Format

#### Success (200 OK)
Returns a JSON containing:
- `token`: Authentication token.
- `user`: The logged in user object.

Example Response:
```json
{
  "token": "your.jwt.token.here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error (400 Bad Request or 401 Unauthorized)
Returns a JSON with an `errors` array detailing the failure reasons.

Example Response:
```json
{
  "errors": [
    {
      "msg": "Invalid Email or Password",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## User Profile API

### Endpoint
**GET /profile**

### Description
Fetches the profile details of the authenticated user.

### Authentication
Requires a valid token in a cookie or Authorization header.

### Response Format

#### Success (200 OK)
Returns a JSON containing the user profile.
```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user details...
  }
}
```

#### Error (401 Unauthorized)
Returns an error message.
```json
{
  "message": "Unauthorized"
}
```

## User Logout API

### Endpoint
**GET /logout**

### Description
Logs out the authenticated user by clearing the authentication cookie and blacklisting the token.

### Authentication
Requires a valid token in a cookie or Authorization header.

### Response Format

#### Success (200 OK)
Returns a JSON confirming logout.
```json
{
  "message": "Logged Out"
}
```

#### Error (401 Unauthorized)
Returns an error message.
```json
{
  "message": "Unauthorized"
}
```

## Captain Registration API

### Endpoint
**POST /capatin/register**

### Description
Registers a new captain by validating the provided fullname, email, password, and vehicle information. The endpoint creates a captain account and returns an authentication token along with the captain details.

### Request Body
- **fullname** (object): Required.
  - **firstname** (string): Required, at least 3 characters.
  - **lastname** (string): Required, at least 3 characters.
- **email** (string): Required, must be valid.
- **password** (string): Required.
- **vehicle** (object): Required.
  - **color** (string): Required, at least 3 characters.
  - **plate** (string): Required, at least 3 characters.
  - **capacity** (number): Required, minimum 1.
  - **vehicleType** (string): Required, one of: 'car', 'motorcycle', 'auto'.

### Response Format

#### Success (201 Created)
Returns a JSON containing:
- `token`: Authentication token.
- `captain`: The created captain object.

Example Response:
```json
{
  "token": "your.jwt.token.here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": "socket_123456",
    "status": "active",
    "vehicle": {
      "color": "red",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error (400 Bad Request)
Returns:
```json
{
  "errors": [
    {
      "msg": "All fields are required",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```
