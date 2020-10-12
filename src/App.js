import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

function BubbleSort(props){
  const numbers = props.numbers.slice();

  for(let i=0; i<numbers.length; i++){
    for(let j=0; j<numbers.length-i; j++){
      if(numbers[j]>numbers[j+1]){
        let temp = numbers[j+1];
        numbers[j+1]=numbers[j];
        numbers[j]=temp;
      }
    }
  }

  return <button onClick={()=>props.updateState(numbers)}>BubbleSort</button>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: Array(60).fill(null),
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
  }

  handleClick() {
    const numbers = this.state.numbers.slice();

    for(let i=0; i<numbers.length; i++){
      numbers[i]=Math.floor(Math.random()*50)+5;
    }

    this.setState({numbers:numbers,})
  }

  updateState(numbers){
    this.setState({numbers:numbers,})
  }

  bubbleSort(){
    return <BubbleSort numbers={this.state.numbers} updateState ={this.updateState}/>;
  }

  

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        {this.state.numbers.map((num,index)=>{
            const width = 17.5;
            const left = ((width * index)+(index*2))+60;

            return <div className="bar" style={{left:left, width:width, height:num*5}}>{num}</div>

          })}
          {this.bubbleSort()}
        
      </div>
    );
  }
}

export default App;
