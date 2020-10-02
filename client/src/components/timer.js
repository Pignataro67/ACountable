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

    sendTime = () => {
    
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
            onComplete={()=> this.wrapUpSession()}
            paused={this.state.pausation}
            weight={20}
          />     

    <div className="timer-btn">
      {!this.state.stopped ? (

      <button className="start-button" onClick={() =>

      this.startTime()} >Start</button>) :
      (<button onClick={()=> this.wrapUpSession()}   className={this.state.class}>STOP</button>)
      }
      </div>
    </div>
      );
    }
  }

  export default Timer;