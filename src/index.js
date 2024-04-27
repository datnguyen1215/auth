import './alias';
import http from '@src/http';

(async () => {
  await http.server.start();
  console.log('Server is running on port 3000');
})();
