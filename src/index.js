import React from './react';
import ReactDOM from './react-dom';

let element1 = <h1 id="title">hello</h1>;

console.log(element1);

function Welcome(props) {
  return <h2>Hello, {props.name}</h2>
}

ReactDOM.render(<Welcome name="zhangfeng" />, document.getElementById('root'));

// ReactDOM.render(<h1>hello</h1>, document.getElementById('root'));