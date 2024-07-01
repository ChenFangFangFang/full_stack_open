# React + Vite

// Header component
const Header = ({ courseName }) => {
return <h1>{courseName}</h1>;
};

// Part component
const Part = ({ part }) => {
return (
<p>
{part.name} {part.exercises}
</p>
);
};

// Content component
const Content = ({ parts }) => {
return (
<div>
{parts.map(part => (
<Part key={part.id} part={part} />
))}
</div>
);
};

// Total component
const Total = ({ parts }) => {
const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
return <p><strong>Total of {totalExercises} exercises</strong></p>;
};

// Course component
const Course = ({ course }) => {
return (
<div>
<Header courseName={course.name} />
<Content parts={course.parts} />
<Total parts={course.parts} />
</div>
);
};

export default Course;
