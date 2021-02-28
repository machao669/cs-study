/*
 * @Author: machao
 * @Date: 2020-11-04 15:22:11
 * @LastEditTime: 2020-11-04 15:56:58
 * @Description: 二分查找
 * @symbol_custom_string_obkoro1: Copyright raycloud
 */
// 二分查找

/**
 * 正常的二分查找
 */

function find(arr, value) {
  if (!arr || !arr.length) {
    return -1;
  }
  let low = 0;
  let hight = arr.length - 1;
  while (low <= hight) {
    const middle = Math.floor((low + hight) / 2);
    if (arr[middle] === value) {
      return middle;
    } else if (arr[middle] < value) {
      low = middle + 1;
    } else {
      hight = middle - 1;
    }
  }
  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('find', find(arr, 0));

/**
  * 查找第一个等于给定值的元素
  */
function findFirst(arr, value) {
  if (!arr || !arr.length) {
    return -1;
  }
  let low = 0;
  let hight = arr.length - 1;
  while (low <= hight) {
    const middle = Math.floor((low + hight) / 2);
    if (arr[middle] > value) {
      hight = middle - 1;
    } else if (arr[middle] < value) {
      low = middle + 1;
    } else if (middle === 0 || arr[middle - 1] !== value) {
      return middle;
    } else {
      hight = middle - 1;
    }
  }
  return -1;
}

const arr2 = [1, 2, 3, 4, 4, 4, 5, 5, 5, 6, 7, 7, 8, 9];
console.log('findFirst', findFirst(arr2, 5));

/**
  * 查找最后一个等于给定值的元素
  */
function findLast(arr, value) {
  if (!arr || !arr.length) {
    return -1;
  }
  let low = 0;
  let hight = arr.length - 1;
  while (low <= hight) {
    const middle = Math.floor((low + hight) / 2);
    if (arr[middle] > value) {
      hight = middle - 1;
    } else if (arr[middle] < value) {
      low = middle + 1;
    } else if (middle === arr.length - 1 || arr[middle + 1] !== value) {
      return middle;
    } else {
      low = middle + 1;
    }
  }
  return -1;
}
console.log('findFirst', findLast(arr2, 5));

/**
  * 查找第一个大于等于给定值的元素
  */
function findFirstGt(arr, value) {
  if (!arr || !arr.length) {
    return -1;
  }
  let low = 0;
  let hight = arr.length - 1;
  while (low <= hight) {
    const middle = Math.floor((low + hight) / 2);
    if (arr[middle] >= value) {
      if (middle === 0 || arr[middle - 1] < value) {
        return middle;
      } else {
        hight = middle - 1;
      }
    } else {
      low = middle + 1;
    }
  }
  return -1;
}

console.log('findFirst', findFirstGt(arr2, 2.5));

/**
  * 查找最后一个小于等于给定值的元素
  */
function findFirstLt(arr, value) {
  if (!arr || !arr.length) {
    return -1;
  }
  let low = 0;
  let hight = arr.length - 1;
  while (low <= hight) {
    const middle = Math.floor((low + hight) / 2);
    if (arr[middle] <= value) {
      if (middle === arr.length - 1 || arr[middle + 1] > value) {
        return middle;
      } else {
        low = middle + 1;
      }
    } else {
      hight = middle - 1;
    }
  }
  return -1;
}

console.log('findFirst', findFirstLt(arr2, 5));
