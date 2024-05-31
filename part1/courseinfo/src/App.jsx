const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  );
};


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map((part,index) =>(
      <Part key={index} name={part.name} exercises={part.exercises} />
    ))}
    </div>
  )
}
export default App