const express = require('express');
const si = require('systeminformation');
const app = express();
const port = 3000;
let startTime;

function formatRuntime(milliseconds) {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

app.use((req, res, next) => {
  if (!startTime) {
    startTime = Date.now();
  }
  next();
});

app.get('/', (req, res) => {
  const clientIP = req.ip;
  const runtime = Date.now() - startTime;
  console.log(req.ip);
  res.send(`Your IP address is: ${clientIP}, Runtime: ${formatRuntime(runtime)}`);
});

app.get('/vm-info', async (req, res) => {
  try {
    const cpuInfo = await si.cpu();
    const memInfo = await si.mem();
    const vmInfo = {
      cpu: cpuInfo,
      memory: memInfo,
    };
    
    const runtime = Date.now() - startTime;
    res.json({ ...vmInfo, runtime: formatRuntime(runtime) });
  } catch (error) {
    console.error('Error retrieving VM information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
