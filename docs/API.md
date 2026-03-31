# API Documentation

All API endpoints require authentication via NextAuth.js session.

## Authentication

Authentication is handled by NextAuth.js. Session tokens are validated automatically by Next.js middleware for protected routes.

## Endpoints

### Campaigns

#### POST /api/campaigns

Create a new campaign.

**Request:**
```json
{
  "name": "April 2026 Campaign",
  "startDate": "2026-04-01",
  "endDate": "2026-04-30"
}
```

**Response:**
```json
{
  "campaign": {
    "id": "clx...",
    "name": "April 2026 Campaign",
    "status": "DRAFT",
    "...": "..."
  }
}
```

#### GET /api/campaigns/[id]/export

Export campaign as markdown or PDF.

**Query Parameters:**
- `format` - "markdown" (default) or "pdf"

**Response:** File download with Content-Disposition header

### Brainstorming

#### POST /api/brainstorm/generate

Generate AI campaign design from brainstorm answers.

**Request:**
```json
{
  "campaignId": "clx...",
  "answers": [
    {
      "questionId": "objectives",
      "value": ["lead-generation"],
      "timestamp": "2026-03-31T..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "campaign": {
    "designSpec": "... markdown content ...",
    "posts": [...]
  }
}
```

## Error Responses

All endpoints return standard error responses:

```json
{
  "error": "Error message"
}
```

**Status codes:**
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

No rate limiting is currently implemented. Consider using Upstash Rate Limit middleware for production deployments.
