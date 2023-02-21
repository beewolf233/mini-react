import { createDOM } from '../react-dom';

// 更新队列
export let updateQueue = {
  isBatchingUpdate: false, // 当前是否处于批量更新模式，默认值为false
  updaters: new Set(),
  batchUpdate() { // 批量更新
    for (let updater of this.updaters) {
      updater.updateClassComponent();
    }
    this.isBatchingUpdate = false
  }
}

/**
 * 更新器
 * */ 
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance; // 类组件实例
    this.pendingStates = []; // 等待生效的状态，可能是一个对象 也可能是一个函数
    this.callbacks = [];
  }

  // 批量更新
  addState(partialState, callback) {
    this.pendingStates.push(partialState);
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }

    if (updateQueue.isBatchingUpdate) { // 如果当前是批量更新模式
      // this updater 实例
      updateQueue.updaters.add(this); // 本次setState调用结束
    } else {
      this.updateClassComponent(); // 直接更新组件
    }
  }


  updateClassComponent() {
    let { classInstance, pendingStates, callbacks } = this;

    // 如果有等待更新的状态对象
    if (pendingStates.length > 0) {
      classInstance.state = this.getState();
      classInstance.forceUpdate();
      callbacks.forEach(cb => cb());
      callbacks.length = 0;
    }
  }

  getState() { // 如何计算最新状态
    let { classInstance, pendingStates } = this;
    let { state} = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === 'function') {
        nextState = nextState.call(classInstance, state)
      }

      state = {...state, ...nextState};
    });

    pendingStates.length = 0; // 清空数组
    return state
  }


}


class Component {

  static isReactComponent = true;

  constructor(props) {
    this.props = props;
    this.state = {};
    // this 类实例
    this.updater = new Updater(this);
  }

  setState(partialState, callback) {
    this.updater.addState(partialState, callback)
    // let state = this.state;
    // this.state = {
    //   ...state,
    //   ...partialState
    // }
    // let newVdom = this.render();
    // updateClassComponent(this, newVdom)
  }

  forceUpdate() {
    let newVdom = this.render();
    updateClassComponent(this, newVdom)
  }

  render() {
    throw new Error("此方法为抽象方法，实现了类实现")
  }
}


function updateClassComponent(classInstance, newVdom) {
  let oldDom = classInstance.dom; // 取出老dom
  let newDom = createDOM(newVdom);
  oldDom.parentNode.replaceChild(newDom, oldDom); 
  classInstance.dom = newDom;
}
export default Component;
