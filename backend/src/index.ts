import express, { RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticateJWT, generateToken, AuthRequest } from './auth';
import booksRouter from './routes/books';
import chaptersRouter from './routes/chapters';
import scenesRouter from './routes/scenes';
import branchesRouter from './routes/branches';
import commitsRouter from './routes/commits';
import diffsRouter from './routes/diffs';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', ((req, res) => {
  res.send('Narrative Flow backend is running!');
}) as RequestHandler);

app.post('/login', ((req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: 'Username required' });
    return;
  }
  const token = generateToken({ username });
  res.json({ token });
}) as RequestHandler);

app.get('/protected', authenticateJWT as RequestHandler, ((req, res) => {
  res.json({ message: 'Protected route', user: (req as AuthRequest).user });
}) as RequestHandler);

app.use('/api/books', booksRouter);
app.use('/api/chapters', chaptersRouter);
app.use('/api/scenes', scenesRouter);
app.use('/api/branches', branchesRouter);
app.use('/api/commits', commitsRouter);
app.use('/api/diffs', diffsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
