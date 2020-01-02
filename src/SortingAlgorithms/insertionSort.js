export function getInsertionSortAnimations(array) {
    let animations = []
    let auxilliaryArray = array.slice();
    insertionSort(auxilliaryArray, animations);
    array = auxilliaryArray;
    return [animations, array];
}

function insertionSort(auxilliaryArray, animations) {
    const N = auxilliaryArray.length;

    for (let i = 1; i < N; i++) {
        let key = auxilliaryArray[i];
        let j = i - 1;

        animations.push(["highlight", j, i]);
        animations.push(["remove", j, i]);

        while (j >= 0 && key < auxilliaryArray[j]) {
            animations.push(["overwrite", j + 1, auxilliaryArray[j]]);
            auxilliaryArray[j + 1] = auxilliaryArray[j];
            j = j - 1;

            if (j >= 0) {
                animations.push(["highlight", j, i]);
                animations.push(["remove", j, i]);
            }
        }
        animations.push(["overwrite", j + 1, key]);
        auxilliaryArray[j + 1] = key;
    }
}