// 1. 找出数组中只出现一次的两个数 空间复杂度为O(1)
function findOnceNumbers(arr) {
  if (!arr || arr.length < 2) return [];

  // 分组
  const res = arr.reduce((prev, curv) => {
    return prev ^ curv;
  }, 0);
  // 找出当前位数中为1的坐标  根据这个来分组
  let index = 0;
  while (index <= 32) {
    if ((res >> index) & 1 === 1) {
      break;
    }
    index++;
  }
  const numbers = [0, 0];
  arr.forEach(item => {
    if ((item >> index) & 1 === 1) {
      numbers[0] ^= item;
    } else {
      numbers[1] ^= item;
    }
  });
  return numbers;
}
console.log(findOnceNumbers([1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7]));

// 2. 输入一段字符串，判断是否是循环字符串，输出最小最小循环单元，如abab->ab
function findCycleStr(s) {
  const index = (s + s).indexOf(s, 1);
  if (index !== s.length) {
    return s.substring(0, index);
  }
  return '';
}

console.log(findCycleStr('abcabc'));

// 3. 判断一个二叉树是否是平衡二叉树
function isBlanceTree(node) {
  return _deepTree(node) !== -1;
}

function _deepTree(node) {
  if (!node) {
    return 0;
  }
  const leftDeep = _deepTree(node.left);
  if (leftDeep === -1) return -1;
  const rightDeep = _deepTree(node.right);
  if (rightDeep === -1) return -1;
  return Math.abs(leftDeep, rightDeep) > 1 ? -1 : 1 + Math.max(leftDeep, rightDeep);
}

// 4.多叉树，一个viewtree里面哪些是没有覆盖的可以显示的 (题目没看懂，猜测是遍历)

function forEach(viewtree) {
  const nodes = [viewtree];
  while (nodes.length) {
    const node = nodes.shift();
    console.log(node.val);
    if (node.children && node.children.length) {
      node.children.forEach(item => {
        nodes.push(item);
      });
    }
  }
}

// 5. 二分法查找
function findValue(arr, value) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const middle = start + Math.floor((end - start) / 2);
    const curV = arr[middle];
    if (curV === value) {
      return middle;
    } else if (curV > value) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }
  return null;
}

console.log(findValue([1, 2, 3, 4, 5], 5));

// 6. 从一无序数组中取出n个数和为sum（如果n为2，时间复杂度是多少）n=2时，时间复杂度o(n2)

function findSum(arr, sum, n) {
  const res = [];
  const findOneCount = (num) => {
    let count = 0;
    while (num) {
      num &= (num -1);
      count ++;
    }
    return count;
  };
  // 1. 计算arr有多少种选择方式
  const count = 1 << arr.length;
  // 判断每种选择中 选取个数的n的
  for (let i = 1; i < count; i++) {
    // 2. 计算每种选择选取的个数 ，取个数等于n的
    // 直接计算为1的数量 Number(i).toString(2).replace(/0/g, '').length
    // 或者位运算
    if (findOneCount(i) === n) {
      // 选值 计算出结果等于sum的
      let calcSum = 0;
      const val = [];
      for (let j = 0; j < arr.length; j++) {
        if ((i & (1 << j)) !== 0) {
          calcSum += arr[j];
          val.push(j);
        }
      }
      if (calcSum === sum) {
        res.push(val);
      }
    }
  }
  return res;
}
console.log('第六题。。。。');
console.log(findSum([1, 2, 3, 4, 5, 6], 7, 2));

// 7. 带有id和parentId的list转成tree
function listToTree(list) {
  const map = new Map();
  list.forEach(it => {
    map.set(it.id, Object.assign({ children: [] }, it));
  });
  const roots = [];
  list.forEach(it => {
    const target = map.get(it.id);
    if (it.parentId) {
      const pTarget = map.get(it.parentId);
      pTarget.children.push(target);
    } else {
      roots.push(target);
    }
  });
  return roots;
}

// 8. 给一串url和一个最大并发数，请求这些url并将结果按顺序返回
function limitPromise(limit, urlArr) {
  let index = limit;
  const res = [];
  let success = 0;
  return new Promise((resove, rej) => {
    function send(i) {
      const url = urlArr[i];
      if (!url) return;
      axios.get(urlArr[i]).then((data) => {
        res[i] = data;
      }, () => {
        res[i] = 'error';
      }).finally(() => {
        if (success >= urlArr.length) {
          resove(res);
        } else {
          success++;
          send(index++);
        }
      });
    }
    for (let i = 0; i < limit; i++) {
      send(i);
    }
  });
}
