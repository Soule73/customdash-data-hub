'use strict';

const fs = require('fs');
const path = require('path');

const TOTAL = 1200;

const FIRST_NAMES_F = [
  'Sophie', 'Amina', 'Fatima', 'Marie-Claire', 'Elena', 'Aisha', 'Chiara',
  'Eva', 'Gabriela', 'Ingrid', 'Laura', 'Nathalie', 'Patricia', 'Rachel',
  'Wendy', 'Yasmine', 'Zoé', 'Béatrice', 'Diane', 'Fleur', 'Jade',
  'Lucie', 'Manon', 'Nina', 'Léa', 'Maria', 'Valérie', 'Ursula',
  'Claire', 'Emma', 'Alice', 'Isabelle', 'Giulia', 'Thérese', 'Anaïs',
  'Camille', 'Charlotte', 'Aurélie', 'Sandrine', 'Virginie', 'Pauline',
  'Margaux', 'Emilie', 'Laetitia', 'Céline', 'Stéphanie', 'Vanessa',
];

const FIRST_NAMES_M = [
  'Thomas', 'Pierre', 'Lucas', 'Karim', 'Julien', 'Benoît', 'Dimitri',
  'François', 'Guillaume', 'Hassan', 'Ivan', 'Jules', 'Kévin', 'Luca',
  'Maxime', 'Nathan', 'Olivier', 'Paul', 'Quentin', 'Romain', 'Samuel',
  'Théo', 'Ugo', 'Victor', 'William', 'Xavier', 'Antoine', 'Cédric',
  'Edouard', 'Florent', 'David', 'Hugo', 'Marc', 'Carlos', 'Ahmed',
  'Bob', 'Patrick', 'Stéphane', 'Christophe', 'Laurent', 'Nicolas',
  'Sébastien', 'Frédéric', 'Mathieu', 'Arnaud', 'Raphaël', 'Adrien',
];

const LAST_NAMES = [
  'Bernard', 'Durand', 'Benali', 'Leblanc', 'Okonkwo', 'Girard', 'Fontaine',
  'El Mansouri', 'Popescu', 'Moreau', 'Traoré', 'Renard', 'Esposito',
  'Volkov', 'Müller', 'Lindqvist', 'Santos', 'Al-Farsi', 'Petit',
  'Martin', 'Dupont', 'Leroy', 'Simon', 'Bouali', 'Dupuis', 'Rousseau',
  'Blanc', 'Laurent', 'Michel', 'Lefebvre', 'Ferrari', 'Romano',
  'Ricci', 'Schmidt', 'Ionescu', 'Silva', 'Souza', 'Oliveira',
  'Diallo', 'Koné', 'Coulibaly', 'Perez', 'Garcia', 'Martinez',
  'López', 'Gonzalez', 'Fernández', 'Kim', 'Chen', 'Wang', 'Li',
];

const DEPARTMENTS_POSITIONS = {
  Engineering: [
    'Junior Developer', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer',
    'Senior Developer', 'Lead Developer', 'Staff Engineer', 'Principal Engineer',
    'DevOps Engineer', 'SRE Engineer', 'Data Engineer', 'Machine Learning Engineer',
    'QA Engineer', 'Security Engineer', 'Mobile Developer', 'Architect',
  ],
  Marketing: [
    'Marketing Assistant', 'Marketing Coordinator', 'Marketing Specialist', 'Content Writer',
    'SEO Specialist', 'Social Media Manager', 'Brand Manager', 'Marketing Manager',
    'Growth Hacker', 'Paid Acquisition Manager', 'Content Strategist', 'CMO',
    'Campaign Manager', 'Email Marketing Specialist', 'Product Marketing Manager',
  ],
  Sales: [
    'Sales Development Rep', 'Sales Representative', 'Account Executive',
    'Senior Account Executive', 'Sales Manager', 'Regional Sales Manager',
    'Enterprise Account Manager', 'VP of Sales', 'Sales Director',
    'Business Development Manager', 'Pre-Sales Engineer', 'Customer Success Manager',
  ],
  HR: [
    'HR Assistant', 'Talent Acquisition', 'HR Generalist', 'HR Business Partner',
    'Compensation Analyst', 'Learning & Development', 'HR Manager',
    'People Operations', 'HR Director', 'Chief People Officer',
    'Recruiter', 'Employer Branding', 'HRIS Analyst',
  ],
  Finance: [
    'Finance Assistant', 'Accountant', 'Financial Analyst', 'Senior Financial Analyst',
    'Controller', 'Treasury Manager', 'Finance Manager', 'FP&A Manager',
    'CFO', 'Tax Specialist', 'Audit Manager', 'Risk Analyst', 'Budget Analyst',
  ],
  Design: [
    'Junior Designer', 'Graphic Designer', 'UX Designer', 'UI Designer',
    'Product Designer', 'Senior UX Designer', 'Design Lead', 'Design Manager',
    'Creative Director', 'Brand Designer', 'Motion Designer', 'UX Researcher',
  ],
  Operations: [
    'Operations Assistant', 'Operations Coordinator', 'Project Manager',
    'Operations Manager', 'Supply Chain Analyst', 'Logistics Manager',
    'VP Operations', 'COO', 'Process Engineer', 'Quality Manager',
    'Facility Manager', 'Program Manager',
  ],
};

const COUNTRIES = [
  'France', 'France', 'France', 'France', 'France',
  'Belgium', 'Switzerland', 'Germany', 'Italy', 'Spain',
  'Portugal', 'Romania', 'Poland', 'Sweden', 'Netherlands',
  'Morocco', 'Algeria', 'Tunisia', 'Senegal', 'Nigeria',
  'Brazil', 'Canada', 'United Kingdom', 'USA', 'Russia',
  'UAE', 'India', 'Japan', 'South Korea', 'Australia',
];

const STATUSES = ['active', 'inactive', 'on_leave'];
const STATUS_WEIGHTS = [0.80, 0.10, 0.10];
const DEPARTMENTS = Object.keys(DEPARTMENTS_POSITIONS);

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

function randomStartDate(yearsExp) {
  const latestStart = new Date('2026-04-19');
  latestStart.setFullYear(latestStart.getFullYear() - Math.max(yearsExp - 1, 0));
  const earliestStart = new Date(latestStart);
  earliestStart.setFullYear(earliestStart.getFullYear() - 2);
  const d = new Date(earliestStart.getTime() + Math.random() * (latestStart.getTime() - earliestStart.getTime()));
  return d.toISOString().slice(0, 10);
}

function salaryForPosition(department, position, yearsExp) {
  const base = {
    Engineering: 45000,
    Marketing: 38000,
    Sales: 36000,
    HR: 35000,
    Finance: 38000,
    Design: 37000,
    Operations: 36000,
  };
  const seniority = yearsExp * 1800;
  const variance = randomInt(-4000, 4000);
  return Math.round(base[department] + seniority + variance);
}

function generate() {
  const employees = [];

  for (let i = 1; i <= TOTAL; i++) {
    const gender = Math.random() > 0.48 ? 'M' : 'F';
    const firstName = gender === 'F' ? pick(FIRST_NAMES_F) : pick(FIRST_NAMES_M);
    const lastName = pick(LAST_NAMES);
    const department = pick(DEPARTMENTS);
    const position = pick(DEPARTMENTS_POSITIONS[department]);
    const age = randomInt(22, 60);
    const yearsExperience = randomInt(0, Math.min(age - 21, 35));
    const salary = salaryForPosition(department, position, yearsExperience);
    const status = pickWeighted(STATUSES, STATUS_WEIGHTS);
    const remote = Math.random() > 0.50;
    const country = pick(COUNTRIES);
    const performance = randomFloat(1.0, 5.0, 1);

    employees.push({
      id: `EMP-${pad(i, 4)}`,
      name: `${firstName} ${lastName}`,
      department,
      position,
      salary,
      startDate: randomStartDate(yearsExperience),
      status,
      age,
      gender,
      country,
      performance,
      remote,
      yearsExperience,
    });
  }

  return employees;
}

const outputPath = path.resolve(__dirname, '../data/employees.json');
const data = generate();
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`employees.json: ${data.length} records written`);
