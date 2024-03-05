import express from 'express';
const app = express();
const port = 3000; // You can change this port as needed

app.get('/', (req, res) => {
  res.send('Hello, Pterodactyl Daemon!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
