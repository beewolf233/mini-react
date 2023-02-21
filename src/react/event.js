import {
  updateQueue
} from './Component';

/**
 * 给真实DOM添加事件处理函数
 * 为什么这么做？合成事件？ 为什么要做事件委托或者事件代理
 * 1 做兼容处理 兼容不同的浏览器 不同的浏览器event是不一样的 处理浏览器的兼容性
 * 2 可以在 写的自定义事件处理中 处理函数之前 和 函数之后做的一些事情
 *   之前 updateQueue.isBatchingUpdate = true
 *   之后 updateQueue.batchUpdate()
 * @param {*} dom 真实DOM
 * @param {*} eventType 事件类型
 * @param {*} listener 监听函数

 * */ 

export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {});
  store[eventType] = listener; // store.onclick = handleClick

  if (!document[eventType]) {
    // 事件委托 不管你给哪个DOM绑定事件 最后统一代理到document上去
    document[eventType] = dispatchEvent;
  }
}


let syntheticEvent = {
  stopping: false,
  stopPropagation() {
    this.stopping = true
  }
};

// 原生DOM
function dispatchEvent(event) {
  let { target, type } = event;
  let eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true; // 把队列设为批量更新模式
  createSntheticEvent(event);
  while(target) {
    let { store } = target;
    let listener = store && store[eventType];
    listener && listener.call(target, syntheticEvent);
    if (syntheticEvent.stopping) {
      break;
    }
    target = target.parentNode;
  }

  for (let key in syntheticEvent) {
    syntheticEvent[key] = null
  }
  updateQueue.batchUpdate();
}

function createSntheticEvent(nativeEvent) {
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]
  }
}