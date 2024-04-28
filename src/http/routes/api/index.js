import { Router } from 'express';
import auth from './auth';

const api = () => {
  const router = Router();

  router.use('/auth', auth());

  return router;
};

export default api;
