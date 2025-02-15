import { readFileSync } from "fs";
import path from "path";
import pool from "./database";

(async function () {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    console.log("PATH", path.join(__dirname, "../tables.sql"));
    const query = readFileSync(path.join(__dirname, "../tables.sql"), "utf-8");
    await client.query(query);
    await client.query("COMMIT");
    console.log("Tables Created Successfully");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
})()
  .then((e) => {
    (async function () {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        console.log("PATH", path.join(__dirname, "../data.sql"));
        const query = readFileSync(
          path.join(__dirname, "../data.sql"),
          "utf-8"
        );
        await client.query(query);
        await client.query("COMMIT");
        console.log("Data Inserted Successfully");
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
        process.exit(0);
      }
    })();
  })
  .catch((e) => {
    console.error(e);
    process.exit(0);
  });
