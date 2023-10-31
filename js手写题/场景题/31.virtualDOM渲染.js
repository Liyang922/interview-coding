/* 
vnode {
    tag,
    attrs,
    children
}
*/
function render(container, vnode) {
    container.appendChild(_render(vnode));
}
function _render(vnode) {
    if(typeof vnode === "number") {
        vnode = String(vnode);
    }
    if(typeof vnode === "string") {
        return document.createTextNode(vnode);
    }
    
    const elem = document.createElement(vnode.tag);
    if(vnode.attrs) {
        Object.keys(vnode.attrs).forEach(attr => {
            elem.setAttribute(attr, vnode.attrs[attr]);
        })
    }
    vnode.children.forEach(child => render(elem, child)); //递归
    return elem;
}