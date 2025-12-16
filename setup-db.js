require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔗 Connected to database...');
    
    // Read SQL file
    const sqlPath = path.join(__dirname, 'setup-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 Running database setup...');
    await client.query(sql);
    
    console.log('✅ Database setup completed successfully!');
    console.log('\n📊 Table created: spotify_connections');
    console.log('🔍 Indexes created for optimal performance');
    console.log('⚡ Triggers configured for auto-updates\n');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase();
