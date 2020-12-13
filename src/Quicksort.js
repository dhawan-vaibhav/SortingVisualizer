export function getQuickSortAnimations(array) {
  let animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(array, left, right, animations) {
  let pivotIdx = partition(array, left, right, animations);
  animations.push(["pivotSorted",pivotIdx]);

  if (left < pivotIdx - 1) {
    quickSort(array, left, pivotIdx - 1, animations);
  }
  animations.push(["pivotSorted",pivotIdx-1]);

  if (right > pivotIdx + 1) {
    quickSort(array, pivotIdx + 1, right, animations);
  }
  animations.push(["pivotSorted",pivotIdx+1]);
}

function partition(array, left, right,animations) {
  let i = left;
  let j = right - 1;
  let pivot = array[right];

  animations.push(["pivot",right])

  while (i <= j) {
    animations.push(["pointer",i,i,j]);
    
    while (array[i] < pivot && i<=j) {
      let previous=i;
      i++;
      animations.push(["pointer",previous,i,j]);
    }

    while (array[j] > pivot &&i<=j ) {
      let previous = j;
      j--;
      animations.push(["pointer",previous,i,j]);
    }

    if (i <= j) {
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      animations.push(["swap",i,array[i],j,array[j]]);
      i++;
      j--;
    }
    if (i > j) {
      let temp = array[i];
      array[i] = pivot;
      array[right] = temp;
      animations.push(["pivotSwap",i,array[i],right,array[right]]);
    }
  }

  return i;

  //quickSort(array,firstIdx,i-1, animations);
  //quickSort(array, i+1, lastIdx, animations);
}
