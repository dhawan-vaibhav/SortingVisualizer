import React, { Component } from "react";
import logo from "./logo.svg";
import { getMergeSortAnimations } from "./mergeSort.js";
import "./App.css";

async function display2(comparisons, arrayLength, LastIndex) {
  const arrayBar = document.getElementsByClassName("bar");
  let barIndex = 0;
  let round = 0;
  for (let i = 0; i < comparisons.length + LastIndex; i++) {
    arrayBar[barIndex].style.backgroundColor = "LawnGreen";
    arrayBar[barIndex + 1].style.backgroundColor = "LawnGreen";
    if (arrayBar[barIndex].style.height > arrayBar[barIndex+1].style.height) {
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
          if (i === animations.length-1) {
            completed();
          }
        }, i * 10);
      } else {
        setTimeout(() => {
          arrayBar[barIdxOne].style.height = `${barIdxTwo * 1.5}px`;
          if (i === animations.length-1) {
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: Array(50).fill(null),
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
  }

  handleClick() {
    const numbers = this.state.numbers.slice();
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

  mergeSort() {
    return <MergeSort numbers={this.state.numbers} />;
  }

  bubbleSort() {
    return <BubbleSort numbers={this.state.numbers} />;
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
        <button onClick={this.handleClick}>Click</button>
        {this.state.numbers.map((num, index) => {
          const width = 2;
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
        <button onClick={this.changeColor}>ChangeColor</button>
        {this.bubbleSort()}
        {this.mergeSort()}
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
