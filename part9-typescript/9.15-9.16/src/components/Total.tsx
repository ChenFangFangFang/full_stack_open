interface CoursePart {
    name: string;
    exerciseCount: number;
  }
  
  interface ContentProps {
    courseParts: CoursePart[];
  }
const Total = ({ courseParts }: ContentProps) => {
  return (
    <p>
      Number of exercises {courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;