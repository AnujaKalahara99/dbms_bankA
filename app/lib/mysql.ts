import mysql, { Connection } from "mysql2/promise";

let connection: Connection;

export const connectToDatabase = async (): Promise<Connection> => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
  }
  if (connection) console.log("Connected to DB");

  return connection;
};
