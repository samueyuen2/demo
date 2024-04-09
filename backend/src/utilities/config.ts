
/**
 * dotenv .env file import
 * TODO: Configure NODE_ENV in .env file, and set default to 'production'
 */
import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });
const HTTP_LISTEN_PORT: string | number = normalizePort(process.env.HTTP_LISTEN_PORT || "8080") || 8080;

const DB_DRIVER: string = process.env.DB_DRIVER || "";
const DB_SERVER: string = process.env.DB_SERVER || "";
const DB_USER: string = process.env.DB_USER || "";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
const DB_PORT: number = Number.parseInt(process.env.DB_PORT || "1433", 1433);
const DB_DB: string = process.env.DB_DB || "";

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

export {
  HTTP_LISTEN_PORT,
  DB_DRIVER,
  DB_SERVER,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_DB,
};
