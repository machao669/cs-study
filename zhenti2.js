/*
 * @Author: machao
 * @Date: 2020-09-09 17:02:40
 * @LastEditTime: 2020-09-11 17:03:13
 * @Description: 真题训练2
 * @Copyright raycloud
 */
/**
 * 树的层序遍历
 * 给定一棵树，按照层次顺序遍历并打印这棵树。例如，输入的树为：
 *        16
 *        / \
 *      13  20
 *     / \    \
 *    10  15  22
 *            / \
 *          21  26
 * 则打印 16、13、20、10、15、22、21、26。格外需要注意的是，这并不是前序遍历。
 */

function Node(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

const node21 = new Node(21);
const node26 = new Node(26);
const node22 = new Node(22, node21, node26);
const node20 = new Node(20, node22);
const node10 = new Node(10);
const node15 = new Node(15);
const node13 = new Node(13, node10, node15);

const rootNode = new Node(16, node13, node20);

function traverse(node) {
  if (node) {
    console.log(node.value);
    traverse(node.left);
    traverse(node.right);
  }
}

traverse(rootNode);

function traverse2(node) {
  const list = [];
  list.push(node);
  while (list.length) {
    const cNode = list.shift();
    console.log(cNode.value);
    if (cNode.left) {
      list.push(cNode.left);
    }
    if (cNode.right) {
      list.push(cNode.right);
    }
  }
}

traverse2(rootNode);

class MinHeap {
  constructor() {
    this.tree = [];
  }

  offer(val) {
    this.tree.length / 2
  }
}