const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const DATA_DIR = path.join(__dirname, '../data');

/**
 * Loads a JSON dataset from the data directory.
 *
 * @param {string} filename - JSON filename without extension
 * @returns {Array} Parsed array of records
 */
function loadDataset(filename) {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.options('*', (_req, res) => {
  res.sendStatus(204);
});

/**
 * GET /
 * Lists all available datasets and their endpoints.
 */
app.get('/', (_req, res) => {
  res.json({
    name: 'data-hub',
    description: 'Mock data API for CustomDash testing',
    version: '1.0.0',
    datasets: [
      {
        name: 'salles',
        endpoint: '/api/salles',
        description: 'Meeting rooms — capacity, status, bookings, ratings',
        count: loadDataset('salles').length,
        filters: ['building', 'status', 'hasProjector', 'hasVideoConference'],
      },
      {
        name: 'orders',
        endpoint: '/api/orders',
        description: 'E-commerce orders — sales, regions, categories (2025-2026)',
        count: loadDataset('orders').length,
        filters: ['region', 'category', 'status', 'paymentMethod', 'year', 'month'],
      },
      {
        name: 'employees',
        endpoint: '/api/employees',
        description: 'HR employee data — departments, salaries, performance',
        count: loadDataset('employees').length,
        filters: ['department', 'status', 'gender', 'country', 'remote'],
      },
      {
        name: 'products',
        endpoint: '/api/products',
        description: 'Product inventory — stock levels, sales, ratings',
        count: loadDataset('products').length,
        filters: ['category', 'brand', 'status', 'warehouse'],
      },
    ],
  });
});

/**
 * GET /api/salles
 * Returns meeting rooms with optional filters.
 *
 * @query {string} building - Filter by building (A, B, C)
 * @query {string} status - Filter by status (available, occupied, maintenance)
 * @query {string} hasProjector - Filter by projector availability (true/false)
 * @query {string} hasVideoConference - Filter by video conference availability (true/false)
 * @query {number} limit - Maximum number of records to return
 */
app.get('/api/salles', (req, res) => {
  let data = loadDataset('salles');

  const { building, status, hasProjector, hasVideoConference, limit } = req.query;

  if (building) {
    data = data.filter((s) => s.building.toLowerCase() === building.toLowerCase());
  }
  if (status) {
    data = data.filter((s) => s.status.toLowerCase() === status.toLowerCase());
  }
  if (hasProjector !== undefined) {
    data = data.filter((s) => s.hasProjector === (hasProjector === 'true'));
  }
  if (hasVideoConference !== undefined) {
    data = data.filter((s) => s.hasVideoConference === (hasVideoConference === 'true'));
  }
  if (limit) {
    data = data.slice(0, parseInt(limit, 10));
  }

  res.json({ total: data.length, data });
});

/**
 * GET /api/orders
 * Returns orders with optional filters.
 *
 * @query {string} region - Filter by region
 * @query {string} category - Filter by product category
 * @query {string} status - Filter by order status
 * @query {string} paymentMethod - Filter by payment method
 * @query {string|number} year - Filter by year (e.g. 2025)
 * @query {string|number} month - Filter by month number (1-12)
 * @query {number} limit - Maximum number of records to return
 */
app.get('/api/orders', (req, res) => {
  let data = loadDataset('orders');

  const { region, category, status, paymentMethod, year, month, limit } = req.query;

  if (region) {
    data = data.filter((o) => o.region.toLowerCase() === region.toLowerCase());
  }
  if (category) {
    data = data.filter((o) => o.category.toLowerCase() === category.toLowerCase());
  }
  if (status) {
    data = data.filter((o) => o.status.toLowerCase() === status.toLowerCase());
  }
  if (paymentMethod) {
    data = data.filter((o) => o.paymentMethod.toLowerCase() === paymentMethod.toLowerCase());
  }
  if (year) {
    data = data.filter((o) => new Date(o.date).getFullYear() === parseInt(year, 10));
  }
  if (month) {
    data = data.filter((o) => new Date(o.date).getMonth() + 1 === parseInt(month, 10));
  }
  if (limit) {
    data = data.slice(0, parseInt(limit, 10));
  }

  res.json({ total: data.length, data });
});

/**
 * GET /api/employees
 * Returns employees with optional filters.
 *
 * @query {string} department - Filter by department
 * @query {string} status - Filter by employment status
 * @query {string} gender - Filter by gender (M/F)
 * @query {string} country - Filter by country
 * @query {string} remote - Filter by remote work (true/false)
 * @query {number} limit - Maximum number of records to return
 */
app.get('/api/employees', (req, res) => {
  let data = loadDataset('employees');

  const { department, status, gender, country, remote, limit } = req.query;

  if (department) {
    data = data.filter((e) => e.department.toLowerCase() === department.toLowerCase());
  }
  if (status) {
    data = data.filter((e) => e.status.toLowerCase() === status.toLowerCase());
  }
  if (gender) {
    data = data.filter((e) => e.gender.toUpperCase() === gender.toUpperCase());
  }
  if (country) {
    data = data.filter((e) => e.country.toLowerCase() === country.toLowerCase());
  }
  if (remote !== undefined) {
    data = data.filter((e) => e.remote === (remote === 'true'));
  }
  if (limit) {
    data = data.slice(0, parseInt(limit, 10));
  }

  res.json({ total: data.length, data });
});

/**
 * GET /api/products
 * Returns products with optional filters.
 *
 * @query {string} category - Filter by product category
 * @query {string} brand - Filter by brand
 * @query {string} status - Filter by stock status (in_stock, low_stock, out_of_stock)
 * @query {string} warehouse - Filter by warehouse location
 * @query {number} limit - Maximum number of records to return
 */
app.get('/api/products', (req, res) => {
  let data = loadDataset('products');

  const { category, brand, status, warehouse, limit } = req.query;

  if (category) {
    data = data.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (brand) {
    data = data.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }
  if (status) {
    data = data.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  }
  if (warehouse) {
    data = data.filter((p) => p.warehouse.toLowerCase() === warehouse.toLowerCase());
  }
  if (limit) {
    data = data.slice(0, parseInt(limit, 10));
  }

  res.json({ total: data.length, data });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found', availableEndpoints: ['/api/salles', '/api/orders', '/api/employees', '/api/products'] });
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`data-hub running on http://localhost:${PORT}`);
  });
}

module.exports = app;
