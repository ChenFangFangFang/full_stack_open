type Height = number;
type Weight = number;
type Result = "Underweight" | "Normal range" | "Overweight" | "Obesity";

const calculateBmi = (height: Height, weight: Weight): Result => {
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

console.log(calculateBmi(180, 74)); 
