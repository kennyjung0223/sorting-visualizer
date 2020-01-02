import React from 'react';
import './SortingVisualizer.css';
import {getInsertionSortAnimations} from '../SortingAlgorithms/insertionSort';
import {getSelectionSortAnimations} from '../SortingAlgorithms/selectionSort';
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort';
import {getQuickSortAnimations} from '../SortingAlgorithms/quickSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

let generateAgain = false;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        }
    };

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        generateAgain = false;
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(10, 600));
        }
        this.setState({array});
    }
    
    disableButtons() {
        document.getElementById("generate").disabled = true;
        let buttonStyle = document.getElementById("generate").style;
        buttonStyle.cursor = "default";

        document.getElementById("insertionSort").disabled = true;
        buttonStyle = document.getElementById("insertionSort").style;
        buttonStyle.cursor = "default";

        document.getElementById("selectionSort").disabled = true;
        buttonStyle = document.getElementById("selectionSort").style;
        buttonStyle.cursor = "default";

        document.getElementById("mergeSort").disabled = true;
        buttonStyle = document.getElementById("mergeSort").style;
        buttonStyle.cursor = "default";

        document.getElementById("quickSort").disabled = true;
        buttonStyle = document.getElementById("quickSort").style;
        buttonStyle.cursor = "default";
    }

    restoreButtons() {
        document.getElementById("generate").disabled = false;
        let buttonStyle = document.getElementById("generate").style;
        buttonStyle.cursor = "pointer";

        document.getElementById("insertionSort").disabled = false;
        buttonStyle = document.getElementById("insertionSort").style;
        buttonStyle.cursor = "pointer";

        document.getElementById("selectionSort").disabled = false;
        buttonStyle = document.getElementById("selectionSort").style;
        buttonStyle.cursor = "pointer";

        document.getElementById("mergeSort").disabled = false;
        buttonStyle = document.getElementById("mergeSort").style;
        buttonStyle.cursor = "pointer";

        document.getElementById("quickSort").disabled = false;
        buttonStyle = document.getElementById("quickSort").style;
        buttonStyle.cursor = "pointer";
    }

    insertionSort() {
        if (generateAgain) {
            this.resetArray();
        }
        this.disableButtons();
        const [animations, sortedArray] = getInsertionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "highlight") || (animations[i][0] === "remove");
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChange) {
                const color = (animations[i][0] === "highlight") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS); 
            }
        }
        console.log(sortedArray);
        generateAgain = true;
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME); 
    }

    selectionSort() {
        if (generateAgain) {
            this.resetArray();
        }
        this.disableButtons();
        const [animations, sortedArray] = getSelectionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "highlight") || (animations[i][0] === "remove");
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChange) {
                const color = (animations[i][0] === "highlight") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS); 
            }
        }
        console.log(sortedArray);
        generateAgain = true;
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME); 
    }

    mergeSort() {
        if (generateAgain) {
            this.resetArray();
        }
        this.disableButtons();
        const [animations, sortedArray] = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 3 !== 2);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const color = (i % 3 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                //If we don't multiply by the index then every animations[i] wait for exactly ANIMATION_SPEED_MS and immediately change into final state
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
                
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  },i * ANIMATION_SPEED_MS);
            }
        }
        console.log(sortedArray);
        generateAgain = true;
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME); 
    }

    quickSort() {
        if (generateAgain) {
            this.resetArray();
        }
        this.disableButtons();
        const [animations, sortedArray] = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length - 1; i++) {
            const isColorChange = (i % 6 === 0) || (i % 6 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (i % 6 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIndex, barTwoIndex] = animations[i];
                if(barOneIndex === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        console.log(sortedArray);
        generateAgain = true;
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME); 
    }

    render() {
        const {array} = this.state;

        return ( 
            <>
            <div className="array-container">
                {array.map((value, index) => (
                    <div 
                        className="array-bar" 
                        key={index} 
                        style={{height: `${value}px`}}>
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button id="generate" onClick={() => this.resetArray()}>Generate New Array</button>
                <button id="insertionSort" onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button id="selectionSort" onClick={() => this.selectionSort()}>Selection Sort</button>
                <button id="mergeSort" onClick={() => this.mergeSort()}>Merge Sort</button>
                <button id="quickSort" onClick={() => this.quickSort()}>Quick Sort</button>
            </div>
            </>
        );
    }
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}