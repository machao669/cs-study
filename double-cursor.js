/*
  双指针主要用于遍历数组，两个指针指向不同的元素，从而协同完成任务。
*/

/*
1. 有序数组的 Two Sum
167. Two Sum II - Input array is sorted (Easy)

Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2
题目描述：在有序数组中找出两个数，使它们的和为 target。

使用双指针，一个指针指向值较小的元素，一个指针指向值较大的元素。指向较小元素的指针从头向尾遍历，指向较大元素的指针从尾向头遍历。

如果两个指针指向元素的和 sum == target，那么得到要求的结果；
如果 sum > target，移动较大的元素，使 sum 变小一些；
如果 sum < target，移动较小的元素，使 sum 变大一些。
数组中的元素最多遍历一次，时间复杂度为 O(N)。只使用了两个额外变量，空间复杂度为 O(1)。 */

function findTwoSumIndex(numbers, target) {
  if (numbers.length < 2) {
    return null;
  }

  let i = 0;
  let j = numbers.length - 1;

  while (i < j) {
    const value = numbers[i] + numbers[j];
    if (value < target) {
      i++;
    } else if (value > target) {
      j--;
    } else {
      return { index1: i, index2: j };
    }
  }
  return null;
}

/*
2. 两数平方和
633. Sum of Square Numbers (Easy)

Input: 5
Output: True
Explanation: 1 * 1 + 2 * 2 = 5
题目描述：判断一个非负整数是否为两个整数的平方和。

可以看成是在元素为 0~target 的有序数组中查找两个数，使得这两个数的平方和为 target，如果能找到，则返回 true，表示 target 是两个整数的平方和。

本题和 167. Two Sum II - Input array is sorted 类似，只有一个明显区别：一个是和为 target，一个是平方和为 target。本题同样可以使用双指针得到两个数，使其平方和为 target。

本题的关键是右指针的初始化，实现剪枝，从而降低时间复杂度。设右指针为 x，左指针固定为 0，为了使 02 + x2 的值尽可能接近 target，我们可以将 x 取为 sqrt(target)。

因为最多只需要遍历一次 0~sqrt(target)，所以时间复杂度为 O(log2N)。又因为只使用了两个额外的变量，因此空间复杂度为 O(1)。 */

function squareNumbers(num) {
  let i = 0;
  let j = num;
  while (i < j) {
    const v = i * i + j * j;
    if (v < num) {
      i++;
    } else if (v > num) {
      j--;
    } else {
      return true;
    }
  }
  return false;
}

/*

3. 反转字符串中的元音字符
345. Reverse Vowels of a String (Easy)

Leetcode / 力扣

Given s = "leetcode", return "leotcede".


使用双指针，一个指针从头向尾遍历，一个指针从尾到头遍历，当两个指针都遍历到元音字符时，交换这两个元音字符。

为了快速判断一个字符是不是元音字符，我们将全部元音字符添加到集合 HashSet 中，从而以 O(1) 的时间复杂度进行该操作。

时间复杂度为 O(N)：只需要遍历所有元素一次
空间复杂度 O(1)：只需要使用两个额外变量 */

function reverseVowel(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  const arr = Array.from(str);
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    const iv = arr[i];
    const jv = arr[j];
    if (vowels.includes(iv) && vowels.includes(jv)) {
      arr[i++] = jv;
      arr[j--] = iv;
    } else if (vowels.includes(iv)) {
      j--;
    } else if (vowels.includes(jv)) {
      i++;
    } else {
      i++;
      j--;
    }
  }
  return arr.join('');
}

/* 4.
回文字符串
680. Valid Palindrome II (Easy)

Leetcode / 力扣

Input: "abca"
Output: True
Explanation: You could delete the character 'c'.
题目描述：可以删除一个字符，判断是否能构成回文字符串。

所谓的回文字符串，是指具有左右对称特点的字符串，例如 "abcba" 就是一个回文字符串。

使用双指针可以很容易判断一个字符串是否是回文字符串：令一个指针从左到右遍历，一个指针从右到左遍历，这两个指针同时移动一个位置，每次都判断两个指针指向的字符是否相同，如果都相同，字符串才是具有左右对称性质的回文字符串。

本题的关键是处理删除一个字符。在使用双指针遍历字符串时，如果出现两个指针指向的字符不相等的情况，我们就试着删除一个字符，再判断删除完之后的字符串是否是回文字符串。

在判断是否为回文字符串时，我们不需要判断整个字符串，因为左指针左边和右指针右边的字符之前已经判断过具有对称性质，所以只需要判断中间的子字符串即可。

在试着删除字符时，我们既可以删除左指针指向的字符，也可以删除右指针指向的字符。 */
function validPalindrome(str) {
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) {
      return isValidPalind(str, i++, j) || isValidPalind(str, i, j--);
    }
    i++;
    j--;
  }
  return true;
}

function isValidPalind(str, i, j) {
  while (i < j) {
    if (str[i++] !== str[j--]) {
      return false;
    }
  }
  return true;
}


/* 5.
归并两个有序数组
88. Merge Sorted Array (Easy)

Leetcode / 力扣

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
题目描述：把归并结果存到第一个数组上。

需要从尾开始遍历，否则在 nums1 上归并得到的值会覆盖还未进行归并比较的值。 */


function mergeSortedArray(nums1, nums2) {
  let i = nums1.length - 1;
  let j = nums2.length - 1;
  let index = i + j + 1;
  const arr = [];
  while (index >= 0) {
    const iv = nums1[i];
    const jv = nums2[j];

    if (iv > jv || j < 0) {
      arr[index--] = iv;
      i--;
    } else {
      arr[index--] = jv;
      j--;
    }
  }
  return arr;
}


/* 6.
判断链表是否存在环
141. Linked List Cycle (Easy)

Leetcode / 力扣

使用双指针，一个指针每次移动一个节点，一个指针每次移动两个节点，如果存在环，那么这两个指针一定会相遇。 */
function listCycle(node) {
  let a = node;
  let b = node.next;
  while (a.next && b.next && b.next.next) {
    if (a === b) {
      return true;
    }
    a = a.next;
    b = b.next.next;
  }
  return false;
}


/*
7. 最长子序列
524. Longest Word in Dictionary through Deleting (Medium)

Leetcode / 力扣

Input:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

Output:
"apple"
题目描述：删除 s 中的一些字符，使得它构成字符串列表 d 中的一个字符串，找出能构成的最长字符串。如果有多个相同长度的结果，返回字典序的最小字符串。

通过删除字符串 s 中的一个字符能得到字符串 t，可以认为 t 是 s 的子序列，我们可以使用双指针来判断一个字符串是否为另一个字符串的子序列。 */
function longestWord(str, strs) {
  let longest = '';
  strs.forEach(item => {
    if (item.length > longest.length || (item.length === longest.length && item < longest)) {
      let i = 0;
      let j = 0;
      while (i < str.length && j < item.length) {
        if (str[i++] === item[j]) {
          j++;
        }
      }
      if (j === item.length) {
        longest = item;
      }
    }
  });
  return longest;
}


module.exports = {
  findTwoSumIndex,
  squareNumbers,
  reverseVowel,
  validPalindrome,
  mergeSortedArray,
  listCycle,
  longestWord
};
