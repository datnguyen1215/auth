import db from '@/src/db';
import errors from '@/src/errors';
import bcrypt from 'bcrypt';

const post = () => async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw errors.create({
        status: 400,
        code: errors.codes.MISSING_FIELDS,
        message: 'Missing required fields'
      });

    const users = await db.users.get({ email });

    if (!users.length)
      throw errors.create({
        status: 401,
        code: errors.codes.INVALID_CREDENTIALS,
        message: 'Email or password is incorrect'
      });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      throw errors.create({
        status: 401,
        code: errors.codes.INVALID_CREDENTIALS,
        message: 'Email or password is incorrect'
      });

    res.json({ user: { ...user, password: undefined } });
  } catch (err) {
    next(err);
  }
};

export default post;
