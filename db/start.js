const fs = require('fs');
const path = require('path');
const EmbeddedPostgres = require('embedded-postgres').default;

const PORT = Number(process.env.DB_PORT || 5433);
const USER = process.env.DB_USER || 'postgres';
const PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DATABASE = process.env.DB_NAME || 'nithya_commerce';
const DATA_DIR = path.join(__dirname, 'data');

const pg = new EmbeddedPostgres({
  databaseDir: DATA_DIR,
  user: USER,
  password: PASSWORD,
  port: PORT,
  persistent: true,
  initdbFlags: ['--encoding=UTF8', '--locale=C'],
});

async function main() {
  const alreadyInitialised = fs.existsSync(path.join(DATA_DIR, 'PG_VERSION'));
  if (!alreadyInitialised) {
    await pg.initialise();
  }
  await pg.start();

  try {
    await pg.createDatabase(DATABASE);
    console.log(`Created database "${DATABASE}"`);
  } catch {
    // database already exists from a previous run — nothing to do
  }

  console.log('');
  console.log(`Postgres is running on 127.0.0.1:${PORT}`);
  console.log(`DATABASE_URL=postgres://${USER}:${PASSWORD}@127.0.0.1:${PORT}/${DATABASE}`);
  console.log('');
  console.log('Press Ctrl+C to stop.');

  const shutdown = async () => {
    console.log('\nStopping Postgres...');
    await pg.stop();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  console.error('Failed to start local Postgres:', err);
  process.exit(1);
});
