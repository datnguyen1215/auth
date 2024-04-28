/**
 * @typedef {Object} Settings
 * @property {Object} http
 * @property {number} http.port
 * @property {Object} database
 * @property {string} database.url
 */

/**
 * @returns {Promise<Settings>}
 */
const get = async () => {
  if (!process.env.HTTP_PORT)
    throw new Error('HTTP_PORT environment variable is required');

  if (!process.env.DB_CONNECTION_STRING)
    throw new Error('DB_CONNECTION_STRING environment variable is required');

  return {
    http: {
      port: process.env.HTTP_PORT
    },
    db: {
      url: process.env.DB_CONNECTION_STRING
    }
  };
};

export default get;
