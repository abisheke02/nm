const path = require('path');
const EmbeddedPostgres = require('embedded-postgres').default;

const PORT = Number(process.env.DB_PORT || 5433);
const USER = process.env.DB_USER || 'postgres';
const PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DATABASE = process.env.DB_NAME || 'nithya_commerce';

const pg = new EmbeddedPostgres({
  databaseDir: path.join(__dirname, 'data'),
  user: USER,
  password: PASSWORD,
  port: PORT,
  persistent: true,
});

async function main() {
  await pg.initialise();
  await pg.start();

  const exists = await pg
    .getPgClient()
    .then(async (client) => {
      await client.connect();
      const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [DATABASE]);
      await client.end();
      return res.rowCount > 0;
    });

  if (!exists) {
    await pg.createDatabase(DATABASE);
    console.log(`Created database "${DATABASE}"`);
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
