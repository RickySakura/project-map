export function easyRender(vnode, container) {
  const el = document.createElement(vnode.type)
  if (typeof vnode.children === 'string') {
    el.innerHTML = vnode.children
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => {
      easyRender(child, el)
    });
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      if (key === 'class') {
        vnode.props.class.forEach(className => {
          el.classList.add(className)
        })
      }
      if (/^on/.test(key)) {
        const name = key.slice(2).toLowerCase()
        el.addEventListener(name, vnode.props[key])
      }
      el[key] = vnode.props[key]
    }
  }
  container.appendChild(el)
}