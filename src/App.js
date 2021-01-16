import React, { Component } from "react";
import logo from "./logo.svg";
import { getMergeSortAnimations } from "./mergeSort.js";
import { getQuickSortAnimations } from "./Quicksort.js";
import { heapSort } from "./heapSort.js";
import "./App.css";

class Quicksort extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  sort() {
    const numbers = this.props.numbers.slice();
    const copy = numbers.slice();
    copy.sort(function (a, b) {
      return a - b;
    });
    const arrayBar = document.getElementsByClassName("bar");

    const animations = getQuickSortAnimations(numbers);
    const animationSpeed = 30;

    for (let i = 0; i < animations.length; i++) {
      const [type] = animations[i];

      if (type === "pivot") {
        const pivotIdx = animations[i][1];

        setTimeout(async () => {
          arrayBar[pivotIdx].style.backgroundColor = "yellow";
        }, i * animationSpeed);
      } else if (type === "pointer") {
        const previous = animations[i][1];
        const pointerIdxOne = animations[i][2];
        const pointerIdxTwo = animations[i][3];

        setTimeout(() => {
          arrayBar[previous].style.backgroundColor = "skyBlue";
          arrayBar[pointerIdxOne].style.backgroundColor = "LawnGreen";
          if (pointerIdxTwo > 0) {
            arrayBar[pointerIdxTwo].style.backgroundColor = "LawnGreen";
          }
        }, i * animationSpeed);
      } else if (type === "swap") {
        const [
          barIdxOne,
          leftPointer,
          leftNewHeight,
          rightPointer,
          rightNewHeight,
        ] = animations[i];

        setTimeout(() => {
          arrayBar[leftPointer].style.backgroundColor = "red";
          arrayBar[rightPointer].style.backgroundColor = "red";
          arrayBar[leftPointer].style.height = `${leftNewHeight * 1.5}px`;
          arrayBar[rightPointer].style.height = `${rightNewHeight * 1.5}px`;
          arrayBar[leftPointer].style.backgroundColor = "skyBlue";
          arrayBar[rightPointer].style.backgroundColor = "skyBlue";
        }, i * animationSpeed);
      } else if (type === "pivotSwap") {
        const [
          barIdxOne,
          leftPointer,
          leftNewHeight,
          rightPointer,
          rightNewHeight,
        ] = animations[i];

        setTimeout(() => {
          arrayBar[leftPointer].style.backgroundColor = "red";
          arrayBar[rightPointer].style.backgroundColor = "red";
          arrayBar[leftPointer].style.height = `${leftNewHeight * 1.5}px`;
          arrayBar[rightPointer].style.height = `${rightNewHeight * 1.5}px`;
          arrayBar[rightPointer].style.backgroundColor = "skyBlue";
          arrayBar[leftPointer].style.backgroundColor = "purple";
        }, i * animationSpeed);
      } else if (type === "pivotSorted") {
        const pivotIdx = animations[i][1];

        setTimeout(() => {
          if (pivotIdx >= 0 && pivotIdx <= numbers.length - 1)
            arrayBar[pivotIdx].style.backgroundColor = "purple";
        }, i * animationSpeed);
      }
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.sort}>QuickSort</button>
      </div>
    );
  }
}

async function display2(comparisons, arrayLength, LastIndex) {
  const arrayBar = document.getElementsByClassName("bar");
  let barIndex = 0;
  let round = 0;
  for (let i = 0; i < comparisons.length + LastIndex; i++) {
    arrayBar[barIndex].style.backgroundColor = "LawnGreen";
    arrayBar[barIndex + 1].style.backgroundColor = "LawnGreen";
    if (arrayBar[barIndex].style.height > arrayBar[barIndex + 1].style.height) {
      arrayBar[barIndex].style.backgroundColor = "red";
      arrayBar[barIndex + 1].style.backgroundColor = "red";
      await sleep(30);
    }
    //console.log("Red Display")
    await sleep(5);
    if (i < comparisons.length) {
      arrayBar[barIndex].style.height = `${comparisons[i][0] * 1.5}px`;
      arrayBar[barIndex + 1].style.height = `${comparisons[i][1] * 1.5}px`;
      arrayBar[barIndex].style.backgroundColor = "LawnGreen";
      arrayBar[barIndex + 1].style.backgroundColor = "LawnGreen";
      await sleep(30);

      arrayBar[barIndex].style.backgroundColor = "skyblue";
      barIndex++;
      if (barIndex === arrayLength - round) {
        arrayBar[barIndex].style.backgroundColor = "DarkOrchid";
        barIndex = 0;
        round++;
      }
    } else {
      barIndex++;
    }

    if (i === comparisons.length + LastIndex - 1) {
      completed();
    }
    //console.log("swapping");
  }
}

function completed() {
  const arrayBar = document.getElementsByClassName("bar");

  for (let j = 0; j < arrayBar.length; j++) {
    setTimeout(() => {
      arrayBar[j].style.backgroundColor = "IndianRed";
    }, j * 0.5);
  }
}

class MergeSort extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  sort() {
    const numbers = this.props.numbers.slice();
    const arrayBar = document.getElementsByClassName("bar");
    const animations = getMergeSortAnimations(numbers);
    for (let i = 0; i < animations.length; i++) {
      const [barIdxOne, barIdxTwo] = animations[i];
      if (i % 2 == 0) {
        setTimeout(async function blink() {
          arrayBar[barIdxOne].style.backgroundColor = "red";
          arrayBar[barIdxTwo].style.backgroundColor = "red";
          await sleep(10);
          arrayBar[barIdxOne].style.backgroundColor = "skyBlue";
          arrayBar[barIdxTwo].style.backgroundColor = "skyBlue";
          if (i === animations.length - 1) {
            completed();
          }
        }, i * 10);
      } else {
        setTimeout(() => {
          arrayBar[barIdxOne].style.height = `${barIdxTwo * 1.5}px`;
          if (i === animations.length - 1) {
            completed();
          }
        }, i * 10);
      }
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.sort}>MergeSort</button>
      </div>
    );
  }
}

class BubbleSort extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }
  sort() {
    const numbers = this.props.numbers.slice();
    const sorted = this.props.numbers.slice();
    sorted.sort(function (a, b) {
      return a - b;
    });
    const arrayLength = numbers.length - 1;
    const comparisons = [];
    let round = 0;
    let lastIndex = 0;

    while (!compareArrays(numbers, sorted)) {
      for (let j = 0; j < numbers.length - 1 - round; j++) {
        if (numbers[j] > numbers[j + 1]) {
          let temp = numbers[j];
          numbers[j] = numbers[j + 1];
          numbers[j + 1] = temp;
        }
        const swap = [numbers[j], numbers[j + 1]];
        comparisons.push(swap);
        lastIndex = j;
      }
      round++;
    }

    display2(comparisons, arrayLength, lastIndex);
  }
  render() {
    return (
      <div>
        <button onClick={this.sort}>BubbleSort </button>
      </div>
    );
  }
}

class HeapSort extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  sort() {
    let array = this.props.numbers.slice();
    let animations = heapSort(array);
    const bars = document.getElementsByClassName("bar");
    const animationSpeed = 100;

    heapDisplay(animations, bars);
  }

  render() {
    return (
      <div>
        <button onClick={this.sort}>HeapSort</button>
      </div>
    );
  }
}
async function heapDisplay(animations, bars) {
  const animationSpeed = 30;
  for (let i = 0; i < animations.length; i++) {
    const [type] = animations[i];

    if (type === "swapComparison") {
      const [type, barIdxOne, barIdxTwo, num1, num2] = animations[i];
      setTimeout(async()=>{
      bars[barIdxOne].style.backgroundColor = "lawnGreen";
      bars[barIdxTwo].style.backgroundColor = "lawnGreen";

      await sleep(animationSpeed);

      bars[barIdxOne].style.backgroundColor = "red";
      bars[barIdxTwo].style.backgroundColor = "red";

      await sleep(animationSpeed);

      bars[barIdxOne].style.height = `${num1 * 1.5}px`;
      bars[barIdxTwo].style.height = `${num2 * 1.5}px`;

      await sleep(animationSpeed);

      bars[barIdxOne].style.backgroundColor = "skyBlue";
      bars[barIdxTwo].style.backgroundColor = "skyBlue";
      await sleep(animationSpeed);
      },i*animationSpeed);
    } else if (type === "noSwapComparison") {
      const [type, barIdxOne, barIdxTwo] = animations[i];
      setTimeout(async ()=>{
      bars[barIdxOne].style.backgroundColor = "red";
      bars[barIdxTwo].style.backgroundColor = "red";

      await sleep(animationSpeed);

      bars[barIdxOne].style.backgroundColor = "skyBlue";
      bars[barIdxTwo].style.backgroundColor = "skyBlue";
      await sleep(animationSpeed);
      },i*animationSpeed);
    } else if (type === "maxSwap") {
      const [type, barIdxOne, barIdxTwo, num1, num2] = animations[i];

      setTimeout(async ()=>{
      bars[barIdxOne].style.backgroundColor = "lawnGreen";
      bars[barIdxTwo].style.backgroundColor = "lawnGreen";

     await sleep(animationSpeed);

      bars[barIdxOne].style.backgroundColor = "red";
      bars[barIdxTwo].style.backgroundColor = "red";

    await sleep(animationSpeed);

      bars[barIdxOne].style.height = `${num1 * 1.5}px`;
      bars[barIdxTwo].style.height = `${num2 * 1.5}px`;

      await sleep(animationSpeed);

      bars[barIdxOne].style.backgroundColor = "skyBlue";
      bars[barIdxTwo].style.backgroundColor = "purple";
      await sleep(animationSpeed);
      },i*animationSpeed);
    }
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: Array(210).fill(null),
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
  }

  handleClick() {
    let numbers = this.state.numbers.slice();
    const arrayBars = document.getElementsByClassName("bar");

    if (arrayBars != null) {
      for (let i = 0; i < arrayBars.length; i++) {
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = "skyblue";
        });
        arrayBars[i].style.backgroundColor = "skyblue";
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.floor(Math.random() * 300) + 10;
    }

    this.setState({ numbers: numbers });
  }

  updateState(numbers) {
    this.setState({ numbers: numbers });
  }
  quickSort() {
    return <Quicksort numbers={this.state.numbers} />;
  }

  mergeSort() {
    return <MergeSort numbers={this.state.numbers} />;
  }

  bubbleSort() {
    return <BubbleSort numbers={this.state.numbers} />;
  }
  heapSort() {
    return <HeapSort numbers={this.state.numbers} />;
  }
  changeColor() {
    const arrayBar = document.getElementsByClassName("bar");

    for (let i = 0; i < arrayBar.length; i++) {
      setTimeout(() => {
        arrayBar[i].style.backgroundColor = "blue";
      }, i * 25);
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Generate Array</button>
        {this.state.numbers.map((num, index) => {
          const width = 5;
          const left = width * index + index * 2 + 10;
          return (
            <div
              className="bar"
              style={{
                left: left,
                width: width,
                height: num * 1.5,
              }}
            ></div>
          );
        })}
        <div>
        <button onClick={this.changeColor}>ChangeColor</button>
        </div>
        {this.bubbleSort()}
        {this.mergeSort()}
        {this.quickSort()}
        {this.heapSort()}
      </div>
    );
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function compareArrays(a, b) {
  let equal = true;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      equal = false;
    }
  }

  return equal;
}

export default App;
