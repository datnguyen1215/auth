import express from 'express';
import http from 'http';
import routes from './routes';

const app = express();
const server = http.createServer(app);

app.use('/healthcheck', routes.healthcheck());

const start = () => {
  return new Promise((resolve, reject) => {
    server.listen(3000, err => {
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
