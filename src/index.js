import http from './http';

(async () => {
  await http.server.start();
  console.log('Server is running on port 3000');
})();
