

## API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

### Auth Routes

| Method | Endpoint                | Access | Description          |
| ------ | ----------------------- | ------ | -------------------- |
| POST   | `/auth/register`        | Public | Register admin       |
| POST   | `/auth/login`           | Public | Admin login          |
| GET    | `/auth/refresh-token`   | Public | Refresh access token |
| PATCH  | `/auth/change-password` | Admin  | Change password      |

### Job Routes

| Method | Endpoint    | Access | Description     |
| ------ | ----------- | ------ | --------------- |
| GET    | `/jobs`     | Public | List all jobs   |
| GET    | `/jobs/:id` | Public | Get job details |
| POST   | `/jobs`     | Admin  | Create a job    |
| DELETE | `/jobs/:id` | Admin  | Delete a job    |

### Application Routes

| Method | Endpoint        | Access | Description            |
| ------ | --------------- | ------ | ---------------------- |
| POST   | `/applications` | Public | Submit job application |

---

## Request & Response Examples

### 1. Register Admin

**POST** `/api/v1/auth/register`

**Request:**

```json
{
  "name": "Admin User",
  "email": "admin@quickhire.com",
  "password": "admin123"
}
```

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "id": "06928033-418d-4f3d-a41a-92e0f37f48a6",
    "role": "ADMIN",
    "name": "Admin User",
    "email": "admin@quickhire.com",
    "createdAt": "2026-03-01T05:47:20.289Z",
    "updatedAt": "2026-03-01T05:47:20.289Z"
  }
}
```

---

### 2. Admin Login

**POST** `/api/v1/auth/login`

**Request:**

```json
{
  "email": "admin@quickhire.com",
  "password": "admin123"
}
```

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

> The `refreshToken` is set as an httpOnly cookie automatically.

---

### 3. Change Password

**PATCH** `/api/v1/auth/change-password`

**Headers:**

```
Authorization: <accessToken>
```

**Request:**

```json
{
  "oldPassword": "admin123",
  "newPassword": "admin456"
}
```

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Password changed successfully",
  "data": {
    "id": "06928033-418d-4f3d-a41a-92e0f37f48a6",
    "role": "ADMIN",
    "name": "Admin User",
    "email": "admin@quickhire.com",
    "createdAt": "2026-03-01T05:47:20.289Z",
    "updatedAt": "2026-03-01T05:48:51.424Z"
  }
}
```

---

### 4. Create Job (Admin)

**POST** `/api/v1/jobs`

**Headers:**

```
Authorization: <accessToken>
Content-Type: application/json
```

**Request:**

```json
{
  "title": "Backend Developer",
  "company": "QTech",
  "location": "Dhaka",
  "category": "Engineering",
  "description": "Build REST APIs with Node.js"
}
```

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Job created successfully",
  "data": {
    "id": "5e46b4f0-2793-46f1-b545-003932fc8bfb",
    "title": "Backend Developer",
    "company": "QTech",
    "location": "Dhaka",
    "category": "Engineering",
    "description": "Build REST APIs with Node.js",
    "createdAt": "2026-03-01T05:59:04.049Z"
  }
}
```

---

### 5. Get All Jobs

**GET** `/api/v1/jobs`

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": [
    {
      "id": "d3f87045-3d1f-42d1-bc47-7215b5a844ef",
      "title": "Frontend Developer",
      "company": "TechCorp",
      "location": "Remote",
      "category": "Engineering",
      "description": "React and TypeScript expertise needed",
      "createdAt": "2026-03-01T05:59:15.203Z"
    },
    {
      "id": "5e46b4f0-2793-46f1-b545-003932fc8bfb",
      "title": "Backend Developer",
      "company": "QTech",
      "location": "Dhaka",
      "category": "Engineering",
      "description": "Build REST APIs with Node.js",
      "createdAt": "2026-03-01T05:59:04.049Z"
    }
  ]
}
```

---

### 6. Get Single Job

**GET** `/api/v1/jobs/:id`

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Job retrieved successfully",
  "data": {
    "id": "5e46b4f0-2793-46f1-b545-003932fc8bfb",
    "title": "Backend Developer",
    "company": "QTech",
    "location": "Dhaka",
    "category": "Engineering",
    "description": "Build REST APIs with Node.js",
    "createdAt": "2026-03-01T05:59:04.049Z",
    "applications": [
      {
        "id": "deecd625-0fc5-489c-83d6-283f60bd05ca",
        "jobId": "5e46b4f0-2793-46f1-b545-003932fc8bfb",
        "name": "John Doe",
        "email": "john@example.com",
        "resumeLink": "https://resume.com/john",
        "coverNote": "I am interested in this role",
        "createdAt": "2026-03-01T06:00:00.006Z"
      }
    ]
  }
}
```

---

### 7. Delete Job (Admin)

**DELETE** `/api/v1/jobs/:id`

**Headers:**

```
Authorization: <accessToken>
```

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Job deleted successfully",
  "data": {
    "id": "d3f87045-3d1f-42d1-bc47-7215b5a844ef",
    "title": "Frontend Developer",
    "company": "TechCorp",
    "location": "Remote",
    "category": "Engineering",
    "description": "React and TypeScript expertise needed",
    "createdAt": "2026-03-01T05:59:15.203Z"
  }
}
```

> Deleting a job also deletes all associated applications (cascade).

---

### 8. Submit Application

**POST** `/api/v1/applications`

**Request:**

```json
{
  "jobId": "5e46b4f0-2793-46f1-b545-003932fc8bfb",
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://resume.com/john",
  "coverNote": "I am interested in this role"
}
```

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "deecd625-0fc5-489c-83d6-283f60bd05ca",
    "jobId": "5e46b4f0-2793-46f1-b545-003932fc8bfb",
    "name": "John Doe",
    "email": "john@example.com",
    "resumeLink": "https://resume.com/john",
    "coverNote": "I am interested in this role",
    "createdAt": "2026-03-01T06:00:00.006Z",
    "job": {
      "id": "5e46b4f0-2793-46f1-b545-003932fc8bfb",
      "title": "Backend Developer",
      "company": "QTech",
      "location": "Dhaka",
      "category": "Engineering",
      "description": "Build REST APIs with Node.js",
      "createdAt": "2026-03-01T05:59:04.049Z"
    }
  }
}
```

---

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errorMessages": [
    {
      "path": "",
      "message": "Detailed error message"
    }
  ]
}
```

### Common Errors

| Status | Message                         | Scenario                       |
| ------ | ------------------------------- | ------------------------------ |
| 400    | Admin already exists with email | Duplicate registration         |
| 400    | Please provide a valid email    | Invalid email format           |
| 401    | You are not authorized          | Missing auth token             |
| 401    | Password is incorrect           | Wrong password on login        |
| 403    | Forbidden                       | Non-admin accessing admin route|
| 403    | Only admin can login            | Non-admin user tries to login  |
| 404    | Admin not found                 | Email not found on login       |
| 404    | Job not found                   | Invalid job ID                 |

---

## How the System Works

```
┌──────────────┐     ┌──────────────┐     ┌───────────────┐
│   Client     │────>│   Express    │────>│  PostgreSQL    │
│  (Postman/   │<────│   Server     │<────│  (Prisma ORM)  │
│   Frontend)  │     │  Port: 5000  │     │               │
└──────────────┘     └──────────────┘     └───────────────┘
```

### Request Flow

```
Request → Route → Middleware(s) → Controller → Service → Prisma → Database
                                                              ↓
Response ← Controller ← Service ← Prisma ← Database Result
```

1. **Request** hits an Express route
2. **Middleware** chain runs in order:
   - `validateRequest` — validates body/params with Zod schemas
   - `auth` — verifies JWT token and checks role (for protected routes)
3. **Controller** extracts data from request, calls the service
4. **Service** contains business logic, interacts with database via Prisma
5. **Response** is sent back using `sendResponse` for a consistent format
6. **Errors** are caught by `catchAsync` and handled by `globalErrorHandler`

### Authentication Flow

```
Register → password hashed with bcrypt → saved to DB with role ADMIN
Login    → verify email → verify password → generate JWT tokens
                                            ├── accessToken  (sent in response)
                                            └── refreshToken (set in httpOnly cookie)
Protected Route → read Authorization header → verify JWT → check role → proceed
```
