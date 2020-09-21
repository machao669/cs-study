/*
 * @Author: machao
 * @Date: 2020-09-03 15:17:31
 * @LastEditTime: 2020-09-09 17:02:34
 * @Description: 算法思维训练题
 * @Copyright raycloud
 */
/** 1.
 * 斐波那契数列是：0，1，1，2，3，5，8，13，21，34，55，89，144……。你会发现，这个数列中元素的性质是，某个数等于它前面两个数的和；
 * 也就是 a[n+2] = a[n+1] + a[n]。至于起始两个元素，则分别为 0 和 1。在这个数列中的数字，就被称为斐波那契数。
 * 【题目】写一个函数，输入 x，输出斐波那契数列中第 x 位的元素。例如，输入 4，输出 2；输入 9，输出 21。要求：需要用递归的方式来实现。
*/

function getFBNQValueByIndex(index) {
  if (index === 1) {
    return 0;
  }
  if (index === 2) {
    return 1;
  }
  if (index > 2) {
    return getFBNQValueByIndex(index - 2) + getFBNQValueByIndex(index - 1);
  }
  return 0;
}

console.log(`输入4，输出：${getFBNQValueByIndex(4)}`);
console.log(`输入9，输出：${getFBNQValueByIndex(9)}`);

/**
 * 例题2：判断一个数组中是否存在某个数
【题目】给定一个经过任意位数的旋转后的排序数组，判断某个数是否在里面。

例如，对于一个给定数组 {4, 5, 6, 7, 0, 1, 2}，它是将一个有序数组的前三位旋转地放在了数组末尾。假设输入的 target 等于 0，
则输出答案是 4，即 0 所在的位置下标是 4。如果输入 3，则返回 -1。
 */

function getIndexBySortArr(arr, value, begin, end) {
  if (begin === end) {
    if (value === arr[begin]) {
      return begin;
    } else {
      return -1;
    }
  }
  const middle = Math.ceil((begin + end) / 2);
  if (value === arr[middle]) {
    return middle;
  }

  // 左边有序
  if (arr[begin] <= arr[middle - 1]) {
    if (arr[begin] <= value && value <= arr[middle - 1]) {
      return getIndexBySortArr(arr, value, begin, middle - 1);
    } else {
      return getIndexBySortArr(arr, value, middle + 1, end);
    }
  } else if (arr[middle + 1] <= value && value <= arr[end]) {
    return getIndexBySortArr(arr, value, middle + 1, end);
  } else {
    return getIndexBySortArr(arr, value, begin, middle - 1);
  }
}

console.log(`输入4，输出：${getIndexBySortArr([4, 5, 6, 7, 0, 1, 2], 4, 0, 6)}`);
console.log(`输入0，输出：${getIndexBySortArr([4, 5, 6, 7, 0, 1, 2], 0, 0, 6)}`);
console.log(`输入3，输出：${getIndexBySortArr([4, 5, 6, 7, 0, 1, 2], 3, 0, 6)}`);

/**
 * 例题3：求解最大公共子串
【题目】输入两个字符串，用动态规划的方法，求解出最大公共子串。

例如，输入 a = "13452439"， b = "123456"。由于字符串"345"同时在 a 和 b 中出现，且是同时出现在 a 和 b 中的最长的子串。因此输出"345"。
 */

function findBigStr(a, b) {
  const m = [[]];
  for (let i = 1; i <= a.length; i++) {
    m[i] = [];
    for (let j = 1; j < b.length; j++) {
      m[i][j] = 0;
      if (a[i - 1] === b[j - 1]) {
        m[i][j] = m[i - 1][j - 1] + 1;
      }
    }
  }
  console.log(m);
  let max = 0;
  let index = 0;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (m[i][j] > max) {
        max = m[i][j];
        index = i;
      }
    }
  }
  console.log(a.substr(index - max, max));
}

findBigStr('13452439', '123456');
