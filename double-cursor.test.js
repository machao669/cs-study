const assert = require('assert');

const doubleCursor = require('./double-cursor.js');

const indexObj = doubleCursor.findTwoSumIndex([1, 2, 3, 4, 5, 6, 7, 8, 9], 9);
assert.equal(indexObj.index1, 0);
assert.equal(indexObj.index2, 7);

assert.equal(doubleCursor.squareNumbers(5), true);
assert.equal(doubleCursor.squareNumbers(6), false);
assert.equal(doubleCursor.squareNumbers(13), true);
assert.equal(doubleCursor.squareNumbers(14), false);

assert.equal(doubleCursor.reverseVowel('aeiou'), 'uoiea');
assert.equal(doubleCursor.reverseVowel('sdaeiou'), 'sduoiea');

assert.equal(doubleCursor.validPalindrome('aba'), true);
assert.equal(doubleCursor.validPalindrome('dabad'), true);
assert.equal(doubleCursor.validPalindrome('dcabad'), true);
assert.equal(doubleCursor.validPalindrome('dcadafsabad'), false);

console.log(doubleCursor.mergeSortedArray([1, 2, 3], [2, 5, 6]));

const node1 = { v: 1 };
const node2 = { v: 2 };
const node3 = { v: 3 };
const node4 = { v: 4 };
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node1;
console.log(doubleCursor.listCycle(node1));

const snode1 = { v: 1 };
const snode2 = { v: 2 };
const snode3 = { v: 3 };
const snode4 = { v: 4 };
snode1.next = snode2;
snode2.next = snode3;
snode3.next = snode4;
console.log(doubleCursor.listCycle(snode1));

console.log(doubleCursor.longestWord("abpcplea", ["ale", "apple", "monkey", "plea"]));
