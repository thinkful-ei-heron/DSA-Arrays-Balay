/**
 * #5
A common mistake users make when they type in an URL is to put spaces 
between words or letters. A solution that developers can use to solve 
this problem is to replace any spaces with a %20. Write a method that 
takes in a string and replaces all its empty spaces with a %20. Your 
algorithm can only make 1 pass through the string. Examples of input 
and output for this problem can be

Input: tauhida parveen

Output: tauhida%20parveen

Input: www.thinkful.com /tauh ida parv een

Output: www.thinkful.com%20/tauh%20ida%20parv%20een
 */

function stringToUrl(str) {
  let arr = str.split('');
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === ' ') {
      arr.splice(i, 1, '%20');
    }
  }
  return arr.join('');
}

//time complexity: linear O(n) - as the length of the string increases
// the runtime increases (more array elements to check)

//console.log(stringToUrl('www.thinkful.com /tauh ida parv een'));

/**
 * 
 * Imagine you have an array of numbers. Write an algorithm to remove all 
 * numbers less than 5 from the array. DO NOT use Array's built-in .filter() 
 * method here; write the algorithm from scratch.
 * 
 * input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * output: [5, 6, 7, 8, 9, 10]
 * 
 */

function removeNumsLessThan(arr) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] < 5) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}

//time complexity: linear - the more numbers in the array the more 
//time it will take to check them all against our if condition
//in the for loop

//console.log(removeNumsLessThan([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

/**
 * 
 * You are given an array containing positive and negative integers. Write an 
 * algorithm which will find the largest sum in a continuous sequence.

Input: [4, 6, -3, 5, -2, 1]
Output: 12
 * 
 * 
 */

function largestSum(arr) {
  let sum = 0;
  let largest = 0;

  for (let i = 0; i <= arr.length; i++) {
    sum = sum + arr[i];
    if (sum > largest) {
      largest = sum;
    } else if (sum < 0) {
      sum = 0;
    }
  }
  return largest;
}

//time complexity: O(n) - linear

//console.log(largestSum([4, 6, -3, 5, -2, 1]));

/**
 * 
 * Imagine you have 2 arrays which have already been sorted. Write an 
 * algorithm to merge the 2 arrays into a single array, which should also 
 * be sorted.

Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]
 * 
 */

function mergeSortedArrays(a, b) {
  let merged = [];
  let aindex = 0;
  let bindex = 0;

  while (aindex < a.length && bindex < b.length) {
    if(a[aindex] - b[bindex] > 0) {
      merged.push(b[bindex++]);
    } else {
      merged.push(a[aindex++]);
    }
  }

  if (bindex < b.length) {
    merged = merged.concat(b.slice(bindex));
  } else {
    merged = merged.concat(a.slice(aindex));
  }

  return merged;
}

//time complexity: linear O(n)

//console.log(mergeSortedArrays([1, 3, 6, 8, 11, 12], [2, 3, 5, 8, 9]));

/**
 * 
 * Write an algorithm that deletes given characters from a string. 
 * For example, given a string of "Battle of the Vowels: Hawaii vs. Grozny" 
 * and the characters to be removed are "aeiou", the algorithm should 
 * transform the original string to "Bttl f th Vwls: Hw vs. Grzny". 
 * Do not use Javascript's filter, split, or join methods.

Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
Output: 'Bttl f th Vwls: Hw vs. Grzny'
 * 
 */

function deleteChars(str, chars) {
  let ignoreVals = '';
  for (let i = 0; i < chars.length; i++) {
    let char;
    if (i < chars.length - 1) {
      char = chars[i] + '|';
    } else {
      char = chars[i];
    }
    ignoreVals += char;
  }
  let replaceVals = new RegExp(ignoreVals, 'gi');
  return str.replace(replaceVals, '');
}

//time complexity: linear O(n) 

//console.log(deleteChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));

/**
 * 
 * Given an array of numbers, write an algorithm to find out the products 
 * of every other number except the number at each index.

Input:[1, 3, 9, 4]
Output:[108, 36, 12, 27]
 */

function findProduct(arr) {
  let productArr = [];
  for (let i = 0; i < arr.length; i++) {
    let product = 1;
    let newArr = arr.slice();
    newArr.splice(i, 1);
    for (let j = 0; j < newArr.length; j++) {
      product *= newArr[j];
    }
    productArr.push(product);
  }
  return productArr;
}

//time complexity: polynomial O(n^k) - needs to be improved
//console.log(findProduct([1, 3, 9, 4]));

/**
 * 
 * Write an algorithm which searches through a 2D array, and whenever it 
 * finds a 0 should set the entire row and column to 0.

Input:
[[1,0,1,1,0],
[0,1,1,1,0],
[1,1,1,1,1],
[1,0,1,1,1],
[1,1,1,1,1]];
Output:
[[0,0,0,0,0],
[0,0,0,0,0],
[0,0,1,1,0],
[0,0,0,0,0],
[0,0,1,1,0]];
 * 
 */

function search2DArray(arr) {
  let indexes = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 0) {
        indexes.push([i, j]);
      }
    }
  }

  for (let i = 0; i < indexes.length; i++) {
    let arrCopy = arr.slice(0);
    arrCopy[indexes[i][0]].fill(0);
    arrCopy.forEach(arr => arr.fill(0, indexes[i][1], indexes[i][1] + 1));
    arrCopy = arr;
  }
  
  return arr;
  
}

const array2d = [
  [1,0,1,1,0],
  [0,1,1,1,0],
  [1,1,1,1,1],
  [1,0,1,1,1],
  [1,1,1,1,1]
];

//time complexity: polynomial - needs to be improved
//console.log(search2DArray(array2d));

/**
 * 
 * Given 2 strings, str1 and str2, write a program that checks if str2 
 * is a rotation of str1.

Input: amazon, azonma

Output: False

Input: amazon, azonam
        mazona
        azonam
        zonama
        onamaz
        namazo
        

Output: true
 * 
 */

function isRotation(str1, str2) {
  let rotations = [];
  for (let i = 0; i < str1.length; i++) {
    str1 = str1.slice(1, str1.length) + str1.slice(0, 1);
    rotations.push(str1);
  }
  if (rotations.includes(str2) && str1 !== str2) {
    return true;
  } else {
    return false;
  }
}

//time complexity: linear O(n)
//console.log(isRotation('balay', 'layba'));