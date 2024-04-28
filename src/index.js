import 'dotenv/config';
import './alias';
import http from '@src/http';
import settings from './settings';

process.on('unhandledRejection', reason => {
  console.error(`Unhandled Rejection, reason: ${reason.stack || reason}`);
  process.exit(1);
});

process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

(async () => {
  const config = await settings.get();
  console.log(`Config: ${JSON.stringify(config)}`);

  await http.server.start();
  console.log('Server is running on port 3000');
})();
