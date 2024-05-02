import { Router } from 'express';
import post from './post';

const login = () => {
  const router = Router();

  router.post('/', post());

  return router;
};

export default login;
