# API Documentation - ADI-IO

This document describes the API structure for ADI-IO. Currently, the frontend is implemented, and this serves as the specification for the backend API that will be integrated in Q2 2026.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Projects API](#projects-api)
4. [Deployments API](#deployments-api)
5. [Team API](#team-api)
6. [System API](#system-api)
7. [KORDI AI API](#kordi-ai-api)
8. [Workspace API](#workspace-api)
9. [Error Handling](#error-handling)
10. [Rate Limiting](#rate-limiting)

---

## Overview

### Base URL

```
Development: http://localhost:3000/api
Production:  https://api.adi-io.dev
```

### API Version

Current version: `v1`

All endpoints are prefixed with `/api/v1/`

### Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "timestamp": "2026-02-17T16:45:00Z"
}
```

> **Note**: All timestamps in this documentation are examples showing the ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`). Actual API responses will use real-time values.

### Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  },
  "timestamp": "2026-02-17T16:45:00Z"
}
```

---

## Authentication

### Register

Create a new user account.

**Endpoint**: `POST /api/v1/auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2026-02-17T16:45:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

Authenticate a user.

**Endpoint**: `POST /api/v1/auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### GitHub OAuth

Authenticate with GitHub.

**Endpoint**: `GET /api/v1/auth/github`

Redirects to GitHub OAuth flow.

**Callback**: `GET /api/v1/auth/github/callback`

### Refresh Token

Get a new access token using refresh token.

**Endpoint**: `POST /api/v1/auth/refresh`

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout

Invalidate current session.

**Endpoint**: `POST /api/v1/auth/logout`

**Headers**: `Authorization: Bearer {token}`

---

## Projects API

### List Projects

Get all projects for the authenticated user.

**Endpoint**: `GET /api/v1/projects`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `status` (optional): Filter by status (active, archived)
- `search` (optional): Search by name
- `starred` (optional): Filter starred projects (true/false)

**Response**:
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "proj_123",
        "name": "My Awesome App",
        "description": "A great application",
        "repository": "https://github.com/user/repo",
        "status": "active",
        "starred": true,
        "commits": 247,
        "openPRs": 3,
        "healthScore": 98,
        "team": ["user_123", "user_456"],
        "lastDeployment": "2026-02-16T10:30:00Z",
        "lastModified": "2026-02-17T14:20:00Z",
        "createdAt": "2026-01-15T09:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 42,
      "totalPages": 3
    }
  }
}
```

### Get Project

Get a specific project by ID.

**Endpoint**: `GET /api/v1/projects/:id`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "proj_123",
    "name": "My Awesome App",
    "description": "A great application",
    "repository": "https://github.com/user/repo",
    "status": "active",
    "starred": true,
    "commits": 247,
    "openPRs": 3,
    "healthScore": 98,
    "team": [
      {
        "id": "user_123",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "owner"
      }
    ],
    "deployments": 156,
    "lastDeployment": "2026-02-16T10:30:00Z",
    "lastModified": "2026-02-17T14:20:00Z",
    "createdAt": "2026-01-15T09:00:00Z",
    "settings": {
      "autoDeployBranch": "main",
      "buildCommand": "npm run build",
      "outputDirectory": "dist"
    }
  }
}
```

### Create Project

Create a new project.

**Endpoint**: `POST /api/v1/projects`

**Request Body**:
```json
{
  "name": "My New Project",
  "description": "Project description",
  "repository": "https://github.com/user/new-repo",
  "settings": {
    "autoDeployBranch": "main",
    "buildCommand": "npm run build",
    "outputDirectory": "dist"
  }
}
```

### Update Project

Update an existing project.

**Endpoint**: `PUT /api/v1/projects/:id`

**Request Body**:
```json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "starred": true,
  "status": "active"
}
```

### Delete Project

Delete a project.

**Endpoint**: `DELETE /api/v1/projects/:id`

---

## Deployments API

### List Deployments

Get all deployments for a project.

**Endpoint**: `GET /api/v1/projects/:projectId/deployments`

**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status (pending, in_progress, success, failed)
- `platform` (optional): Filter by platform (vercel, netlify, etc.)

**Response**:
```json
{
  "success": true,
  "data": {
    "deployments": [
      {
        "id": "dep_123",
        "projectId": "proj_123",
        "status": "success",
        "platform": "vercel",
        "url": "https://my-app-abc123.vercel.app",
        "branch": "main",
        "commit": "a1b2c3d4",
        "duration": 45000,
        "startedAt": "2026-02-17T16:00:00Z",
        "completedAt": "2026-02-17T16:00:45Z",
        "createdBy": "user_123"
      }
    ],
    "pagination": { ... }
  }
}
```

### Get Deployment

Get a specific deployment.

**Endpoint**: `GET /api/v1/deployments/:id`

### Create Deployment

Trigger a new deployment.

**Endpoint**: `POST /api/v1/projects/:projectId/deployments`

**Request Body**:
```json
{
  "platform": "vercel",
  "branch": "main",
  "environment": "production",
  "config": {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "environmentVariables": {
      "NODE_ENV": "production"
    }
  }
}
```

### Get Deployment Logs

Stream deployment logs.

**Endpoint**: `GET /api/v1/deployments/:id/logs`

**WebSocket**: `wss://api.adi-io.dev/deployments/:id/logs`

**Response** (streaming):
```json
{
  "timestamp": "2026-02-17T16:00:10Z",
  "level": "info",
  "message": "Installing dependencies..."
}
```

### Cancel Deployment

Cancel a running deployment.

**Endpoint**: `POST /api/v1/deployments/:id/cancel`

---

## Team API

### List Team Members

Get all team members in an organization.

**Endpoint**: `GET /api/v1/team/members`

**Response**:
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "user_123",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://...",
        "role": "owner",
        "status": "active",
        "lastActive": "2026-02-17T16:00:00Z",
        "joinedAt": "2026-01-15T09:00:00Z"
      },
      {
        "id": "kordi_ai",
        "name": "KORDI",
        "type": "ai",
        "status": "active",
        "capabilities": ["code_generation", "deployment", "analysis"]
      }
    ]
  }
}
```

### Invite Team Member

Invite a new team member.

**Endpoint**: `POST /api/v1/team/invite`

**Request Body**:
```json
{
  "email": "newmember@example.com",
  "role": "developer",
  "projects": ["proj_123", "proj_456"]
}
```

### Get Activity Feed

Get recent team activity.

**Endpoint**: `GET /api/v1/team/activity`

**Query Parameters**:
- `limit` (optional): Number of activities (default: 50)
- `type` (optional): Filter by type (commit, pr, deployment, comment)

**Response**:
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "act_123",
        "type": "commit",
        "user": {
          "id": "user_123",
          "name": "John Doe"
        },
        "project": {
          "id": "proj_123",
          "name": "My App"
        },
        "description": "Added new feature",
        "timestamp": "2026-02-17T15:30:00Z"
      }
    ]
  }
}
```

---

## System API

### Get System Health

Get overall system health status.

**Endpoint**: `GET /api/v1/system/health`

**Response**:
```json
{
  "success": true,
  "data": {
    "uptime": 99.8,
    "status": "healthy",
    "services": {
      "api": "healthy",
      "database": "healthy",
      "deployments": "healthy",
      "ai": "healthy"
    },
    "activeBugs": 2,
    "activeDeployments": 15,
    "lastIncident": "2026-02-10T12:00:00Z"
  }
}
```

### Get System Metrics

Get detailed system metrics.

**Endpoint**: `GET /api/v1/system/metrics`

**Query Parameters**:
- `timeRange` (optional): Time range (1h, 24h, 7d, 30d)

**Response**:
```json
{
  "success": true,
  "data": {
    "timeRange": "24h",
    "metrics": {
      "deployments": {
        "total": 1247,
        "successful": 1189,
        "failed": 58,
        "successRate": 95.3
      },
      "performance": {
        "avgBuildTime": 42000,
        "avgDeploymentTime": 65000,
        "p95BuildTime": 89000
      },
      "resources": {
        "cpuUsage": 45.2,
        "memoryUsage": 62.8,
        "storageUsed": 234.5
      }
    }
  }
}
```

---

## KORDI AI API

### Send Message

Send a message to KORDI AI.

**Endpoint**: `POST /api/v1/kordi/chat`

**Request Body**:
```json
{
  "message": "Deploy my application",
  "context": {
    "projectId": "proj_123",
    "currentPage": "/deployments"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "messageId": "msg_123",
    "response": "I'll help you deploy your application. Starting deployment to Vercel...",
    "actions": [
      {
        "type": "deployment",
        "payload": {
          "projectId": "proj_123",
          "platform": "vercel"
        }
      }
    ],
    "suggestions": [
      "View deployment logs",
      "Configure environment variables",
      "Set up custom domain"
    ]
  }
}
```

### Voice Command

Process a voice command.

**Endpoint**: `POST /api/v1/kordi/voice`

**Request Body** (multipart/form-data):
```
audio: <audio_file.wav>
context: {
  "projectId": "proj_123"
}
```

**Response**: Same as Send Message

### Get Suggestions

Get AI-powered suggestions for the current context.

**Endpoint**: `GET /api/v1/kordi/suggestions`

**Query Parameters**:
- `projectId` (optional): Current project
- `context` (optional): Current page/context

**Response**:
```json
{
  "success": true,
  "data": {
    "suggestions": [
      {
        "id": "sug_123",
        "title": "Optimize build configuration",
        "description": "Your build time could be reduced by 30%",
        "action": "configure_build",
        "priority": "medium"
      }
    ]
  }
}
```

---

## Workspace API

### Get File Tree

Get the file structure of a project.

**Endpoint**: `GET /api/v1/projects/:projectId/files`

**Query Parameters**:
- `branch` (optional): Branch name (default: main)
- `path` (optional): Directory path (default: root)

**Response**:
```json
{
  "success": true,
  "data": {
    "tree": [
      {
        "path": "src",
        "type": "directory",
        "children": [
          {
            "path": "src/App.tsx",
            "type": "file",
            "size": 2048,
            "lastModified": "2026-02-17T10:00:00Z"
          }
        ]
      }
    ]
  }
}
```

### Get File Content

Get the content of a specific file.

**Endpoint**: `GET /api/v1/projects/:projectId/files/:path`

**Query Parameters**:
- `branch` (optional): Branch name

### List Branches

Get all branches for a project.

**Endpoint**: `GET /api/v1/projects/:projectId/branches`

**Response**:
```json
{
  "success": true,
  "data": {
    "branches": [
      {
        "name": "main",
        "commit": "a1b2c3d4",
        "protected": true,
        "default": true
      },
      {
        "name": "feature/new-ui",
        "commit": "e5f6g7h8",
        "protected": false,
        "default": false
      }
    ]
  }
}
```

### Create Branch

Create a new branch.

**Endpoint**: `POST /api/v1/projects/:projectId/branches`

**Request Body**:
```json
{
  "name": "feature/my-feature",
  "from": "main"
}
```

---

## Error Handling

### Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Request validation failed |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `CONFLICT` | Resource conflict |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `SERVER_ERROR` | Internal server error |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

### Example Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Validation failed",
    "details": {
      "fields": {
        "email": "Invalid email format",
        "password": "Password must be at least 8 characters"
      }
    }
  },
  "timestamp": "2026-02-17T16:45:00Z"
}
```

---

## Rate Limiting

### Limits

- **Authenticated**: 1000 requests per hour
- **Unauthenticated**: 60 requests per hour
- **Websocket Connections**: 10 concurrent connections per user

### Headers

Every response includes rate limit headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1645112400
```

### Exceeding Limits

When rate limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 45 minutes.",
    "details": {
      "retryAfter": 2700
    }
  }
}
```

---

## Webhooks

### Configure Webhooks

**Endpoint**: `POST /api/v1/webhooks`

**Request Body**:
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["deployment.started", "deployment.completed", "deployment.failed"],
  "secret": "your_webhook_secret"
}
```

### Webhook Events

- `deployment.started`
- `deployment.completed`
- `deployment.failed`
- `project.created`
- `project.updated`
- `team.member.added`
- `team.member.removed`

### Webhook Payload

```json
{
  "event": "deployment.completed",
  "timestamp": "2026-02-17T16:00:45Z",
  "data": {
    "deploymentId": "dep_123",
    "projectId": "proj_123",
    "status": "success",
    "url": "https://my-app.vercel.app"
  },
  "signature": "sha256=..."
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import { ADIIOClient } from '@adi-io/sdk';

const client = new ADIIOClient({
  apiKey: 'your_api_key',
});

// List projects
const projects = await client.projects.list();

// Create deployment
const deployment = await client.deployments.create('proj_123', {
  platform: 'vercel',
  branch: 'main',
});

// Chat with KORDI
const response = await client.kordi.chat('Deploy my app');
```

### Python

```python
from adiio import ADIIOClient

client = ADIIOClient(api_key='your_api_key')

# List projects
projects = client.projects.list()

# Create deployment
deployment = client.deployments.create(
    project_id='proj_123',
    platform='vercel',
    branch='main'
)
```

---

## Changelog

### Version 1.0 (Planned - Q2 2026)
- Initial API release
- Projects, Deployments, Team, System endpoints
- KORDI AI integration
- Workspace file management
- Webhooks support

---

**Last Updated**: February 2026  
**API Version**: v1 (Planned)
