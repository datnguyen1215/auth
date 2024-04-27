import { Router } from 'express';

/**
 * Creating a healthcheck route.
 * Served at /healthcheck.
 * @returns {Router}
 */
const healthcheck = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('OK');
  });

  return router;
};

export default healthcheck;
