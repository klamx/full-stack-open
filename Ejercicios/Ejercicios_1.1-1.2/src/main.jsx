import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element) => {
        return <Part key={element.name} part={element} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  const arrPart = parts.map((element) => element.exercises);
  const exercises = arrPart.reduce((a, b) => {
    return a + b;
  }, 0);
  return <p>Number of exercises {exercises}</p>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
