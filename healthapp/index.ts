import express from 'express';
import {isNotNumber} from './utils.ts';
import {calculateBmi} from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
        res.status(400).json({error: "malformatted parameters"});
        return;
    }

    const heightNum = Number(height);
    const weightNum = Number(weight);

    res.json({
        height: heightNum,
        weight: weightNum,
        bmi: calculateBmi(heightNum, weightNum)
    });

});

app.post('/exercises', (req, res) => {
  const body: unknown = req.body;

  console.log('Body: ', req.body);

  if (
    typeof body !== 'object' || body === null ||
    !('daily_exercises' in body) || !('target' in body)
  ) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  const { daily_exercises, target } = body;

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    daily_exercises.some(isNotNumber) ||
    isNotNumber(target) ||
    Number(target) <= 0
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json(calculateExercises(daily_exercises.map(Number), Number(target)));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});