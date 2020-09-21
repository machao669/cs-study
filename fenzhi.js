/*
 * @Author: machao
 * @Date: 2020-08-10 16:44:52
 * @LastEditTime: 2020-08-20 20:28:53
 * @Description:
 * @Copyright raycloud
 */
/**
 * 从定性的角度来看，分治法的核心思想就是“分而治之”。利用分而治之的思想，就可以把一个大规模、高难度的问题，分解为若干个小规模、低难度的小问题。
 * 随后，开发者将面对多个简单的问题，并很快地找到答案各个击破。在把这些简单问题解决好之后，我们通过把这些小问题的答案合并，
 * 就得到了原问题的答案。
 */

/**
  * 1.
  * 在一个有序数组中，查找出第一个大于9的数字，假设一定存在。例如，arr = { -1, 3, 3, 7, 10, 14, 14 }; 则返回 10。
  */
function findGreaterThen(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (arr[middle] > target && (middle === 0 || arr[middle - 1] <= target)) {
      return arr[middle];
    // } else if (arr[middle] === target) {
    //   return arr[middle + 1];
    } else if (arr[middle] > target) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
  return null;
}

console.log(findGreaterThen([9, 9, 9, 9, 9, 10, 14, 14], 9));

// const v7(G) = min(v6(F1) + 4, v6(F2) + 3)
// const v6(F1) = min(v5(E1) + 3, v5(E2) + 5);
// const v6(F2) = min(v5(E1) + 5, v5(E2) + 2);


const G = min(F1 + 4, F2 + 3);
const F1 = min(E1 + 3, E2 + 5, e3 + 6);
const F2 = min(E1 + 5, E2 + 2, e3 + 6);

const g = min(e1 + 7, e2 + 9, e3 + 10, e1 + 8, e2 + 5, e3 + 9);
const g = min(e1 + 7, e2 + 5, e3 + 9);
const e1 = d1 + 2;
const e2 = min(d1 + 2, d2 + 1, d3 +3);
const e3 = min(d2 + 2, d3 + 3);

const g = min(d1 + 9, d1 + 7, d2 + 6, d3 + 8, d2 + 11, d3 + 12);
const g = min(d1 + 7, d2 + 6, d3 + 8);
d1 = min(c1 + 6, c2 + 3);
d2 = min(c1 + 8, c2 + 5, c3 + 3, c4 + 8);
d3 = min(c3 + 3, c4 + 4);

const g = min(c1 + 13, c2 + 10, c1 + 14, c2 + 11, c3 + 9, c4 + 14, c3 + 11, c4 + 12);
const g = min(c1 + 13, c2 + 10, c3 + 9, c4 + 12);
c1 = b1 + 1;
c2 = min(b1 + 3, b2 + 8);
c3 = min(b1 + 6, b2 + 7);
c4 = b2 + 6

const g = min(b1 + 14, b1 + 13, b2 + 18, b1 + 15, b2 + 16, b2 + 18);
const g = min(b1 + 13, b2 + 16);
const b1 = min(18, 19)