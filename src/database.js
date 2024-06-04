import pg from 'pg';

export const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'talento_tech',
  password: '8203',
  port: 5432,
});

