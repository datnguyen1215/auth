/**
 * @typedef {Object} Settings
 * @property {Object} http
 * @property {number} http.port
 * @property {Object} db
 * @property {string} db.url
 * @property {Object} password
 * @property {number} password.salt_rounds
 */

/**
 * Get settings from environment variables.
 * @returns {Settings}
 */
const get = () => {
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
    },
    password: {
      salt_rounds: parseInt(process.env.PASSWORD_SALT_ROUNDS) || 10
    }
  };
};

export default get;
