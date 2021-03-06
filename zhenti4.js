/**
 *  1. 判断数组中所有的数字是否只出现一次
 * 【题目】 判断数组中所有的数字是否只出现一次。给定一个个数字 arr，判断数组 arr 中是否所有的数字都只出现过一次。
 *  约束时间复杂度为 O(n)。例如，arr = {1, 2, 3}，输出 YES。又如，arr = {1, 2, 1}，输出 NO。
 */

function isOneAppear(arr) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    if (map.has(key)) {
      return false;
    }
    map.set(key);
  }
  return true;
}

/**
 * 2. 找出数组中出现次数超过数组长度一半的元素
 * 【题目】 假设在一个数组中，有一个数字出现的次数超过数组长度的一半，现在要求你找出这个数字。
 * 你可以假设一定存在这个出现次数超过数组长度的一半的数字，即不用考虑输入不合法的情况。
 * 要求时间复杂度是 O(n)，空间复杂度是 O(1)。例如，输入 a = {1,2,1,1,2,4,1,5,1}，输出 1。
 */
function getMoreHalfChar(arr) {
  let temp = arr[0];
  let times = 1;
  for (let i = 1; i < arr.length; i++) {
    if (temp === arr[i]) {
      times++;
    } else if (times === 0) {
      temp = arr[i];
      times = 1;
    } else {
      temp--;
    }
  }
  return temp;
}

/**
 * 3. 给定一个方格棋盘，从左上角出发到右下角有多少种方法
 * 【题目】 在一个方格棋盘里，左上角是起点，右下角是终点。每次只能向右或向下，移向相邻的格子。
 * 同时，棋盘中有若干个格子是陷阱，不可经过，必须绕开行走。
 * 要求用动态规划的方法，求出从起点到终点总共有多少种不同的路径。例如，输入二维矩阵 m 代表棋盘，
 * 其中，1 表示格子可达，-1 表示陷阱。输出可行的路径数量为 2。
 */
function findRoad(arr, width, height) {
  if (width < 0 || height < 0) {
    return 0;
  }
  if (arr[height][width] === -1) {
    return 0;
  }
  if (width === 0 || height === 0) {
    return 1;
  }
  return findRoad(arr, width - 1, height) + findRoad(arr, width, height - 1);
}

const roads = [[1, 1, 1, 1, 1, 1], [1, 1, -1, -1, 1, 1], [1, 1, -1, 1, -1, 1]];
console.log(findRoad(roads, 5, 2));
