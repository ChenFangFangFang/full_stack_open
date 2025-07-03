type Height = number;
type Weight = number;
type Result = "Underweight" | "Normal range" | "Overweight" | "Obesity";

interface BmiResult {
  weight: number;
  height: number;
  bmi: Result;
}

export const calculateBmi = (height: Height, weight: Weight): BmiResult => {
  const bmiValue = weight / ((height / 100) ** 2);
  let bmiCategory: Result;

  if (bmiValue < 18.5) {
    bmiCategory = "Underweight";
  } else if (bmiValue < 25) {
    bmiCategory = "Normal range";
  } else if (bmiValue < 30) {
    bmiCategory = "Overweight";
  } else {
    bmiCategory = "Obesity";
  }

  return {
    weight,
    height,
    bmi: bmiCategory
  };
};

const parseArguments = (args: string[]): { height: Height; weight: Weight } => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive numbers!');
  }

  return {
    height,
    weight
  };
};

try {
  if (require.main === module) {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  }
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log('Error:', errorMessage);
}