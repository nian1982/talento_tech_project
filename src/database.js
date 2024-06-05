import pg from 'pg';

export const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prueba01',
  password: '8203',
  port: 5432,
});

