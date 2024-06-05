const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const clientIP = req.ip;
  console.log(req.ip)
  res.send(`Your IP address is: ${clientIP}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});