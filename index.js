const express = require('express');
const si = require('systeminformation');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const clientIP = req.ip;
  console.log(req.ip)
  res.send(`Your IP address is: ${clientIP}, I wanna change this file`);
});
app.get('/vm-info', async (req, res) => {
  try {
    const cpuInfo = await si.cpu();
    const memInfo = await si.mem();
    const vmInfo = {
      cpu: cpuInfo,
      memory: memInfo,
    };
    
    res.json(vmInfo);
  } catch (error) {
    console.error('Error retrieving VM information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
