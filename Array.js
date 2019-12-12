const MemoryLib = require('./memory');
const Memory = new MemoryLib();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = Memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = Memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of Memory');
    }
    Memory.copy(this.ptr, oldPtr, this.length);
    Memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return Memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = Memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    Memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    Memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }
}
Array.SIZE_RATIO = 3;

function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();

  arr.push(3); //length is 1, capacity is 3, memory address is 0
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10); // now length is 6, capacity is 12, and memory address is 3
  console.log(arr, 'after push sequence');
  /**
   * explanation:
   * - length increased to six because we pushed a total of 6 items onto our array.
   * - capacity increased to 12 because since the size ratio is 3, every fourth element
   *    pushed onto our array will increase our capacity by triple 
   * - memory address (ptr) increases by the previous length of the array once
   *    the array's length is greater than the capacity. capacity and memory address
   *    increase at the same time. 
   */
  
  arr.pop();
  arr.pop();
  arr.pop();

  console.log(arr, 'after pop sequence');
  
  /**
   * explanation: 
   *   - length decreases by one with each pop() - this is simple - one element
   *    gets removed each time so length--
   *   - capacity stays the same. pop() doesnt decrease the capacity. that space
   *    gets freed up for us to use
   *   - memory address stays the same. pop() doesnt change the ptr. this is because capacity
   *    stayed the same as well. 
   */

  console.log(arr.get(0));
  arr.push('balay');
  console.log(arr.pop());

  /**
   * explanation:
   *   - printing the item I just added returns NaN. This is because you can't
   *    actually add non-numeric strings to an array. if you use arraybuffer instead
   *    of a float64array then you are able to do so. 
   *   - the _resize function's purpose is to increase the capacity and change the 
   *      ptr of our array when the array's length surpasses the previous capacity.
   *      it copies our array's length from the old ptr to our newly initialized ptr 
   *      and frees up the memory at the old pointer. 
   */

}

main();
