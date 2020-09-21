// 淘宝特价版前端笔试题

// 1. 实现一个Promise.race

function race(values) {
  // 校验values参数是否为数组
  if (!isArray(values)) {
    return Promise.reject(new Error('must be Array'));
  }

  return new Promise((resovle, reject) => {
    // 遍历迭代对象
    values.forEach(value => {
      Promise.resolve(value).then(resovle, reject);
    });
  });
}

// ## 2. XHR 请求缓存与合并

// 对于一个复杂的 web 应用来说，把多条同类型的异步请求合并成一条异步请求，是一个常见的提高性能的方式。
// 假设有接口 getUserById , getUserByIds ，在系统各处被使用。
// - getUserById 接受 用户 id 作为参数，发起 XHR 按 用户 id 查询对应的用户详情
// - getUserByIds 接受 用户 id数组 作为参数，发起 XHR 按 用户 id数组 查询对应的用户组详情

// ```js
// function getUserById(userId) {
//   return fetch(`/api/user/${userId}`).then(resp => resp.json());
// }
// function getUserByIds(ids) {
//   return fetch(`/api/users/${ids.join(",")}`).then(resp => resp.json());
// }
// ```

// 这时候我们希望能做如下优化:

// - 当同时调用多个 getUserById 函数时，自动把它们合并成一个新的请求 getUserByIds ，合并处理。一次返回所有结果。
// - 设计一个缓存，当再次调用之前调用过的 getUserById(1) 时，从缓存中取之前查到的结果。（不考虑服务端的数据更新问题）
// - 考虑请求失败时的情形。

const userStore = {};
let uidSet = new Set();
let promise = null;

function getUserByIds(ids) {
  const notExistIds = ids.filter(id => !userStore[id]);
  if (!notExistIds.length) {
    return Promise.resolve(ids.map(id => userStore[id]));
  }
  return fetch(`/api/users/${notExistIds.notExistIds(",")}`)
    .then(resp => resp.json())
    .then(users => {
      users.forEach(user => userStore[user.id] = user);
      return Promise.resolve(ids.map(id => userStore[id]));
    });
}

function getUserById(userId) {
  const user = userStore[userId];
  if (user) {
    return Promise.resolve(user);
  }
  uidSet.push(userId);
  return new Promise((resovle, reject) => {
    // 延迟请求，当主线程执行完时，执行回调队列
    setTimeout(() => {
      const uids = Array.from(uidSet);
      if (uids.length) {
        uidSet = new Set();
        promise = getUserByIds(uids);
      }
      if (promise) {
        promise.then(() => {
          promise = null;
          resovle(userStore[userId]);
        }).catch(err => {
          promise = null;
          reject(err);
        });
      } else {
        resovle(userStore[userId]);
      }
    }, 0);
  });
}


// ## 3. 将一个 html 字符串变成树的形式

// ```html
// <div id="main" data-x="hello">Hello<span id="sub" /></div>
// ```

// 这样的一串字符串变成如下的一棵树，考虑尽可能多的形式，比如自闭合标签等。

// ```
//      {
//       tag: "div",
//       selfClose: false,
//       attributes: {
//         "id": "main",
//         "data-x": "hello"
//       },
//       text: "Hello",
//       children: [
//         {
//           tag: "span",
//           selfClose: true,
//           attributes: {
//             "id": "sub"
//           }
//         }
//       ]
//     }
// ```

const WHITESPACE = /\s/;

// 分词
function tokenizer(html) {
  let cursor = 0;
  const tokens = [];
  while (cursor < html.length) {
    const char = html[cursor];

    // 空字符串 跳过
    if (WHITESPACE.test(char)) {
      cursor++;
      continue;
    }

    if (char === '<') {
      // 结束标签
      if (html[cursor + 1] === '/') {
        let str = '';
        while (html[cursor] !== '>') {
          str += html[cursor];
          cursor++;
        }
        tokens.push(str + '>');
      } else {
        tokens.push(char);
      }
      cursor++;
      continue;
    }

    // 自闭合标签
    if (char === '/' && html[cursor + 1] === '>') {
      tokens.push('/>');
      cursor += 2;
      continue;
    }

    if (char === '>') {
      tokens.push(char);
      cursor++;
      continue;
    }

    // 截取文本
    let str = '';
    let lChar = char;
    while (!WHITESPACE.test(lChar) && !['>', '<', '/'].includes(lChar)) {
      str += lChar;
      lChar = html[++cursor];
    }
    tokens.push(str);
  }
  return tokens;
}

// 解析
// PS： 默认最外层只有一个标签，如果最外层多个标签，可以自定义一个根节点，然后调用
function parser(tokens) {
  let cursor = 0;

  function walk() {
    let label = tokens[cursor];
    // 开始标签
    if (label === '<') {
      const node = {
        tag: tokens[++cursor],
        attributes: {},
        selfClose: false,
        text: '',
        children: []
      };

      label = tokens[++cursor];
      while (label !== '>' && label !== '/>') {
        const [key, value] = label.split('=');
        let attr = true;
        if (value) {
          attr = value.replace(/"|'/g, '');
        }
        node.attributes[key] = attr;
        label = tokens[++cursor];
      }

      if (label === '/>') {
        node.selfClose = true;
        return node;
      }

      if (label === '>') {
        label = tokens[++cursor];
      }

      while (label === '<' || !label.startsWith('</')) {
        if (label === '<') {
          node.children.push(walk());
        } else {
          node.text = label;
        }
        label = tokens[++cursor];
      }

      return node;
    }
    return null;
  }

  return walk();
}

const result = parser(tokenizer('<div id="main" data-x="hello"> <img>sss</img> Hello<span id="sub"/></div>'));
console.log(result);

// ## 4
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。 
// 注意你不能在买入股票前卖出股票。

// 示例
// ```
// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
// ```
function maxProfit(prices) {
  if (prices.length === 0 || prices.length === 1) {
    return 0;
  }
  // 存储第i天持有的最大利润
  // 分两种情况，今天买入股票和之前就买入了股票
  const dpHas = [];
  dpHas[0] = -prices[0];

  // 存储第i天不持有的最大利润
  // 分两种情况 有股票今天卖出和本身就不持有股票
  const dpNoHas = [];
  dpNoHas[0] = 0;

  for (let i = 1; i < prices.length; i++) {
    dpHas[i] = Math.max(dpHas[i - 1], -prices[i]);
    dpNoHas[i] = Math.max(dpNoHas[i - 1], prices[i] + dpHas[i - 1]);
  }
  return dpNoHas[dpNoHas.length - 1];
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 5, 4, 2, 1]));


// ## 5

// 给定两个二叉树，编写一个函数来检验它们是否相同。如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

// 示例 1:

// ```
// 输入:       1         1
//           / \       / \
//          2   3     2   3

//         [1,2,3],   [1,2,3]

// 输出: true
// ```

// 示例 2:

// ```
// 输入:      1          1
//           /           \
//          2             2

//         [1,2],     [1,null,2]

// 输出: false
// ```

// 示例 3:

// ```
// 输入:       1         1
//           / \       / \
//          2   1     1   2

//         [1,2,1],   [1,1,2]

// 输出: false
// ```

function TreeNode(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

function isSameTree(treeNodeA, treeNodeB) {
  if ((treeNodeA === undefined || treeNodeA === null)
    && (treeNodeB === undefined || treeNodeB === null)
  ) {
    return true;
  }
  if (!treeNodeA || !treeNodeB) {
    return false;
  }
  if (treeNodeA.value !== treeNodeB.value) {
    return false;
  }
  return isSameTree(treeNodeA.left, treeNodeB.left) && isSameTree(treeNodeA.right, treeNodeB.right);
}

const leafNode2 = new TreeNode(2);
const leafNode3 = new TreeNode(3);

const rootNode1 = new TreeNode(1, leafNode2, leafNode3);
const rootNode2 = new TreeNode(1, leafNode2, leafNode3);
console.log(isSameTree(rootNode1, rootNode2));

const rootNode3 = new TreeNode(1, null, leafNode2);
const rootNode4 = new TreeNode(1, leafNode2, null);
console.log(isSameTree(rootNode3, rootNode4));

const rootNode5 = new TreeNode(1, leafNode3, leafNode2);
const rootNode6 = new TreeNode(1, leafNode2, leafNode3);
console.log(isSameTree(rootNode5, rootNode6));
