'use strict';

const fs = require('fs');
const path = require('path');

const TOTAL = 1200;

const SCIENTIST_NAMES = [
  'Einstein', 'Curie', 'Newton', 'Darwin', 'Tesla', 'Pasteur', 'Lovelace',
  'Turing', 'Bohr', 'Faraday', 'Lavoisier', 'Maxwell', 'Planck', 'Feynman',
  'Hawking', 'Mendel', 'Mendeleev', 'Ampère', 'Volta', 'Celsius',
  'Descartes', 'Archimède', 'Euclide', 'Pythagore', 'Galilée',
  'Copernic', 'Kepler', 'Laplace', 'Fourier', 'Poincaré',
  'Carnot', 'Joule', 'Ohm', 'Watt', 'Hertz', 'Kelvin', 'Rankine',
  'Avogadro', 'Boltzmann', 'Gibbs', 'Clausius', 'Helmholtz',
  'Röntgen', 'Becquerel', 'Rutherford', 'Schrödinger', 'Dirac',
  'Heisenberg', 'Pauli', 'Fermi', 'Born', 'Lorentz',
];

const BUILDINGS = ['A', 'B', 'C', 'D', 'E'];
const STATUSES = ['available', 'occupied', 'maintenance'];
const STATUS_WEIGHTS = [0.55, 0.35, 0.10];
const ALL_TAGS = ['premium', 'videoconf', 'quiet', 'view', 'catering', 'whiteboard', 'accessible', 'compact', 'large', 'training'];

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

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString();
}

function randomTags(hasProjector, hasVideoConference) {
  const tags = [];
  if (hasVideoConference) tags.push('videoconf');
  const optionals = ALL_TAGS.filter(t => t !== 'videoconf');
  const count = randomInt(0, 3);
  const shuffled = optionals.sort(() => 0.5 - Math.random());
  return tags.concat(shuffled.slice(0, count));
}

function pad(n, size) {
  return String(n).padStart(size, '0');
}

function generate() {
  const salles = [];

  for (let i = 1; i <= TOTAL; i++) {
    const building = pick(BUILDINGS);
    const floor = randomInt(0, 9);
    const capacity = randomInt(4, 80);
    const hasProjector = Math.random() > 0.3;
    const hasVideoConference = Math.random() > 0.45;
    const status = pickWeighted(STATUSES, STATUS_WEIGHTS);
    const pricePerHour = randomFloat(20, 150, 2);
    const rating = randomFloat(2.5, 5.0, 1);
    const bookingsThisMonth = randomInt(0, 30);
    const baseName = pick(SCIENTIST_NAMES);

    salles.push({
      id: `SAL-${pad(i, 4)}`,
      name: `Salle ${baseName}`,
      capacity,
      building,
      floor,
      hasProjector,
      hasVideoConference,
      pricePerHour,
      status,
      lastBooking: randomDate(new Date('2025-01-01'), new Date('2026-04-19')),
      rating,
      tags: randomTags(hasProjector, hasVideoConference),
      bookingsThisMonth,
    });
  }

  return salles;
}

const outputPath = path.resolve(__dirname, '../data/salles.json');
const data = generate();
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`salles.json: ${data.length} records written`);
