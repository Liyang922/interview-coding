const tree = {
  val: 2345,
  children: [
      {
          val: 3456,
          children:[ 
              { 
                  val: 23456,
                   children: [] 
              }, 
              { 
                  val: 6777, 
                  children: [ 
                      { 
                          val: 66, 
                          children: [] 
                      } 
                  ] 
              } 
          ] 
      }, 
      { 
          val: 4545, 
          children: [ 
              { 
                  val: 44, 
                  children: [] 
              }, 
              { 
                  val: 5, 
                  children: []
              } 
          ] 
      } 
  ] 
}

// DFS
function dfs(root) {
  const result = [];
  const recursion = (node) => {
    result.push(node.val);
    if(node.children) { // 数据中叶子节点children属性为[]
      node.children.forEach(element => {
        recursion(element);
      });
    }
  }
  recursion(root);
  console.log(result);
  return result;
}

dfs(tree);

// bfs
function bfs(root) {
  const result = [];
  const queue = [];
  queue.push(root);

  while(queue.length) {
    let tmp = queue.shift();
    result.push(tmp.val);
    if(tmp.children) {
      tmp.children.forEach(element => {
        queue.push(element);
      });
    }
  }

  console.log(result);
  return result;
}

bfs(tree);

// 更偏应用
// DFS：查询节点时，带上父节点及以上节点（不是标准的树结构）
// （查询嵌套路由）
function findNode(label) {
  const visitedNodeList = [];

  const dfs = (list, target, queue = []) => {
    for(let i = 0; i < list.length; i++) {
      const node = list[i];
      visitedNodeList.push(node);
      if(node.label === target) {
        return [...queue, node.label];
      }
      if(node.children && node.children.length) {
        let result = dfs(node.children, target, [...queue, node.label]);
        if(result && result.length) {
          return result;
        }
      }
    }
  }
}

