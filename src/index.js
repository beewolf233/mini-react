// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './react';
import ReactDOM from './react-dom';

// let element1 = <h1 id="title">hello</h1>;

// console.log(element1);
/***
 * 1. 普通标签
 * */ 
// ReactDOM.render(<h1>hello</h1>, document.getElementById('root'));


/***
 * 2. 函数组建
 * */ 
// function Welcome(props) {
//   return <h2>Hello, {props.name}</h2>
// }

// ReactDOM.render(<Welcome name="zhangfeng" />, document.getElementById('root'));

/**
 * 类组件
 * 可以在构造函数里 并且只能在构造函数里的this.state赋值
 * 定义状态对象
 * 属性对象 父组件给的 不能改变
 * 
 * 合成事件和批量更新
 * 在react里，事件的更新可能是异步的，是批量的， 不是同步的
 * */ 

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }

  handleClick = () => {
    this.setState((lastState) => ({ number: lastState.number + 1 }), () => {
      console.log('callback1', this.state.number);
    })
    this.setState((lastState) => ({ number: lastState.number + 1 }), () => {
      console.log('callback2', this.state.number);
    })

    console.log(this.state.number)
    // this.setState({ number: this.state.number + 1})
    // this.setState({ number: this.state.number + 1})
    // console.log(this.state.number)

    Promise.resolve().then(() => {
      this.setState((lastState) => ({ number: lastState.number + 1 }), () => {
        console.log('callback3', this.state.number);
      })
      console.log(this.state.number)

      this.setState((lastState) => ({ number: lastState.number + 1 }), () => {
        console.log('callback4', this.state.number);
      })
    })

    // setTimeout(() => {
    //   this.setState({ number: this.state.number + 1 })
    //   console.log(this.state.number)
    //   this.setState({ number: this.state.number + 1})
    //   console.log(this.state.number)
    // }, 1000)
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}><span>按钮</span></button>
      </div>
    )
  }
}


ReactDOM.render(<Counter />, document.getElementById('root'));
