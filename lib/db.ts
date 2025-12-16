import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

export async function saveSpotifyConnection(data: {
  discordId: string;
  spotifyUserId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  discordUsername?: string;
  discordAvatar?: string;
}) {
  await pool.query(
    `INSERT INTO spotify_connections 
     (discord_id, spotify_user_id, access_token, refresh_token, expires_at, discord_username, discord_avatar)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (discord_id) 
     DO UPDATE SET 
       spotify_user_id = $2,
       access_token = $3,
       refresh_token = $4,
       expires_at = $5,
       discord_username = $6,
       discord_avatar = $7,
       updated_at = CURRENT_TIMESTAMP`,
    [
      data.discordId,
      data.spotifyUserId,
      data.accessToken,
      data.refreshToken,
      data.expiresAt,
      data.discordUsername,
      data.discordAvatar
    ]
  );
}

export async function getSpotifyConnection(discordId: string) {
  const result = await pool.query(
    'SELECT * FROM spotify_connections WHERE discord_id = $1',
    [discordId]
  );
  return result.rows[0] || null;
}

export async function deleteSpotifyConnection(discordId: string) {
  await pool.query('DELETE FROM spotify_connections WHERE discord_id = $1', [discordId]);
}
