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
    console.log('counter 1 constructor 初始化属性和状态对象')
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

  // 生命周期
  componentWillMount() {
    console.log('counter 2 componentWillMount 组件将要挂载')
  }

  componentDidMount() {
    console.log('counter 4 componentDidMount 组件挂载完成')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('counter 5 shouldComponentUpdate 决定组件是否更新')
    return nextState.number ? nextState?.number % 2 === 0 : false;
  }

  componentWillUpdate() {
    console.log('counter 6 componentWillUpdate 组件要更新')
  }

  componentDidUpdate() {
    console.log('counter 7 componentDidUpdate 组件更新完成')
  }
  
  render() {
    console.log('counter 3 渲染')
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}><span>按钮</span></button>
      </div>
    )
  }
}

class ChildCounter extends React.Component {

  // 生命周期
  componentWillMount() {
    console.log('counterChild 2 componentWillMount 组件将要挂载')
  }

  componentDidMount() {
    console.log('counterChild 4 componentDidMount 组件挂载完成')
  }

  componentUnMount() {
    console.log('counterChild 8 componentDidMount 组件将要卸载')
  }

  componentWillReceiveProps() {
    console.log('counterChild 8 props将要获取')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('counterChild 5 shouldComponentUpdate 决定组件是否更新')
    return nextState.number % 2 === 0;
  }

  componentWillUpdate() {
    console.log('counterChild 6 componentWillUpdate 组件要更新')
  }

  componentDidUpdate() {
    console.log('counterChild 7 componentDidUpdate 组件更新完成')
  }
  

  render() {
    return (
      <div>
        子组件
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));
