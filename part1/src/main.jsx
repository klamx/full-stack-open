import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hellow {props.name}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Greeting</h1>
      <Hello name='Alejandro' />
      <Hello name='Pepe' />
      <Hello name='Argemiro' />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
