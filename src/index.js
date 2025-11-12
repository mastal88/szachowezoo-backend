const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Szachowe Zoo API',
    hint: 'Update src/index.js and nodemon will reload instantly',
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

module.exports = app;
