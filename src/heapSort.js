function buildMaxHeap(array,animations) {
    let index = Math.floor(array.length / 2);
    for (let i = index; i >= 0; i--) {
      heapify(array, i, array.length,animations);
    }
  }
  
  function heapify(array, i, max,animations) {
    while (i < max) {
      let index = i;
      let left = 2 * i + 1;
      let right =left+1;
  
      if (left < max && array[left] > array[index]) {
        animations.push(["swapComparison",index,left,array[left],array[index]]);
        index = left;
        //swapComparison//barIdx and Numbers being Swapped
        
      }
      else if(left<max && array[left]<array[index]){
          //noSwapComparison//sendOnly barIdx
          animations.push(["noSwapComparison",index,left]);
      }
  
      if (right < max && array[right] > array[index]) {
        animations.push(["swapComparison",index,right,array[right],array[index]]);
        index = right;
        
      }
      else if(right<max && array[right]<array[index]){
          //noSwapComparison
          animations.push(["noSwapComparison",index,right]);
      }
  
      if (index === i) {
        return;
      }
  
      swap(array, i, index);
  
      i = index;
    }
  }
  
  function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  }
  
  export function heapSort(array) {
    let animations=[];
    buildMaxHeap(array,animations);
    animations.push(["maxSwap",0,array.length-1,array[array.length-1],array[0]]);
    swap(array, 0, array.length - 1);
    // Max Swap// send barIdx and Numbers
    
    for (let i = array.length-1; i >0; i--) {
      heapify(array, 0,i,animations);
      animations.push(["maxSwap",0,i-1,array[i-1],array[0]]);
      swap(array,0,i-1);//Max Swap // sendbarIdx and Numbers
    } 

    return animations;
  }
  
  // Mistakes
  //you alwasy get for loop initializations wrong
  //"push" when filling up the array bugged out for some reason
  //sort() uses a compare function which takes "a" as smaller than "b" if the result of "a-b" is negative and vice versa