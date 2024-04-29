import { Router } from 'express';
import signup from './signup';

const auth = () => {
  const router = Router();

  router.use('/signup', signup());

  return router;
};

export default auth;
