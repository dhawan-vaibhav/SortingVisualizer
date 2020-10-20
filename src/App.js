import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class BubbleSort extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  display(comparisons) {
    const arrayBar = document.getElementsByClassName("bar");
    console.log(comparisons)

    for (let i = 0; i < arrayBar.length - 1; i++) {
      setTimeout(() => {
        arrayBar[i].style.backgroundColor = "red";
        arrayBar[i + 1].style.backgroundColor = "red";

        setTimeout(() => {
          arrayBar[i].style.height = `${comparisons[i][0] * 5}px`;
          arrayBar[i].innerHTML=`${comparisons[i][0]}`
          arrayBar[i + 1].style.height = `${comparisons[i][1] * 5}px`;
          arrayBar[i+1].innerHTML=`${comparisons[i][1]}`
        }, (i + 1) * 3000);

      }, (i + 1) * 1000);
    }
  }
  sort() {
    const numbers = this.props.numbers.slice();
    const comparisons = [];
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length - i; j++) {
        if (numbers[j] > numbers[j + 1]) {
          let temp = numbers[j];
          numbers[j] = numbers[j + 1];
          numbers[j + 1] = temp;
        }
        const swap = [numbers[j], numbers[j + 1]];
        comparisons.push(swap);
      }
    }
    {
      this.display(comparisons);
    }
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
      numbers: Array(3).fill(null),
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
  }

  handleClick() {
    const numbers = this.state.numbers.slice();
    const arrayBars = document.getElementsByClassName("bar");

    if (arrayBars != null) {
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "yellow";
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.floor(Math.random() * 50) + 5;
    }

    this.setState({ numbers: numbers });
  }

  updateState(numbers) {
    this.setState({ numbers: numbers });
  }

  bubbleSort() {
    return (
      <BubbleSort
        numbers={this.state.numbers}
        arrayBar={document.getElementsByClassName("bar")}
      />
    );
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
          const width = 17.5;
          const left = width * index + index * 2 + 10;
          return (
            <div
              className="bar"
              style={{
                backgroundColor: "yellow",
                left: left,
                width: width,
                height: num * 5,
              }}
            >
              {num}
            </div>
          );
        })}
        <button onClick={this.changeColor}>ChangeColor</button>
        {this.bubbleSort()}
      </div>
    );
  }
}

export default App;
