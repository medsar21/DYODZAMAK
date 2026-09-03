import EmbeddedPostgres from "embedded-postgres";

const pg = new EmbeddedPostgres({
  databaseDir: "./.postgres/data",
  user: "dyodzamak",
  password: "dyodzamak",
  port: 5432,
  persistent: true,
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
});

const shutdown = async (signal) => {
  console.log(`Shutting down embedded Postgres (${signal})...`);
  try {
    await pg.stop();
  } finally {
    process.exit(0);
  }
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

async function main() {
  console.log("Initializing embedded Postgres...");
  await pg.initialise();

  console.log("Starting embedded Postgres on localhost:5432...");
  await pg.start();

  try {
    await pg.createDatabase("dyodzamak");
    console.log("Database dyodzamak is ready.");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.toLowerCase().includes("already exists")) {
      throw error;
    }
    console.log("Database dyodzamak already exists.");
  }

  console.log("Embedded Postgres is running.");
  await new Promise(() => {});
}

main().catch(async (error) => {
  console.error("Failed to start embedded Postgres:", error);
  try {
    await pg.stop();
  } catch {}
  process.exit(1);
});
