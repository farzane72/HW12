const El = ({ element,child,restAttrs, ...rest }) => {
  const el = document.createElement(element);
  //console.log(rest)
  for (const key in rest) {
    el[key] = rest[key];
  }
  for (const key in restAttrs) {
   el.setAttribute(key, restAttrs[key])
  }

  if (child && Array.isArray(child)) {
   
   el.append(...child)

  } else if (child) {
    el.append(child)
  }
  //if (restAtr && Array.isArray(restAtr)) {
   
    
  //} 

  return el
}

export default El
