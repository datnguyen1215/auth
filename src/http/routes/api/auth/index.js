import { Router } from 'express';
import signup from './signup';
import login from './login';

const auth = () => {
  const router = Router();

  router.use('/signup', signup());
  router.use('/login', login());

  return router;
};

export default auth;
