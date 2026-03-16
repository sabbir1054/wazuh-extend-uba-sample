# UBA Security - Backend API Documentation

**Base URL:** `http://localhost:5000`

---

## Health Check

### `GET /api/health`

Check if the server is running.

**Request:**
```
GET http://localhost:5000/api/health
```

**Response:** `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2026-03-16T06:30:00.000Z"
}
```

---

## Logs

### `GET /api/logs`

Return paginated alerts/logs stored in the database.

**Query Parameters:**

| Param       | Type     | Default | Description                          |
|-------------|----------|---------|--------------------------------------|
| `page`      | number   | 1       | Page number                          |
| `limit`     | number   | 20      | Items per page (max 100)             |
| `agentId`   | string   | —       | Filter by agent ID (e.g. `003`)      |
| `eventType` | string   | —       | Filter by event type                 |
| `severity`  | number   | —       | Filter by exact severity level       |
| `category`  | string   | —       | Filter by category                   |

**Event Types:** `authentication`, `windows_event`, `malware_detection`, `security_audit`, `security_compliance`, `host_monitoring`, `other`

**Categories:** `pam`, `windows_application`, `rootcheck`, `audit`, `sca`, `ossec`

**Request:**
```
GET http://localhost:5000/api/logs?page=1&limit=5
```

**Response:** `200 OK`
```json
{
  "logs": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "device": "kali_laptop",
      "ip": "10.0.2.15",
      "eventType": "host_monitoring",
      "description": "Listened ports status (netstat) changed (new port opened or closed).",
      "severity": 7,
      "category": "ossec",
      "location": "netstat listening ports",
      "username": null,
      "timestamp": "2026-03-16T06:28:00.000Z"
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "device": "kali_laptop",
      "ip": "10.0.2.15",
      "eventType": "authentication",
      "description": "PAM: Login session opened.",
      "severity": 3,
      "category": "pam",
      "location": "journald",
      "username": "lightdm",
      "timestamp": "2026-03-16T06:25:00.000Z"
    },
    {
      "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
      "device": "laptop1",
      "ip": "192.168.0.186",
      "eventType": "windows_event",
      "description": "Software protection service scheduled successfully.",
      "severity": 3,
      "category": "windows_application",
      "location": "EventChannel",
      "username": null,
      "timestamp": "2026-03-16T06:26:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 22,
    "totalPages": 5
  }
}
```

**Request with filters:**
```
GET http://localhost:5000/api/logs?eventType=authentication&agentId=003&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "logs": [
    {
      "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
      "device": "kali_laptop",
      "ip": "10.0.2.15",
      "eventType": "authentication",
      "description": "PAM: Login session opened.",
      "severity": 3,
      "category": "pam",
      "location": "journald",
      "username": "lightdm",
      "timestamp": "2026-03-16T06:25:00.000Z"
    },
    {
      "id": "e5f6a7b8-c9d0-1234-efab-345678901234",
      "device": "kali_laptop",
      "ip": "10.0.2.15",
      "eventType": "authentication",
      "description": "PAM: Login session opened.",
      "severity": 3,
      "category": "pam",
      "location": "journald",
      "username": "lightdm",
      "timestamp": "2026-03-16T06:24:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

---

## Alerts

### `GET /api/alerts/summary`

Return a summary of all alerts grouped by severity, event type, and recent alerts.

**Request:**
```
GET http://localhost:5000/api/alerts/summary
```

**Response:** `200 OK`
```json
{
  "totalAlerts": 22,
  "highSeverity": 2,
  "mediumSeverity": 8,
  "lowSeverity": 12,
  "byEventType": [
    { "eventType": "authentication", "count": 7 },
    { "eventType": "malware_detection", "count": 3 },
    { "eventType": "security_audit", "count": 3 },
    { "eventType": "host_monitoring", "count": 3 },
    { "eventType": "security_compliance", "count": 2 },
    { "eventType": "windows_event", "count": 2 }
  ],
  "recentAlerts": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "device": "kali_laptop",
      "ip": "10.0.2.15",
      "eventType": "host_monitoring",
      "description": "Listened ports status (netstat) changed (new port opened or closed).",
      "severity": 7,
      "category": "ossec",
      "timestamp": "2026-03-16T06:28:00.000Z"
    },
    {
      "id": "f6a7b8c9-d0e1-2345-fabc-456789012345",
      "device": "wazuh-server",
      "ip": "10.0.2.1",
      "eventType": "authentication",
      "description": "PAM: Login session opened.",
      "severity": 3,
      "category": "pam",
      "timestamp": "2026-03-16T06:27:00.000Z"
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "device": "laptop1",
      "ip": "192.168.0.186",
      "eventType": "windows_event",
      "description": "Software protection service scheduled successfully.",
      "severity": 3,
      "category": "windows_application",
      "timestamp": "2026-03-16T06:26:00.000Z"
    }
  ]
}
```

**Severity Grouping Logic:**

| Range    | Label          |
|----------|----------------|
| 0–3      | Low Severity   |
| 4–7      | Medium Severity|
| 8+       | High Severity  |

---

## Devices

### `GET /api/devices`

Return all monitored agents/devices with their risk info.

**Request:**
```
GET http://localhost:5000/api/devices
```

**Response:** `200 OK`
```json
[
  {
    "id": "003",
    "name": "kali_laptop",
    "ip": "10.0.2.15",
    "manager": "kali",
    "totalAlerts": 9,
    "riskScore": 100,
    "riskLevel": "HIGH",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "id": "005",
    "name": "db-server-01",
    "ip": "192.168.1.100",
    "manager": "kali",
    "totalAlerts": 4,
    "riskScore": 70,
    "riskLevel": "MEDIUM",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "id": "004",
    "name": "web-server-01",
    "ip": "192.168.1.50",
    "manager": "kali",
    "totalAlerts": 4,
    "riskScore": 35,
    "riskLevel": "LOW",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "id": "002",
    "name": "laptop1",
    "ip": "192.168.0.186",
    "manager": "kali",
    "totalAlerts": 3,
    "riskScore": 5,
    "riskLevel": "LOW",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "id": "001",
    "name": "wazuh-server",
    "ip": "10.0.2.1",
    "manager": "kali",
    "totalAlerts": 2,
    "riskScore": 15,
    "riskLevel": "LOW",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  }
]
```

---

### `GET /api/devices/risk`

Return risk scores for all devices, sorted highest first.

**Request:**
```
GET http://localhost:5000/api/devices/risk
```

**Response:** `200 OK`
```json
[
  {
    "agentId": "003",
    "device": "kali_laptop",
    "ip": "10.0.2.15",
    "manager": "kali",
    "riskScore": 100,
    "riskLevel": "HIGH",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "agentId": "005",
    "device": "db-server-01",
    "ip": "192.168.1.100",
    "manager": "kali",
    "riskScore": 70,
    "riskLevel": "MEDIUM",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "agentId": "004",
    "device": "web-server-01",
    "ip": "192.168.1.50",
    "manager": "kali",
    "riskScore": 35,
    "riskLevel": "LOW",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "agentId": "002",
    "device": "laptop1",
    "ip": "192.168.0.186",
    "manager": "kali",
    "riskScore": 5,
    "riskLevel": "LOW",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  {
    "agentId": "001",
    "device": "wazuh-server",
    "ip": "10.0.2.1",
    "manager": "kali",
    "riskScore": 15,
    "riskLevel": "LOW",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  }
]
```

**Risk Score Calculation:**

| Metric           | Weight |
|------------------|--------|
| loginCount       | × 5    |
| auditCommands    | × 10   |
| networkChanges   | × 15   |
| malwareEvents    | × 40   |

| Score Range | Risk Level |
|-------------|------------|
| 0–40        | LOW        |
| 41–70       | MEDIUM     |
| 71–100      | HIGH       |

---

### `GET /api/devices/risk/:agentId`

Return detailed risk information for a specific device, including behaviour metrics and risk history.

**Request:**
```
GET http://localhost:5000/api/devices/risk/003
```

**Response:** `200 OK`
```json
{
  "agent": {
    "id": "003",
    "name": "kali_laptop",
    "ip": "10.0.2.15",
    "manager": "kali"
  },
  "risk": {
    "riskScore": 100,
    "riskLevel": "HIGH",
    "lastUpdated": "2026-03-16T06:30:00.000Z"
  },
  "metrics": {
    "loginCount": 3,
    "auditCommandCount": 1,
    "networkChanges": 1,
    "malwareEvents": 2,
    "calculatedAt": "2026-03-16T06:30:00.000Z"
  },
  "totalAlerts": 9,
  "riskHistory": [
    {
      "riskScore": 100,
      "riskLevel": "HIGH",
      "createdAt": "2026-03-16T06:30:00.000Z"
    },
    {
      "riskScore": 85,
      "riskLevel": "HIGH",
      "createdAt": "2026-03-16T06:29:00.000Z"
    },
    {
      "riskScore": 55,
      "riskLevel": "MEDIUM",
      "createdAt": "2026-03-16T06:28:00.000Z"
    }
  ]
}
```

**Request (agent not found):**
```
GET http://localhost:5000/api/devices/risk/999
```

**Response:** `404 Not Found`
```json
{
  "error": "Agent not found"
}
```

---

## Error Responses

All endpoints return the same error format on failure:

**Response:** `500 Internal Server Error`
```json
{
  "error": "Failed to fetch logs"
}
```

---

## Wazuh Integration (Internal)

The backend runs a cron job every **1 minute** that:

1. Fetches 100 latest alerts from `https://localhost:9200/wazuh-alerts-*/_search`
2. Parses each alert and classifies the event type:

| `rule.groups`           | Event Type              | Category              |
|-------------------------|-------------------------|-----------------------|
| `windows_application`   | `windows_event`         | `windows_application` |
| `pam`                   | `authentication`        | `pam`                 |
| `rootcheck`             | `malware_detection`     | `rootcheck`           |
| `audit`, `audit_selinux`| `security_audit`        | `audit`               |
| `sca`                   | `security_compliance`   | `sca`                 |
| `ossec`                 | `host_monitoring`       | `ossec`               |

3. Stores new alerts (skips duplicates by `wazuhId`)
4. Recalculates behaviour metrics per affected device
5. Updates device risk scores
6. Snapshots system-wide stats

---

## Quick Start

```bash
# 1. Configure database
#    Edit server/.env with your PostgreSQL credentials

# 2. Push schema to database
npx prisma db push

# 3. Seed demo data
npm run db:seed

# 4. Start server
npm run dev
# → Server running at http://localhost:5000

# 5. Test endpoints
curl http://localhost:5000/api/health
curl http://localhost:5000/api/logs?page=1&limit=5
curl http://localhost:5000/api/alerts/summary
curl http://localhost:5000/api/devices/risk
curl http://localhost:5000/api/devices/risk/003
```
