type Height2 = number;
type Weight2 = number;
type Result2 = "Underweight" | "Normal range" | "Overweight" | "Obesity";

const calculateBmi2 = (height: Height2, weight: Weight2): Result2 => {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

const parseArguments = (args: string[]): { height: Height2; weight: Weight2 } => {
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
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi2(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log('Error:', errorMessage);
} 
