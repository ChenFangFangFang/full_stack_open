import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

// JSON parser middleware
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }

    const result = calculateBmi(height, weight);
    res.json(result);
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

app.post('/exercises', (req, res) => {
  try {
    const body = req.body as ExerciseRequest;
    
    if (!body.daily_exercises || !body.target) {
      res.status(400).json({ error: "parameters missing" });
      return;
    }

    if (!Array.isArray(body.daily_exercises) || typeof body.target !== 'number') {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }

    if (body.daily_exercises.some(hours => typeof hours !== 'number')) {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }

    const result = calculateExercises(body.daily_exercises, body.target);
    res.json(result);
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});