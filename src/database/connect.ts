import mysql from "mysql";

const connectionString = process.env.DATABASE_URL || " ";

function connect() {
  return mysql.createConnection(connectionString);
}

export default connect;
