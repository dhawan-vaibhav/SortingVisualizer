import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class BubbleSort extends Component {

  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }
  
  sort() {
    const numbers = this.props.numbers.slice();
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < 1; j++) {
        if (numbers[j] > numbers[j + 1]) {
          let temp = numbers[j + 1];
          numbers[j + 1] = numbers[j];
          numbers[j] = temp;
        }
        this.props.arrayBar[j].style.backgroundColor="red";
        this.props.arrayBar[j+1].style.backgroundColor="red";
        this.props.arrayBar[1].style.height=`${numbers[2]*5}px`;
        this.props.arrayBar[1].
      }
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
      numbers: Array(10).fill(null),
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
  }

  handleClick() {
    const numbers = this.state.numbers.slice();
    const arrayBars = document.getElementsByClassName('bar');

    if(arrayBars!=null){

      for(let i=0; i<arrayBars.length; i++){
        arrayBars[i].style.backgroundColor="yellow";
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.floor(Math.random() * 50) + 5;
    }


    this.setState({ numbers: numbers});
  }

  updateState(numbers) {
    this.setState({ numbers: numbers });
  }

  bubbleSort() {
    return <BubbleSort numbers={this.state.numbers} arrayBar ={document.getElementsByClassName("bar")}/>;
  }
  changeColor(){

    const arrayBar = document.getElementsByClassName("bar");

    for(let i=0; i<arrayBar.length; i++){

      setTimeout(() => {

        arrayBar[i].style.backgroundColor="blue";
        
      },i*25);
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
              style={{ backgroundColor:"yellow", left: left, width: width, height: num * 5 }}
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
