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
