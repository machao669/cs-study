/*
 * @Author: machao
 * @Date: 2020-11-06 15:47:14
 * @LastEditTime: 2020-11-06 15:58:40
 * @Description:
 * @symbol_custom_string_obkoro1: Copyright raycloud
 */
/**
 * 如何把 n 个数据的所有排列都找出来
 * 比如，1，2，3 这样 3 个数据
 * 1, 2, 3
 * 1, 3, 2
 * 2, 1, 3
 * 2, 3, 1
 * 3, 1, 2
 * 3, 2, 1
 */

// f(1,2,3...n) = {f(n -1 ), 1} + {f(n -1 ), 2} + ... + {f(n -1 ), n};

function printPermutations(arr, n, k) {
  if (k === 1) {
    console.log(arr);
  }
  for (let i = 0; i < k; i++) {
    let temp = arr[i];
    arr[i] = arr[k - 1];
    arr[k - 1] = temp;
    printPermutations(arr, n, k - 1);
    temp = arr[i];
    arr[i] = arr[k - 1];
    arr[k - 1] = temp;
  }
}

printPermutations([1, 2, 3], 3, 3);
