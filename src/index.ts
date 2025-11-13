import 'dotenv/config';
import express, { Request, Response } from 'express';
import { listQuizzes } from './model/quiz.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Szachowe Zoo API',
    hint: 'Update src/index.ts and nodemon will reload instantly',
  });
});

app.get('/quiz', listQuizzes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
