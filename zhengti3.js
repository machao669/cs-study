/*
 * @Author: machao
 * @Date: 2020-09-11 17:17:36
 * @LastEditTime: 2020-09-11 17:46:34
 * @Description: 
 * @Copyright raycloud
 */
/**
 * 例题 1：删除排序数组中的重复项
 *  给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后的数组和新的长度，你不需要考虑数组中超出新长度后面的元素
 * 空间复杂度为 O(1)，即不要使用额外的数组空间。
 */

function uniqArr(arr) {
  let temp = arr[0];
  let len = 1;
  for (let i = 1; i < arr.length; i++) {
    if (temp !== arr[i]) {
      arr[len] = arr[i];
      temp = arr[i];
      len++;
    }
  }
  return len;
}

/**
 * 例题 2：查找两个有序数组合并后的中位数
 * 两个有序数组查找合并之后的中位数。给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
 * 请你找出这两个正序数组合在一起之后的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 你可以假设 nums1 和 nums2 不会同时为空，所有的数字全都不相等。还可以再假设，如果数字个数为偶数个，中位数就是中间偏左的那个元素。
 * 例如：nums1 = [1, 3, 5, 7, 9] nums2 = [2, 4, 8, 12] 输出 5。
 */

function findMergeMiddle(arr1, arr2) {
  const length = arr1.length + arr2.length;
  const newArr = [];
  for (let j = length/2  - 1; j < length / 2; j--) {
    const element = array[j];
    
  }
}
