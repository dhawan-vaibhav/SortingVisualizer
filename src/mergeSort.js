export function getMergeSortAnimations(array) {
  const animations = [];
  if(array.length<=1)return;
  mergeSort(array, 0, array.length-1, animations);
  return animations;
}

function mergeSort(array, firstIndex, lastIndex, animations) {
  const median = Math.floor((firstIndex + lastIndex) / 2);

  if (firstIndex < lastIndex) {
    mergeSort(array, firstIndex, median, animations);
    mergeSort(array, median + 1, lastIndex, animations);
    merge(array, firstIndex, median, lastIndex, animations);
  }
}

function merge(array, firstIndex, median, lastIndex, animations) {
  const totalLength = lastIndex - firstIndex + 1;
  const copyArray = Array(totalLength).fill(null);

  let i = firstIndex;
  let k = median + 1;
  let j = firstIndex;
  while (i <= median && k <= lastIndex) {
    
    animations.push([i,k]);

    if (array[i] <= array[k]) {
      copyArray[j] = array[i];
      animations.push([j,array[i]]);
      j++;
      i++;
    } else {
      copyArray[j] = array[k];
      animations.push([j,array[k]]);
      j++;
      k++;
    }

  }

  while (i <= median) {
    copyArray[j] = array[i];
    animations.push([i,i]);
    animations.push([j,array[i]]);
    j++;
    i++;
  }

  while (k <= lastIndex) {
    copyArray[j] = array[k];
    animations.push([k,k]);
    animations.push([j,array[k]]);
    j++;
    k++;
  }

  for (let i = firstIndex; i < copyArray.length; i++) {
    array[i] = copyArray[i];
  }
}

