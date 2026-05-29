import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default sql

// ── Init tables (call once on startup) ───────────────────────────────────────
export async function initTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      telegram_id   BIGINT PRIMARY KEY,
      username      TEXT,
      first_name    TEXT,
      joined_at     TIMESTAMPTZ DEFAULT NOW(),
      last_seen     TIMESTAMPTZ DEFAULT NOW(),
      total_lookups INTEGER DEFAULT 0
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS campaigns (
      id         SERIAL PRIMARY KEY,
      message    TEXT NOT NULL,
      sent_to    INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

// ── Users ─────────────────────────────────────────────────────────────────────
export async function getUsers() {
  return sql`
    SELECT telegram_id, username, first_name, joined_at, last_seen, total_lookups
    FROM users
    ORDER BY joined_at DESC
  `
}

export async function getUserCount() {
  const rows = await sql`SELECT COUNT(*) AS count FROM users`
  return Number(rows[0].count)
}

export async function getAllTelegramIds(): Promise<number[]> {
  const rows = await sql`SELECT telegram_id FROM users`
  return rows.map((r: any) => Number(r.telegram_id))
}

// ── Campaigns ─────────────────────────────────────────────────────────────────
export async function saveCampaign(message: string, sentTo: number) {
  return sql`
    INSERT INTO campaigns (message, sent_to)
    VALUES (${message}, ${sentTo})
    RETURNING *
  `
}

export async function getCampaigns() {
  return sql`SELECT * FROM campaigns ORDER BY created_at DESC LIMIT 20`
}