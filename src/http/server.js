import express from 'express';
import http from 'http';
import routes from './routes';
import settings from '../settings';

const app = express();
const server = http.createServer(app);

app.use('/healthcheck', routes.healthcheck());

const start = () => {
  return new Promise(async (resolve, reject) => {
    const config = await settings.get();

    server.listen(config.http.port, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

const stop = () => {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

export default { start, stop };
