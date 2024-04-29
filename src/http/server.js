import express from 'express';
import http from 'http';
import routes from './routes';
import settings from '../settings';

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use('*', (req, _, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/healthcheck', routes.healthcheck());
app.use('/api', routes.api());

// handle general errors when called next(err)
app.use((err, _req, res, _next) => {
  res
    .status(err.status)
    .json({ error: { code: err.code, message: err.message } });
});

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
