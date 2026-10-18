import {isNotNumber} from './utils.ts';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 2) {
    throw new Error('Usage: npm run calculateExercises <target> <hours day 1> [<hours day 2> ...]');
  }
  if (args.some(isNotNumber)) {
    throw new Error('All arguments must be numbers');
  }
  const [target, ...dailyHours] = args.map(Number);
  if (target <= 0) {
    throw new Error('Target must be greater than zero');
  }
  if (dailyHours.some(h => h < 0)) {
    throw new Error('Daily hours cannot be negative');
  }
  return { target, dailyHours };
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  const ratio = average / target;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (ratio >= 1) {
    rating = 3;
    ratingDescription = 'great job, target reached!';
  } else if (ratio >= 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to train more';
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

if (import.meta.main) {
    try {
        const { target, dailyHours } = parseExerciseArguments(process.argv.slice(2));
        console.log(calculateExercises(dailyHours, target));
    } catch (error: unknown) {
        let message = 'Something went wrong.';
        if (error instanceof Error) {
            message += ' Error: ' + error.message;
    }
        console.log(message);
    }
}