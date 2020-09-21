/*
 * @Author: machao
 * @Date: 2020-08-14 14:14:29
 * @LastEditTime: 2020-08-14 15:57:51
 * @Description:
 * @Copyright raycloud
 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 冒泡
function maopao(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

function other(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    while (j >= 0) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
      j--;
    }
  }
}

// 插入
function charu(arr) {
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    console.log(j + 1, temp);
    arr[j + 1] = temp;
  }
}

// 归并排序
function customMergeSort(arr1, arr2, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    customMergeSort(arr1, arr2, start, mid);
    customMergeSort(arr1, arr2, mid + 1, end);
    customDoubleMerge(arr1, arr2, start, mid, end);
  }
}

function customDoubleMerge(arr1, arr2, start, mid, end) {
  let p1 = start, p2 = mid + 1, k = start;
  while (p1 <= mid && p2 <= end) {
    if (arr1[p1] <= arr1[p2]) {
      arr2[k++] = arr1[p1++];
    } else {
      arr2[k++] = arr1[p2++];
    }
  }
  while (p1 <= mid) {
    arr2[k++] = arr1[p1++];
  }

  while (p2 <= end) {
    arr2[k++] = arr1[p2++];
  }

  for (let i = start; i <= end; i++) {
    arr1[i] = arr2[i];
  }
}

function customMergeSortTest() {
  const arr1 = [3, 4, 5, 8, 6, 9, 0, 1];
  customMergeSort(arr1, [], 0, arr1.length - 1);
  console.log('customMergeSortTest', arr1);
}

customMergeSortTest();

// 快排1 不用额外的数组
function customQuickSort(arr, low, high) {
  let i, j;
  if (low >= high) {
    return;
  }
  i = low;
  j = high;
  const temp = arr[low];
  while (i < j) {
    // 先看右边， 依次往左递减
    while (temp <= arr[j] && i < j) {
      j--;
    }
    while (temp >= arr[i] && i < j) {
      i++;
    }
    swap(arr, i, j);
  }
  arr[low] = arr[i];
  arr[i] = temp;
  customQuickSort(arr, low, j - 1);
  customQuickSort(arr, j + 1, high);
}

function customQuickSortTest() {
  const arr = [6, 1, 2, 7, 9, 11, 4, 5, 10, 8];
  customQuickSort(arr, 0, arr.length - 1);
  console.log(arr);
}

customQuickSortTest();

// 快排2 用个额外的数组
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const base = arr.pop(); // 取基准值，随便取
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([base], quickSort(right));
}
