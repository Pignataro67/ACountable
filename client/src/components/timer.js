import React, { Component } from 'react';
import ReactCountdownClock from "react-countdown-clock";

  class Timer extends Component {

    constructor() {
      super()
      this.state = {
        pausation: true,
        class: "stop-button",
        firstClick: false,
        stopped: false
      }
    }

    wrapUpSession = () => {
        this.setState({
        pausation: true,
        class: "stop-button hidden"
      })
    };

    startTime = () => {
      console.log("TimeStamp")
      this.setState({
        pausation: false,
        stopped: true
      })
      this.sendTime()
    }

    render() {
      const minutes = 20;
        
      return (
        <div className="timer">
        <ReactCountdownClock
          seconds={60 * minutes}
          color="#09792e"
          alpha={0.5}
          size={150}
          onComplete={this.myCallback}
          paused={this.state.pausation}
          weight={20}
        />
        <div>      
        </div>

        <div className="timer-btn">
          {this.state.pausation ? (
          <button className="start-button" onClick={() =>this.toggle()} >Start</button>):
          
          (<button onClick={()=> this.toggle()}   className="pause-button">Pause</button>)
            }
          </div>
        </div>
      );
    }
  }

  export default Timer;