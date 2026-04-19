'use strict';

const fs = require('fs');
const path = require('path');

const TOTAL = 1200;

const CATEGORIES_DATA = {
  Electronics: {
    brands: ['TechCore', 'SoundWave', 'DigitalPad', 'TypeMaster', 'VisionTech', 'NanoSoft', 'QuantumGear', 'ByteWorks'],
    products: [
      { name: 'Laptop Pro 15"', priceMin: 799, priceMax: 2499, weightMin: 1.4, weightMax: 2.5 },
      { name: 'Laptop Ultrabook 13"', priceMin: 699, priceMax: 1899, weightMin: 1.0, weightMax: 1.5 },
      { name: 'Wireless Headphones', priceMin: 49, priceMax: 399, weightMin: 0.2, weightMax: 0.5 },
      { name: 'Noise-Cancel Earbuds', priceMin: 79, priceMax: 349, weightMin: 0.04, weightMax: 0.1 },
      { name: 'Smart Watch', priceMin: 149, priceMax: 799, weightMin: 0.04, weightMax: 0.12 },
      { name: 'Tablet 10" HD', priceMin: 199, priceMax: 799, weightMin: 0.4, weightMax: 0.7 },
      { name: 'Mechanical Keyboard', priceMin: 79, priceMax: 299, weightMin: 0.8, weightMax: 1.5 },
      { name: '4K Monitor 27"', priceMin: 249, priceMax: 999, weightMin: 4.5, weightMax: 7.0 },
      { name: 'Webcam 1080p', priceMin: 29, priceMax: 199, weightMin: 0.1, weightMax: 0.3 },
      { name: 'External SSD 1TB', priceMin: 79, priceMax: 249, weightMin: 0.04, weightMax: 0.1 },
      { name: 'Gaming Mouse', priceMin: 29, priceMax: 149, weightMin: 0.08, weightMax: 0.15 },
      { name: 'Portable Charger 20000mAh', priceMin: 29, priceMax: 99, weightMin: 0.3, weightMax: 0.5 },
      { name: 'Smart Speaker', priceMin: 39, priceMax: 299, weightMin: 0.4, weightMax: 1.2 },
      { name: 'Bluetooth Speaker', priceMin: 29, priceMax: 199, weightMin: 0.3, weightMax: 1.0 },
      { name: 'Drone Mini Pro', priceMin: 199, priceMax: 999, weightMin: 0.2, weightMax: 0.8 },
      { name: 'USB-C Hub 7-in-1', priceMin: 29, priceMax: 99, weightMin: 0.1, weightMax: 0.2 },
      { name: 'E-Reader 6"', priceMin: 99, priceMax: 299, weightMin: 0.17, weightMax: 0.22 },
      { name: 'Smart Thermostat', priceMin: 79, priceMax: 249, weightMin: 0.15, weightMax: 0.3 },
    ],
  },
  Sports: {
    brands: ['TrailRun', 'ZenFit', 'SpeedGuard', 'PowerLift', 'AquaPro', 'PeakSport', 'IronCore', 'VeloGear'],
    products: [
      { name: 'Running Shoes', priceMin: 59, priceMax: 249, weightMin: 0.4, weightMax: 0.9 },
      { name: 'Yoga Mat Premium', priceMin: 25, priceMax: 120, weightMin: 1.0, weightMax: 2.0 },
      { name: 'Cycling Helmet', priceMin: 39, priceMax: 299, weightMin: 0.25, weightMax: 0.5 },
      { name: 'Resistance Bands Set', priceMin: 15, priceMax: 59, weightMin: 0.3, weightMax: 0.8 },
      { name: 'Dumbbells Set', priceMin: 49, priceMax: 299, weightMin: 5.0, weightMax: 30.0 },
      { name: 'Pull-Up Bar', priceMin: 19, priceMax: 79, weightMin: 1.0, weightMax: 3.0 },
      { name: 'Jump Rope Pro', priceMin: 9, priceMax: 49, weightMin: 0.2, weightMax: 0.5 },
      { name: 'Tennis Racket', priceMin: 29, priceMax: 299, weightMin: 0.3, weightMax: 0.4 },
      { name: 'Soccer Ball Pro', priceMin: 19, priceMax: 149, weightMin: 0.4, weightMax: 0.5 },
      { name: 'Swim Goggles', priceMin: 9, priceMax: 79, weightMin: 0.05, weightMax: 0.1 },
      { name: 'Climbing Harness', priceMin: 39, priceMax: 199, weightMin: 0.3, weightMax: 0.7 },
      { name: 'Trekking Poles', priceMin: 29, priceMax: 199, weightMin: 0.3, weightMax: 0.8 },
      { name: 'Hydration Backpack', priceMin: 39, priceMax: 149, weightMin: 0.4, weightMax: 0.9 },
      { name: 'Foam Roller', priceMin: 15, priceMax: 59, weightMin: 0.4, weightMax: 0.8 },
      { name: 'Kettlebell 16kg', priceMin: 29, priceMax: 99, weightMin: 16.0, weightMax: 32.0 },
      { name: 'Sports Bottle 1L', priceMin: 9, priceMax: 39, weightMin: 0.15, weightMax: 0.3 },
    ],
  },
  Clothing: {
    brands: ['NordStyle', 'LuxeWear', 'UrbanThread', 'EcoWeave', 'SportFit', 'ClassicLine', 'TrendHouse', 'AlpineGear'],
    products: [
      { name: 'Winter Jacket', priceMin: 89, priceMax: 599, weightMin: 0.7, weightMax: 1.5 },
      { name: 'Cashmere Sweater', priceMin: 89, priceMax: 399, weightMin: 0.3, weightMax: 0.6 },
      { name: 'Denim Jeans', priceMin: 39, priceMax: 199, weightMin: 0.5, weightMax: 0.8 },
      { name: 'Wool Coat', priceMin: 199, priceMax: 799, weightMin: 1.0, weightMax: 1.8 },
      { name: 'Sports Leggings', priceMin: 19, priceMax: 99, weightMin: 0.2, weightMax: 0.4 },
      { name: 'Down Puffer Vest', priceMin: 59, priceMax: 299, weightMin: 0.3, weightMax: 0.7 },
      { name: 'Linen Shirt', priceMin: 29, priceMax: 129, weightMin: 0.15, weightMax: 0.3 },
      { name: 'Merino Base Layer', priceMin: 49, priceMax: 199, weightMin: 0.2, weightMax: 0.4 },
      { name: 'Trench Coat', priceMin: 99, priceMax: 499, weightMin: 0.8, weightMax: 1.5 },
      { name: 'Parka Waterproof', priceMin: 79, priceMax: 399, weightMin: 0.7, weightMax: 1.3 },
      { name: 'Polo Shirt', priceMin: 19, priceMax: 99, weightMin: 0.15, weightMax: 0.3 },
      { name: 'Blazer Tailored', priceMin: 79, priceMax: 499, weightMin: 0.5, weightMax: 0.9 },
      { name: 'Fleece Hoodie', priceMin: 29, priceMax: 129, weightMin: 0.4, weightMax: 0.7 },
      { name: 'Swim Shorts', priceMin: 19, priceMax: 89, weightMin: 0.15, weightMax: 0.3 },
    ],
  },
  Food: {
    brands: ['FreshFarm', 'MuscleFuel', 'VinoBest', 'ArtisanCraft', 'OrganicLife', 'GourmetBox', 'HealthFirst', 'TastePure'],
    products: [
      { name: 'Organic Veggie Box', priceMin: 25, priceMax: 65, weightMin: 2.5, weightMax: 5.0 },
      { name: 'Spice Collection', priceMin: 19, priceMax: 49, weightMin: 0.4, weightMax: 0.8 },
      { name: 'Protein Powder 1kg', priceMin: 35, priceMax: 89, weightMin: 1.0, weightMax: 1.2 },
      { name: 'Wine Box Premium (6)', priceMin: 49, priceMax: 149, weightMin: 6.0, weightMax: 9.0 },
      { name: 'Olive Oil Extra Virgin', priceMin: 15, priceMax: 59, weightMin: 0.5, weightMax: 5.0 },
      { name: 'Artisan Pasta Box', priceMin: 12, priceMax: 39, weightMin: 0.8, weightMax: 2.0 },
      { name: 'Coffee Beans Arabica 1kg', priceMin: 19, priceMax: 59, weightMin: 1.0, weightMax: 1.1 },
      { name: 'Raw Honey Organic', priceMin: 9, priceMax: 35, weightMin: 0.3, weightMax: 1.0 },
      { name: 'Nut Mix Premium', priceMin: 15, priceMax: 45, weightMin: 0.5, weightMax: 1.5 },
      { name: 'Kombucha Pack (6)', priceMin: 15, priceMax: 39, weightMin: 2.0, weightMax: 3.0 },
      { name: 'Artisan Granola 1kg', priceMin: 12, priceMax: 29, weightMin: 0.8, weightMax: 1.2 },
      { name: 'Cheese Selection Box', priceMin: 29, priceMax: 99, weightMin: 0.8, weightMax: 2.0 },
      { name: 'Dark Chocolate Box', priceMin: 19, priceMax: 49, weightMin: 0.3, weightMax: 0.8 },
      { name: 'Dried Fruits Pack', priceMin: 9, priceMax: 35, weightMin: 0.3, weightMax: 1.0 },
    ],
  },
  Home: {
    brands: ['BrewMaster', 'CleanBot', 'ErgoSpace', 'PureAir', 'LumiLight', 'SmartHome', 'CozyLiving', 'ProKitchen'],
    products: [
      { name: 'Coffee Maker Deluxe', priceMin: 49, priceMax: 399, weightMin: 1.0, weightMax: 3.5 },
      { name: 'Air Purifier', priceMin: 79, priceMax: 499, weightMin: 3.0, weightMax: 7.0 },
      { name: 'Desk Lamp LED', priceMin: 29, priceMax: 149, weightMin: 0.4, weightMax: 1.5 },
      { name: 'Robot Vacuum', priceMin: 149, priceMax: 999, weightMin: 2.5, weightMax: 4.5 },
      { name: 'Standing Desk 140cm', priceMin: 299, priceMax: 999, weightMin: 18.0, weightMax: 35.0 },
      { name: 'Ergonomic Chair', priceMin: 199, priceMax: 1299, weightMin: 10.0, weightMax: 18.0 },
      { name: 'Smart Light Bulb Pack', priceMin: 29, priceMax: 99, weightMin: 0.2, weightMax: 0.5 },
      { name: 'Blender Pro', priceMin: 49, priceMax: 349, weightMin: 1.5, weightMax: 3.0 },
      { name: 'Air Fryer XL', priceMin: 59, priceMax: 299, weightMin: 3.0, weightMax: 6.0 },
      { name: 'Instant Pot 6L', priceMin: 79, priceMax: 249, weightMin: 4.0, weightMax: 6.0 },
      { name: 'Candle Set Luxury', priceMin: 19, priceMax: 89, weightMin: 0.4, weightMax: 1.2 },
      { name: 'Indoor Plant Kit', priceMin: 19, priceMax: 79, weightMin: 0.5, weightMax: 2.0 },
      { name: 'Throw Blanket Fleece', priceMin: 19, priceMax: 99, weightMin: 0.5, weightMax: 1.0 },
      { name: 'Knife Set Professional', priceMin: 49, priceMax: 399, weightMin: 1.0, weightMax: 2.5 },
    ],
  },
};

const WAREHOUSES = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille'];
const STOCK_STATUSES = ['in_stock', 'low_stock', 'out_of_stock'];
const STOCK_WEIGHTS = [0.70, 0.20, 0.10];
const CATEGORIES = Object.keys(CATEGORIES_DATA);

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickWeighted(arr, weights) {
  const r = Math.random();
  let cumul = 0;
  for (let i = 0; i < arr.length; i++) {
    cumul += weights[i];
    if (r <= cumul) return arr[i];
  }
  return arr[arr.length - 1];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function pad(n, size) {
  return String(n).padStart(size, '0');
}

function generate() {
  const products = [];

  for (let i = 1; i <= TOTAL; i++) {
    const category = pick(CATEGORIES);
    const catData = CATEGORIES_DATA[category];
    const brand = pick(catData.brands);
    const productTemplate = pick(catData.products);
    const price = randomFloat(productTemplate.priceMin, productTemplate.priceMax, 2);
    const weight = randomFloat(productTemplate.weightMin, productTemplate.weightMax, 2);
    const status = pickWeighted(STOCK_STATUSES, STOCK_WEIGHTS);
    const stock = status === 'out_of_stock' ? 0 : status === 'low_stock' ? randomInt(1, 15) : randomInt(20, 500);
    const sold = randomInt(0, 5000);
    const rating = randomFloat(1.5, 5.0, 1);
    const warehouse = pick(WAREHOUSES);

    products.push({
      id: `PRD-${pad(i, 4)}`,
      name: `${productTemplate.name}`,
      category,
      brand,
      price,
      stock,
      sold,
      rating,
      status,
      warehouse,
      weight,
    });
  }

  return products;
}

const outputPath = path.resolve(__dirname, '../data/products.json');
const data = generate();
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`products.json: ${data.length} records written`);
