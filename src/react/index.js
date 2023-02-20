import Component from "./Component";
/**
 * @param type 元素类型
 * @param config 配置对象
 * @param children 儿子或儿子们
*/
function createElement(type, config, children) {
  let props = {...config};

  if (config) {
    delete config.__source;
    delete config.__self;
  }

  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;

  return {
    type,
    props
  }
}

const React = {
  createElement,
  Component
}

export default React;
