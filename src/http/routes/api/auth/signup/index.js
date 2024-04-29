import { Router } from 'express';
import post from './post';

const signup = () => {
  const router = Router();

  router.post('/', post());

  return router;
};

export default signup;
