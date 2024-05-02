/**
 * @typedef {object} GetUserOptions
 * @property {string} [uuid]
 * @property {string} [email]
 */

/**
 * @typedef {object} User
 * @property {string} uuid
 * @property {string} password
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} gender
 * @property {string} created_at
 * @property {string} updated_at
 */

import sql from '@/src/utils/sql';
import format from 'pg-format';
import db from '..';
import errors from '@/src/errors';

/**
 * Get users from the database based on the options provided.
 * @param {GetUserOptions} options
 * @returns {Promise<User[]>} A promise that resolves with an array of users.
 */
const get = async options => {
  const { uuid, email } = options;

  if (!uuid && !email)
    throw errors.create({
      status: 400,
      code: errors.codes.MISSING_FIELDS,
      message: 'Missing required fields'
    });

  const where = sql.where(
    sql.and(
      sql.condition({
        column: 'uuid',
        value: uuid,
        operator: '=',
        type: 'uuid'
      }),
      sql.condition({
        column: 'email',
        value: email,
        operator: '='
      })
    )
  );

  const query = format(`SELECT * FROM users %s`, where);

  const { rows } = await db.query(query);
  return rows;
};

export default get;
