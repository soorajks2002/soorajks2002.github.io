---
title: REST API Design Guide
date: January 30, 2024
excerpt: Learn how to design clean, intuitive REST APIs that developers love to use. Cover best practices for endpoints, status codes, and documentation.
---

# REST API Design Guide

Designing a great API is both an art and a science. A well-designed API can make developers' lives easier and drive adoption of your platform.

## URL Structure

### Resource-Based URLs
```
GET /users           # Get all users
GET /users/123       # Get specific user
POST /users          # Create new user
PUT /users/123       # Update user
DELETE /users/123    # Delete user
```

### Nested Resources
```
GET /users/123/posts       # Get user's posts
POST /users/123/posts      # Create post for user
```

## HTTP Methods

- **GET**: Retrieve data (idempotent)
- **POST**: Create new resources
- **PUT**: Update entire resource (idempotent)
- **PATCH**: Partial updates
- **DELETE**: Remove resources (idempotent)

## Status Codes

### Success Codes
- **200 OK**: Successful GET, PUT, PATCH
- **201 Created**: Successful POST
- **204 No Content**: Successful DELETE

### Client Error Codes
- **400 Bad Request**: Invalid request syntax
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource doesn't exist
- **422 Unprocessable Entity**: Validation errors

## Response Format

### Consistent Structure
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2024-01-30T10:00:00Z"
  }
}
```

### Error Responses
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "type": "required"
    }
  }
}
```

## Pagination

### Limit/Offset
```
GET /users?limit=20&offset=40
```

### Cursor-Based
```
GET /users?limit=20&cursor=eyJ1c2VyX2lkIjoxMjN9
```

## Versioning

### URL Versioning
```
GET /v1/users
GET /v2/users
```

### Header Versioning
```
Accept: application/vnd.api+json;version=1
```

## Security Best Practices

1. **Authentication**: Use JWT or OAuth 2.0
2. **Rate Limiting**: Prevent abuse
3. **Input Validation**: Sanitize all inputs
4. **HTTPS Only**: Encrypt all communications
5. **CORS**: Configure properly for web apps

Great APIs are intuitive, consistent, and well-documented. Follow these principles to create APIs that developers love! 