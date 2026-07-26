export const persona = {
  name: 'Mohit Sharma',
  age: 22,
  gender: 'M',
  role: 'Analyst at an MNC',
  city: 'Pune',
  lives: 'Lives in a PG, away from home',
  avatar: '🧑🏽‍💻',
  desire:
    'Craves his mother’s cooking — wants simple, high-quality, hot meals at office (lunch) and PG (dinner).',
  values: ['Quality of oil & ingredients', 'Food served hot', 'Simple, low-masala home food'],
  frustrations: [
    'PG mess is inaccessible during office hours',
    'PG kitchen is unhygienic',
    'Dabbawalas serve uncooked rotis and over-spiced sabzi',
    'Cafeteria food is unsuitable for daily consumption',
  ],
} as const

export type Persona = typeof persona
