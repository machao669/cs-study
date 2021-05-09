/** 动态规划 */
/** 1.
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * 1 3 1
 * 1 5 1
 * 4 2 1
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
*/

const grid1 = [[1, 3, 1], [1, 5, 1], [4, 2, 1]];
const grid2 = [[1, 2, 3], [4, 5, 6]];
// 递归实现 状态转移公式 const dp(n) = Math.min(dp(top), dp(left)) + curVal;
function minPath(grid) {
  if (!grid.length || !grid[0].length) return 0;
  const _minPath = (cIndex, rIndex) => {
    const curVal = grid[cIndex][rIndex];
    if (cIndex === 0 && rIndex === 0) return curVal;
    if (cIndex === 0) return _minPath(0, rIndex - 1) + curVal;
    if (rIndex === 0) return _minPath(cIndex - 1, 0) + curVal;
    const tVal = _minPath(cIndex - 1, rIndex);
    const lVal = _minPath(cIndex, rIndex - 1);
    return Math.min(lVal, tVal) + curVal;
  };
  return _minPath(grid.length - 1, grid[0].length - 1);
}
console.log('题目1 数据1 递归结果：', minPath(grid1));
console.log('题目1 数据2 递归结果：', minPath(grid2));

// 循环实现 一层一层  主要记录遍历到每层需要记录下最小值
function minPathPoll(grid) {
  if (!grid.length || !grid[0].length) return 0;
  const cLen = grid.length;
  const rLen = grid[0].length;
  const dp = new Array(cLen).fill().map(() => new Array(rLen).fill(0));
  for (let i = 0; i < cLen; i++) {
    for (let j = 0; j < rLen; j++) {
      const curVal = grid[i][j];
      let minVal;
      if (i === 0 && j === 0) {
        minVal = curVal;
      } else if (i === 0) {
        minVal = dp[0][j - 1] + curVal;
      } else if (j === 0) {
        minVal = dp[i - 1][0] + curVal;
      } else {
        minVal = Math.min(dp[i - 1][j], dp[i][j - 1]) + curVal;
      }

      dp[i][j] = minVal;
    }
  }
  return dp[cLen - 1][rLen - 1];
}
console.log('题目1 数据1 循环结果：', minPathPoll(grid1));
console.log('题目1 数据2 循环结果：', minPathPoll(grid2));
