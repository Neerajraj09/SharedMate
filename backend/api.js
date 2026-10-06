const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from FairShare backend on Vercel!');
});

// Export handler
module.exports = (req, res) => {
  app(req, res);
};
