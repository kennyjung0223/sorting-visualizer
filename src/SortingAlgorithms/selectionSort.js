export function getSelectionSortAnimations(array) {
    let animations = [];
    let auxilliaryArray = array.slice();
    selectionSort(auxilliaryArray, animations);
    array = auxilliaryArray;
    return [animations, array];
}

function selectionSort(auxilliaryArray, animations) {
    const N = auxilliaryArray.length;

    for (let i = 0; i < N; i++) {
        let minIndex = i;

        for (let j = i + 1; j < N; j++) {
            animations.push(["highlight", j, minIndex]);
            animations.push(["remove", j, minIndex]);

            if (auxilliaryArray[j] < auxilliaryArray[minIndex]) {
                minIndex = j;
            }
        }
        animations.push(["swap", minIndex, auxilliaryArray[i]]);
        animations.push(["swap", i, auxilliaryArray[minIndex]]);
        swap(auxilliaryArray, i, minIndex);
    }
}

function swap(auxilliaryArray, firstIndex, secondIndex) {
    let temp = auxilliaryArray[firstIndex];
    auxilliaryArray[firstIndex] = auxilliaryArray[secondIndex];
    auxilliaryArray[secondIndex] = temp;
}

