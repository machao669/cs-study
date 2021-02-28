/*
 * @Author: machao
 * @Date: 2020-11-09 16:09:51
 * @LastEditTime: 2020-11-10 14:27:10
 * @Description: 
 * @symbol_custom_string_obkoro1: Copyright raycloud
 */
/**
 * 堆
 */

class Heap {
  constructor(type) {
    this.arr = [-1];
    this.type = type; // 用于分大小顶堆的
  }

  push(value) {
    this.arr.push(value);
    this.mkHeap();
  }

  mkHeap() {
    if (this.arr.length > 2) {
      let index = this.arr.length - 1;
      while (index > 1) {
        const parentIndex = Math.floor(index / 2);
        if (this.arr[index] > this.arr[parentIndex]) {
          this.swap(index, parentIndex);
        }
        index = parentIndex;
      }
    }
  }

  pop() {
    if (this.arr.length < 2) {
      return null;
    }
    const top = this.arr[1];
    const tailIndex = this.arr.length - 1;
    this.arr[1] = this.arr[tailIndex];
    let index = 1;
    while (index < tailIndex) {
      const leftIndex = 2 * index;
      const rightIndex = 2 * index + 1;
      let maxPos = index;
      if (this.arr[index] < this.arr[leftIndex]) {
        maxPos = leftIndex;
      }
      if (this.arr[maxPos] < this.arr[rightIndex]) {
        maxPos = rightIndex;
      }
      if (maxPos === index) {
        break;
      }
      this.swap(index, maxPos);
      index = maxPos;
    }
    this.arr.splice(tailIndex, 1);
    return top;
  }

  swap(i, j) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }
}

const heap = new Heap();
heap.push(1);
heap.push(2);
heap.push(3);
heap.push(4);
heap.push(5);
heap.push(6);
heap.push(7);

console.log(heap);
heap.pop();
console.log(heap);
heap.pop();
console.log(heap);
heap.pop();
console.log(heap);
heap.pop();
console.log(heap);

function buildHeap(arr, n) {
  for (let i = Math.floor(n / 2); i >= 1; --i) {
    heapify(arr, n, i);
  }
}

function heapify(arr, n, i) {
  while(true) {
    let maxPos = i;
    const leftIndex = 2 * i;
    const rightIndex = 2 * i + 1;
    if (leftIndex <= n && arr[i] < arr[leftIndex]) {
      maxPos = leftIndex;
    }
    if (rightIndex <= n && arr[maxPos] < arr[rightIndex]) {
      maxPos = rightIndex;
    }
    if (maxPos === i) {
      break;
    }
    swap(arr, i, maxPos);
    i = maxPos;
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
