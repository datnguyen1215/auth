/**
 * @typedef {Object} InsertUserDetails
 * @property {string} email
 * @property {string} [password]
 * @property {string} first_name
 * @property {string} [last_name]
 * @property {string} [gender]
 */

/**
 * @typedef {Object} User
 * @property {string} email
 * @property {string} first_name
 * @property {string} [last_name]
 * @property {string} [gender]
 */

import db from '@src/db';
import bcrypt from 'bcrypt';
import settings from '@/src/settings';
import errors from '@/src/errors';

const config = settings.get();

/**
 * Insert a new user into the database.
 * @param {InsertUserDetails} user
 * @returns {Promise<User>}
 */
const insert = async user => {
  try {
    if (!user.email || !user.first_name)
      throw errors.create({
        status: 400,
        code: errors.codes.MISSING_FIELDS,
        message: `Missing either email, password, or first_name.`
      });

    const query = `
    INSERT INTO users (email, password, first_name, last_name, gender)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

    // user may or may not contain password.
    // reason: user is created by a third-party service
    let password = user.password;
    if (password)
      password = await bcrypt.hash(user.password, config.password.salt_rounds);

    const params = [
      user.email,
      password,
      user.first_name,
      user.last_name,
      user.gender
    ];

    const { rows } = await db.query(query, params);
    return { ...rows[0], password: undefined };
  } catch (error) {
    if (Object.values(errors.codes).includes(error.code)) throw error;

    throw errors.create({
      status: 500,
      code: errors.codes.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
};

export default insert;
