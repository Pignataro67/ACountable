import React, { Component } from 'react';
import TaskList from './taskList';
import CalendarTracker from './calendar';
import Timer from './timer';
import WorkSession from './workSession';
import Timer from './timer';

class UserHomepage extends Component {

  constructor() {
    super()
    this.state = {
      allSessions: []
    }
  }

  render() {
    return (
      <Fragment >
        <Timer />
        <TaskList tasks={this.props.appState.currentTasks}/>
        {/* <CalendarTracker /> */}
      </Fragment >
    )
  }
}

export default UserHomepage;