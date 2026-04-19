'use strict';

const fs = require('fs');
const path = require('path');

const TOTAL = 1200;

const FIRST_NAMES = [
  'Alice', 'Bob', 'Claire', 'David', 'Emma', 'François', 'Giulia', 'Hugo',
  'Isabelle', 'Jules', 'Karim', 'Laura', 'Marc', 'Nathalie', 'Olivier',
  'Patricia', 'Quentin', 'Rachel', 'Samuel', 'Théo', 'Ursula', 'Victor',
  'Wendy', 'Xavier', 'Yasmine', 'Zoé', 'Antoine', 'Béatrice', 'Cédric',
  'Diane', 'Edouard', 'Fleur', 'Guillaume', 'Héléne', 'Ivan', 'Jade',
  'Kévin', 'Lucie', 'Maxime', 'Nina', 'Paul', 'Romain', 'Sophie',
  'Thomas', 'Ugo', 'Valérie', 'William', 'Léa', 'Nathan', 'Manon',
  'Luca', 'Maria', 'Carlos', 'Fatima', 'Ahmed', 'Elena', 'Dimitri',
  'Chiara', 'Hassan', 'Ingrid', 'Gabriela', 'Aisha', 'Benoît', 'Amina',
];

const LAST_NAMES = [
  'Martin', 'Dupont', 'Leroy', 'Moreau', 'Petit', 'Bernard', 'Rossi',
  'Lambert', 'Fournier', 'Simon', 'Bouali', 'Dupuis', 'Girard', 'Rousseau',
  'Blanc', 'Laurent', 'Michel', 'Lefebvre', 'Lecomte', 'André', 'Roux',
  'Fontaine', 'Chevalier', 'Robin', 'Garnier', 'Morel', 'Clement',
  'Gauthier', 'Perrin', 'Renard', 'Faure', 'Marchand', 'Bonnet',
  'Moulin', 'Lemaire', 'Henry', 'Picard', 'Colin', 'Masson', 'Bertrand',
  'Ferrari', 'Romano', 'Esposito', 'Ricci', 'Müller', 'Schmidt',
  'Popescu', 'Ionescu', 'Santos', 'Silva', 'Souza', 'Oliveira',
  'Traoré', 'Diallo', 'Koné', 'Coulibaly', 'Benali', 'El Mansouri',
];

const REGIONS = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Nice', 'Toulouse', 'Strasbourg', 'Nantes', 'Rennes'];

const CATEGORIES_PRODUCTS = {
  Electronics: [
    'Laptop Pro 15"', 'Wireless Headphones', 'Smart Watch Series 5', 'USB-C Hub 7-in-1',
    'Tablet 10" HD', 'Mechanical Keyboard', 'Noise-Cancel Earbuds', '4K Monitor 27"',
    'Webcam 1080p', 'External SSD 1TB', 'Gaming Mouse', 'Portable Charger 20000mAh',
    'Smart Speaker', 'Drone Mini Pro', 'Action Camera 4K', 'VR Headset',
    'Smart Thermostat', 'Security Camera', 'E-Reader 6"', 'Bluetooth Speaker',
  ],
  Clothing: [
    'Winter Jacket Pro', 'Cashmere Sweater', 'Denim Jeans Slim', 'Wool Coat Classic',
    'Sports Leggings', 'Down Puffer Vest', 'Linen Shirt', 'Merino Base Layer',
    'Trench Coat', 'Parka Waterproof', 'Polo Shirt', 'Chinos', 'Maxi Dress',
    'Blazer Tailored', 'Swimsuit Pro', 'Hiking Pants', 'Fleece Hoodie',
    'Tank Top Pack (3)', 'Socks Pack (6)', 'Leather Belt',
  ],
  Food: [
    'Organic Veggie Box', 'Spice Collection (12)', 'Protein Powder Vanilla',
    'Wine Box Premium (6)', 'Olive Oil Extra Virgin 5L', 'Artisan Pasta Box',
    'Coffee Beans Arabica 1kg', 'Honey Raw Organic 500g', 'Nut Mix Premium 1kg',
    'Kombucha Variety Pack', 'Granola Artisan 2kg', 'Cheese Selection Box',
    'Herbal Tea Collection', 'Dark Chocolate Box', 'Dried Fruits Pack 1kg',
    'Jam Assortment (6)', 'Plant-Based Milk Pack', 'Energy Bars Box (12)',
  ],
  Sports: [
    'Running Shoes X500', 'Yoga Mat Premium', 'Cycling Helmet Pro',
    'Resistance Bands Set', 'Dumbbells Set 20kg', 'Pull-Up Bar', 'Jump Rope Pro',
    'Tennis Racket', 'Soccer Ball Pro', 'Basketball', 'Swim Goggles',
    'Climbing Harness', 'Trekking Poles', 'Hydration Backpack', 'Foam Roller',
    'Kettlebell 16kg', 'Fitness Gloves', 'Compression Socks', 'Sports Bottle 1L',
  ],
  Books: [
    'Design Patterns', 'Clean Code', 'The Pragmatic Programmer', 'Domain-Driven Design',
    'Refactoring', 'The Phoenix Project', 'Accelerate', 'Site Reliability Engineering',
    'You Don\'t Know JS', 'JavaScript: The Good Parts', 'Deep Work', 'Atomic Habits',
    'The Lean Startup', 'Zero to One', 'Good to Great', 'The Hard Thing About Hard Things',
    'Thinking Fast and Slow', 'Sapiens', 'The Art of War', 'Meditations',
  ],
  Home: [
    'Coffee Maker Deluxe', 'Air Purifier 360°', 'Desk Lamp LED', 'Robot Vacuum V3',
    'Standing Desk 140cm', 'Ergonomic Chair Pro', 'Smart Light Bulb Pack (4)',
    'Kitchen Scale Digital', 'Blender Pro 1200W', 'Air Fryer XL 5L', 'Instant Pot 6L',
    'Candle Set Luxury', 'Storage Box Set (5)', 'Indoor Plant Kit', 'Mirror LED',
    'Throw Blanket Fleece', 'Bamboo Cutting Board', 'Knife Set Professional',
  ],
};

const STATUSES = ['delivered', 'cancelled', 'returned', 'processing'];
const STATUS_WEIGHTS = [0.65, 0.12, 0.10, 0.13];
const PAYMENT_METHODS = ['card', 'paypal', 'bank_transfer', 'cash'];
const PAYMENT_WEIGHTS = [0.55, 0.25, 0.12, 0.08];
const CATEGORIES = Object.keys(CATEGORIES_PRODUCTS);

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

function randomOrderDate() {
  const start = new Date('2024-01-01');
  const end = new Date('2026-04-19');
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().slice(0, 10);
}

function generate() {
  const orders = [];

  for (let i = 1; i <= TOTAL; i++) {
    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);
    const customer = `${firstName} ${lastName}`;
    const region = pick(REGIONS);
    const category = pick(CATEGORIES);
    const product = pick(CATEGORIES_PRODUCTS[category]);
    const quantity = randomInt(1, 8);
    const unitPrice = randomFloat(9.99, 1499.99, 2);
    const total = parseFloat((quantity * unitPrice).toFixed(2));
    const status = pickWeighted(STATUSES, STATUS_WEIGHTS);
    const paymentMethod = pickWeighted(PAYMENT_METHODS, PAYMENT_WEIGHTS);
    const date = randomOrderDate();

    orders.push({
      id: `ORD-${pad(i, 4)}`,
      date,
      customer,
      region,
      category,
      product,
      quantity,
      unitPrice,
      total,
      status,
      paymentMethod,
    });
  }

  orders.sort((a, b) => a.date.localeCompare(b.date));

  return orders;
}

const outputPath = path.resolve(__dirname, '../data/orders.json');
const data = generate();
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`orders.json: ${data.length} records written`);
