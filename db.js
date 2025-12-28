import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://am_commercial_db_user:sBMjwfC9sqw4tP9vi5k0G7SnidsrKYPh@dpg-d58biner433s73f62vhg-a.virginia-postgres.render.com/am_commercial_db",
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

