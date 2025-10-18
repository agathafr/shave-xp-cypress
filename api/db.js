const { Pool } = require('pg');
require('dotenv/config');

// Config do Postgres (Aiven exige SSL)
const dbConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_NAME,
  port: Number(process.env.POSTGRES_PORT),
  ssl: { rejectUnauthorized: false }, // << obrigatório no Aiven
};

const pool = new Pool(dbConfig);

/**
 * Remove um usuário pelo e-mail.
 * Retorna void (lança erro se falhar).
 */
async function deleteUser(email) {
  await pool.query('DELETE FROM users WHERE email = $1', [email]);
}

/**
 * Insere um usuário e retorna o id criado.
 * Espera um objeto: { name, email, password, is_shaver }
 */
async function insertUser(user) {
  const sql = `
    INSERT INTO users (name, email, password, is_shaver)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  const data = [user.name, user.email, user.password, user.is_shaver];
  const result = await pool.query(sql, data);
  return result.rows[0].id;
}

/**
 * Busca o token mais recente de recuperação/validação para um e-mail.
 * Retorna { token } ou undefined se não existir.
 */
async function findToken(email) {
  const sql = `
    SELECT B.token
      FROM users A
      JOIN user_tokens B ON A.id = B.user_id
     WHERE A.email = $1
  ORDER BY B.created_at DESC
     LIMIT 1
  `;
  const result = await pool.query(sql, [email]);
  return result.rows[0];
}

module.exports = {
  deleteUser,
  insertUser,
  findToken,
};