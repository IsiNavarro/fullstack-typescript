import isNotNumber from "./utils.ts";

interface BmiArguments {
    height: number,
    weight: number,
}

const parseBmiArguments = (args: string[]): BmiArguments => {
    if (args.length !== 2) {
        throw new Error('Usage: npm run calculateBmi <height in cm> <weight in kg>')
    } 
    const [heightArg, weightArg] = args;
    if (isNotNumber(heightArg) || isNotNumber(weightArg)) {
        throw new Error('Height and weight must be numbers');
    }
    const height = Number(heightArg);
    const weight = Number(weightArg);
    if (height <= 0 || weight <= 0) {
        throw new Error('Height and weight must be positive');
    }
    return { height, weight };
};

type BmiCategory =
  | 'Underweight (Severe thinness)'
  | 'Underweight (Moderate thinness)'
  | 'Underweight (Mild thinness)'
  | 'Normal range'
  | 'Overweight (Pre-obese)'
  | 'Obese (Class I)'
  | 'Obese (Class II)'
  | 'Obese (Class III)';

const calculateBmi = (heightCm: number, weightKg: number): BmiCategory => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM ** 2);

  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 17) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight (Pre-obese)';
  if (bmi < 35) return 'Obese (Class I)';
  if (bmi < 40) return 'Obese (Class II)';
  return 'Obese (Class III)';
};


try {
    const {height, weight} = parseBmiArguments(process.argv.slice(2))
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let message = 'Something went wrong...'
    if (error instanceof Error) {
        message += ' Error: ' + error.message
    }
    console.log(message)
}
