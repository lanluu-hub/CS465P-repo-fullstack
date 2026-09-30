/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/
const twosum = (nums, target) => {
  const hashmap = new Map();

  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];

    if (hashmap.has(diff)) {
      console.log("[", hashmap.get(diff), ",", i, "]");
    }

    hashmap.set(nums[i], i);
  }
};

const main = () => {
  const nums = [2, 7, 11, 15];
  const target = 9;
  twosum(nums, target);

  const nums2 = [3, 2, 4];
  const target2 = 6;
  twosum(nums2, target2);

  const nums3 = [3, 3];
  const target3 = 6;
  twosum(nums3, target3);
};

main();
