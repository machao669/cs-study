/*
 * @Author: machao
 * @Date: 2020-10-29 13:53:27
 * @LastEditTime: 2020-10-30 14:41:43
 * @Description: 排序算法
 * @symbol_custom_string_obkoro1: Copyright raycloud
 */
/**
 * 1. 冒泡排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * 稳定排序
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return;
  }

  for (let i = arr.length; i > 0; i--) {
    for (let j = 1; j < i; j++) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
      }
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * 2. 插入排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * 稳定排序
 */
function insertSort(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return;
  }

  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i;
    while (j >= 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
}


/**
 * 3. 选择排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 * 非稳定排序
 */
function chooseSort(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        swap(arr, i, j);
      }
    }
  }
}

/**
 * 归并排序
 * 时间复杂度 O(nlogn)
 * 空间复杂度O(n)
 * 稳定排序
 */
function mergeSort(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return;
  }
  merge(arr, 0, arr.length - 1);
}

function merge(arr, start, end) {
  if (start >= end) {
    return;
  }

  const middle = Math.floor((start + end) / 2);
  merge(arr, start, middle);
  merge(arr, middle + 1, end);

  // 合并排序好的
  const leftArr = arr.slice(start, middle + 1);
  const rightArr = arr.slice(middle + 1, end + 1);
  let lIndex = 0;
  let rIndex = 0;
  let index = start;
  while (lIndex < leftArr.length && rIndex < rightArr.length) {
    if (leftArr[lIndex] > rightArr[rIndex]) {
      arr[index++] = rightArr[rIndex];
      rIndex++;
    } else {
      arr[index++] = leftArr[lIndex];
      lIndex++;
    }
  }
  for (let i = lIndex; i < leftArr.length; i++) {
    arr[index] = leftArr[i];
    index++;
  }
  for (let i = rIndex; i < rightArr.length; i++) {
    arr[index] = rightArr[i];
    index++;
  }
}

/**
 * 快排
 */
function quickSort(arr) {
  quick(arr, 0, arr.length - 1);
}

function quick(arr, low, hight) {
  if (low >= hight) {
    return;
  }
  let i = low;
  let j = hight;
  const temp = arr[low];
  while (i < j) {
    while (arr[j] >= temp && i < j) {
      j--;
    }
    while (arr[i] <= temp && i < j) {
      i++;
    }
    swap(arr, i, j);
  }
  arr[low] = arr[i];
  arr[i] = temp;
  console.log(arr, i);
  quick(arr, low, i - 1);
  quick(arr, i + 1, hight);
}

const testData = [9, 5, 3, 6, 7, 0, 8, 1, 2, 4, 3];
bubbleSort(testData);
console.log('冒泡排序结果：', testData);

const testData2 = [9, 5, 3, 6, 7, 0, 8, 1, 2, 4, 3];
insertSort(testData2);
console.log('插入排序结果：', testData2);

const testData3 = [9, 5, 3, 6, 7, 0, 8, 1, 2, 4, 3];
chooseSort(testData3);
console.log('选择排序结果：', testData3);

const testData4 = [9, 5, 3, 6, 7, 0, 8, 1, 2, 4, 3];
mergeSort(testData4);
console.log('归并排序结果：', testData4);

const testData5 = [9, 5, 3, 6, 7, 0, 8, 1, 2, 4, 3];
// const testData5 = [3, 2, 1];
quickSort(testData5);
console.log('快速排序结果：', testData5);
