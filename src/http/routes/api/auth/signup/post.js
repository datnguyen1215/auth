import errors from '@/src/errors';
import db from '@/src/db';

/**
 * @returns {import('express').RequestHandler}
 */
const post = () => async (req, res, next) => {
  try {
    const { password, first_name, last_name, email, gender } = req.body;

    if (!password)
      throw errors.create({
        status: 400,
        code: errors.codes.MISSING_FIELDS,
        message: `Missing password.`
      });

    const user = await db.users.insert({
      password,
      first_name,
      last_name,
      email,
      gender
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export default post;
