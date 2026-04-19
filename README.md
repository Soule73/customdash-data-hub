# data-hub

Mock REST API providing test datasets for CustomDash development and E2E testing.

**Production URL**: https://data-hub-teal.vercel.app

---

## Endpoints

### `GET /`

Returns metadata about all available datasets.

**Response**

```json
{
  "name": "data-hub",
  "version": "1.0.0",
  "datasets": [
    { "name": "salles",    "endpoint": "/api/salles",    "count": 15 },
    { "name": "orders",    "endpoint": "/api/orders",    "count": 50 },
    { "name": "employees", "endpoint": "/api/employees", "count": 25 },
    { "name": "products",  "endpoint": "/api/products",  "count": 25 }
  ]
}
```

---

### `GET /api/salles`

15 meeting rooms with occupancy status and equipment details.

**Fields**: `id`, `name`, `capacity`, `building` (A/B/C), `floor`, `hasProjector`, `hasVideoConference`, `pricePerHour`, `status` (available/occupied/maintenance), `lastBooking`, `rating`, `tags`, `bookingsThisMonth`

**Query parameters**

| Parameter          | Type    | Example              |
| ------------------ | ------- | -------------------- |
| `building`         | string  | `?building=A`        |
| `status`           | string  | `?status=available`  |
| `hasProjector`     | boolean | `?hasProjector=true` |
| `hasVideoConference` | boolean | `?hasVideoConference=true` |
| `limit`            | number  | `?limit=5`           |

**Example**

```
GET /api/salles?building=B&status=available
```

---

### `GET /api/orders`

50 e-commerce orders spanning January 2025 to April 2026.

**Fields**: `id`, `date`, `customer`, `region` (Paris/Lyon/Marseille/Bordeaux/Lille/Nice), `category` (Electronics/Clothing/Food/Sports/Books/Home), `product`, `quantity`, `unitPrice`, `total`, `status` (delivered/cancelled/returned/processing), `paymentMethod` (card/paypal/bank_transfer/cash)

**Query parameters**

| Parameter       | Type   | Example                  |
| --------------- | ------ | ------------------------ |
| `region`        | string | `?region=Paris`          |
| `category`      | string | `?category=Electronics`  |
| `status`        | string | `?status=delivered`      |
| `paymentMethod` | string | `?paymentMethod=paypal`  |
| `year`          | number | `?year=2025`             |
| `month`         | number | `?month=3`               |
| `limit`         | number | `?limit=10`              |

**Example**

```
GET /api/orders?region=Paris&year=2025&status=delivered
```

---

### `GET /api/employees`

25 HR employee records across multiple departments.

**Fields**: `id`, `name`, `department` (Engineering/Marketing/Sales/HR/Finance/Design/Operations), `position`, `salary`, `startDate`, `status` (active/inactive/on_leave), `age`, `gender` (M/F), `country`, `performance` (0–5), `remote`, `yearsExperience`

**Query parameters**

| Parameter    | Type    | Example                 |
| ------------ | ------- | ----------------------- |
| `department` | string  | `?department=Engineering` |
| `status`     | string  | `?status=active`        |
| `gender`     | string  | `?gender=F`             |
| `country`    | string  | `?country=France`       |
| `remote`     | boolean | `?remote=true`          |
| `limit`      | number  | `?limit=10`             |

**Example**

```
GET /api/employees?department=Engineering&remote=true
```

---

### `GET /api/products`

25 inventory products across multiple categories and warehouses.

**Fields**: `id`, `name`, `category` (Electronics/Sports/Clothing/Food/Home), `brand`, `price`, `stock`, `sold`, `rating`, `status` (in_stock/low_stock/out_of_stock), `warehouse` (Paris/Lyon/Marseille/Bordeaux/Lille), `weight`

**Query parameters**

| Parameter   | Type   | Example                |
| ----------- | ------ | ---------------------- |
| `category`  | string | `?category=Electronics` |
| `brand`     | string | `?brand=Sony`          |
| `status`    | string | `?status=low_stock`    |
| `warehouse` | string | `?warehouse=Paris`     |
| `limit`     | number | `?limit=10`            |

**Example**

```
GET /api/products?category=Electronics&status=in_stock
```

---

## Common behavior

- All endpoints return `Content-Type: application/json`
- All responses include `Cache-Control: no-store` to prevent stale data
- CORS is open (`*`) — usable from any origin
- Invalid or unknown query parameters are silently ignored
- Filters are case-insensitive for string values

---

## Local development

```bash
npm install
node api/index.js
# Server running on http://localhost:3001
```

---

## Deployment

Deployed on Vercel as a serverless function. Redeploy with:

```bash
vercel --prod
```
