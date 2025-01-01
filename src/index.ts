import express, { Express } from 'express';

import cors from 'cors';

const app: Express = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`> Ready on port ${port}`);
});

module.exports = app;
