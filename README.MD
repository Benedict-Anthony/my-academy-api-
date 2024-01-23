# My Academy API

The Academy API is a backend solution designed to support educational institutions

## Key Features

- **User Authentication:** Secure user registration and login functionalities powered by JWT (JSON Web Tokens) for enhanced security.

- **Class Management:** Efficiently handle class-related operations, including class creation, retrieval, updating, and deletion.

- **User Profiles:** Manage detailed user profiles for students, capturing essential information such as name, surname, and class affiliation.

### Project Structure

```
project-root/
|   |-- controllers/
|   |   |-- authController.ts
|   |   |-- classController.ts
|   |   |-- profileController.ts
|   |   |-- subjectController.ts
|   |-- middlewares/
|   |   |-- authMiddleware.ts
|   |   |-- errorMiddleware.ts
|   |-- models/
|   |   |-- classModel.ts
|   |   |-- subjectModel.ts
|   |   |-- userProfileModel.ts
|   |   |-- userModel.ts
|   |-- routes/
|   |   |-- authRoutes.ts
|   |   |-- classRoutes.ts
|   |   |-- profileRoutes.ts
|   |   |-- subjectRoutes.ts
|   |-- server.ts
|-- .env
|-- tsconfig.json
|-- package.json
|-- README.md
```

## Authentication API Documentation

This document outlines the API endpoints and usage for the authentication system.

## Base URL

All endpoints are relative to the base URL: `/api/auth`

## Endpoints

### User Signup

**Endpoint**: `POST /signup`

Create a new user account.

**Request Body:**

```json
{
  "username": "example",
  "email": "example@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "success": true,
  "username": "example",
  "email": "example@example.com",
  "token": "your-generated-jwt-token"
}
```

### User Login

**Endpoint**: `POST /login`

Authenticate an existing user.

**Request Body:**

```json
{
  "email": "example@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "success": true,
  "username": "example",
  "email": "example@example.com",
  "token": "your-generated-jwt-token"
}
```

## Error Responses

- If the email or password is incorrect during login:

  ```json
  {
    "success": false,
    "message": "email or password incorrect"
  }
  ```

- If a required field is missing during signup:
  ```json
  {
    "success": false,
    "message": "Validation failed: username: this field is required"
  }
  ```

## Notes

- Make sure to include the generated JWT token in the headers of subsequent requests for authentication.
- Tokens should be included in the `Authorization` header using the `Bearer` scheme.

## User Profile Management API Documentation

This document outlines the API endpoints and usage for managing user profiles.

## Base URL

All endpoints are relative to the base URL: `/api/profile`

## Endpoints

### Create User Profile

**Endpoint**: `POST /`

Create a new user profile.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Request Body:**

```json
{
  "class": "class-id",
  "surname": "John",
  "firstName": "Doe",
  "lastName": "Smith"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "profile-id",
    "user": {
      "username": "example",
      "email": "example@example.com"
    },
    "class": "class-id",
    "surname": "John",
    "firstName": "Doe",
    "lastName": "Smith"
  }
}
```

### Retrieve User Profile

**Endpoint**: `GET /`

Retrieve the user's profile.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "profile-id",
    "user": {
      "username": "example",
      "email": "example@example.com"
    },
    "class": "class-id",
    "surname": "John",
    "firstName": "Doe",
    "lastName": "Smith"
  }
}
```

### Update User Profile

**Endpoint**: `PUT /`

Update the user's profile.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Request Body:**

```json
{
  "class": "new-class-id",
  "surname": "Updated",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "profile-id",
    "user": {
      "username": "example",
      "email": "example@example.com"
    },
    "class": "new-class-id",
    "surname": "Updated",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Error Responses

- If a required field is missing during profile creation or update:
  ```json
  {
    "success": false,
    "message": "Validation failed: class: this field is required"
  }
  ```

## Subject Management API Documentation

This document outlines the API endpoints and usage for managing subjects.

## Base URL

All endpoints are relative to the base URL: `/api/subjects`

## Endpoints

### Create Subject

**Endpoint**: `POST /`

Create a new subject.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Request Body:**

```json
{
  "subjectName": "Math",
  "description": "Introduction to mathematics",
  "teacher": "teacher-id",
  "class": "class-id"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "subject-id",
    "subjectName": "Math",
    "description": "Introduction to mathematics",
    "teacher": {
      "username": "teacher",
      "email": "teacher@example.com"
    },
    "class": "class-id"
  }
}
```

### Retrieve Subjects

**Endpoint**: `GET /`

Retrieve all subjects.

**Response:**

```json
{
  "count": 3,
  "data": [
    {
      "_id": "subject-id-1",
      "subjectName": "Math",
      "description": "Introduction to mathematics",
      "teacher": {
        "username": "teacher1",
        "email": "teacher1@example.com"
      },
      "class": "class-id-1"
    },
    {
      "_id": "subject-id-2",
      "subjectName": "Science",
      "description": "Introduction to science",
      "teacher": {
        "username": "teacher2",
        "email": "teacher2@example.com"
      },
      "class": "class-id-2"
    }
    // ... more subjects
  ]
}
```

### Retrieve Single Subject

**Endpoint**: `GET /:id`

Retrieve a single subject by ID.

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "subject-id",
    "subjectName": "Math",
    "description": "Introduction to mathematics",
    "teacher": {
      "username": "teacher",
      "email": "teacher@example.com"
    },
    "class": "class-id"
  }
}
```

### Update Subject

**Endpoint**: `PUT /:id`

Update a subject by ID.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Request Body:**

```json
{
  "subjectName": "Updated Math",
  "description": "Updated introduction to mathematics",
  "teacher": "new-teacher-id",
  "class": "new-class-id"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "subject-id",
    "subjectName": "Updated Math",
    "description": "Updated introduction to mathematics",
    "teacher": {
      "username": "new-teacher",
      "email": "new-teacher@example.com"
    },
    "class": "new-class-id"
  }
}
```

### Delete Subject

**Endpoint**: `DELETE /:id`

Delete a subject by ID.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Response:**

```json
{
  "success": true,
  "message": "Subject deleted successfully"
}
```

## Class Management API Documentation

This document outlines the API endpoints and usage for managing classes.

## Base URL

All endpoints are relative to the base URL: `/api/classes`

## Endpoints

### Create Class

**Endpoint**: `POST /`

Create a new class.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Request Body:**

```json
{
  "name": "Math101"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "class-id",
    "name": "Math101",
    "createdAt": "2024-01-23T12:34:56.789Z",
    "updatedAt": "2024-01-23T12:34:56.789Z"
  }
}
```

### Retrieve Classes

**Endpoint**: `GET /`

Retrieve all classes.

**Response:**

```json
{
  "count": 3,
  "data": [
    {
      "_id": "class-id-1",
      "name": "Math101",
      "createdAt": "2024-01-23T12:34:56.789Z",
      "updatedAt": "2024-01-23T12:34:56.789Z"
    },
    {
      "_id": "class-id-2",
      "name": "Science202",
      "createdAt": "2024-01-23T12:34:56.789Z",
      "updatedAt": "2024-01-23T12:34:56.789Z"
    }
    // ... more classes
  ]
}
```

### Retrieve Single Class

**Endpoint**: `GET /:id`

Retrieve a single class by ID.

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "class-id",
    "name": "Math101",
    "createdAt": "2024-01-23T12:34:56.789Z",
    "updatedAt": "2024-01-23T12:34:56.789Z",
    "subjects": [
      {
        "subjectName": "Physics",
        "description": "Introduction to physics"
      },
      {
        "subjectName": "Chemistry",
        "description": "Introduction to chemistry"
      }
    ]
  }
}
```

### Update Class

**Endpoint**: `PUT /:id`

Update a class by ID.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Request Body:**

```json
{
  "name": "UpdatedMath101"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "class-id",
    "name": "UpdatedMath101",
    "createdAt": "2024-01-23T12:34:56.789Z",
    "updatedAt": "2024-01-23T12:34:56.789Z"
  }
}
```

### Delete Class

**Endpoint**: `DELETE /:id`

Delete a class by ID.

**Request Headers:**

- `Authorization`: Bearer Token (User authentication token)

**Response:**

```json
{
  "success": true,
  "message": "Class deleted successfully"
}
```

## Notes
