import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();
  const result = await client.query(
    "select current_user, current_database(), version()"
  );
  console.log(JSON.stringify(result.rows, null, 2));
} finally {
  await client.end().catch(() => {});
}
