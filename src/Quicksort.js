export function getQuickSortAnimations(array) {
  let animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(array, left, right, animations) {
  let pivotIdx = partition(array, left, right, animations);

  if (left < pivotIdx - 1) {
    quickSort(array, left, pivotIdx - 1, animations);
  }

  if (right > pivotIdx + 1) {
    quickSort(array, pivotIdx + 1, right, animations);
  }
}

function partition(array, left, right,animations) {
  let i = left;
  let j = right - 1;
  let pivot = array[right];

  while (i <= j) {
    animations.push([i,i]);
    animations.push([j,j]);
    
    while (array[i] < pivot) {
      i++;
      animations.push([i,i]);
    }

    while (array[j] > pivot) {
      j--;
      animations.push([j,j]);
    }

    if (i <= j) {
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    }
    if (i > j) {
      let temp = array[i];
      array[i] = pivot;
      array[right] = temp;
    }
  }

  return i;

  //quickSort(array,firstIdx,i-1, animations);
  //quickSort(array, i+1, lastIdx, animations);
}
