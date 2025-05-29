const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route works!');
});

app.listen(3000, () => {
  console.log('Test server running on http://localhost:3000');
});