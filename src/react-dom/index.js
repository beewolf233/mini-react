/**
 * 使用虚拟dom的属性 更新到创建的真实DOM属性
 * @param dom 真实dom
 * @param newProps 新属性对象
 * */ 
function updateProps(dom, newProps) {
  for (let key in newProps) {
    if (key === 'children') continue;
    if (key === 'style') {
      let styleObj = newProps.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else {
      dom[key] = newProps[key]
    }
  }

}

/**
 * 
 * @param childrenVdom 儿子们虚拟dom
 * @param parentDOM 父子真实dom
 * */ 
function reconcileChildren(childrenVdom, parentDOM) {
  childrenVdom.forEach(vElement => {
    render(vElement, parentDOM)
  });
}

/**
 * 将一个类型为自定义函数组建的虚拟DOM 转换为真实DOM反悔
 * 
 * **/ 
function mountFunctionComponent(vdom) {
  let { type: functionComponent, props } = vdom;
  let renderVdom = functionComponent(props);
  return createDOM(renderVdom);
}

/**
 * 将虚拟节点变为 真实节点
 * @param vdom 虚拟节点
*/
function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  // 否则 它就是一个虚拟DOM对象，也就是React元素
  const { type, props } = vdom;
  let dom;
  if (typeof type === 'function') { // 自定义函数组建
    return mountFunctionComponent(vdom);
  } else {
    dom = document.createElement(type);
  }
  
  // 使用虚拟dom props 更新真实dom props
  updateProps(dom, props);
  // 处理儿子
  const pChildren = props.children;
  if (typeof pChildren === 'string' || typeof pChildren === 'number') {
    dom.textContent = pChildren;
  } else if (typeof pChildren === 'object' && pChildren.type) {
    render(pChildren, dom);
  } else if (Array.isArray(pChildren)){
    reconcileChildren(pChildren, dom);
  } else {
    document.textContent = pChildren ? props.children.toString() : '';
  }
  // vdom.dom = dom;
  return dom;
}
/**
 * 1 vdom 变成真实dom 
 * @param vdom 要渲染的虚拟dom
 * @param container 要把虚拟dom 换真实DOM 并插入到容器中去
 * */ 
function render(vdom, container) {
  const dom = createDOM(vdom);
  console.log(vdom, 23344)
  container.appendChild(dom);
}

const ReactDOM = {
  render
};

export default ReactDOM;