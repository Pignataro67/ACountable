import React, {Component} from 'react';
import './App.css';
import UserHomepage from './Components/userHomepage';
// import Timer from './Components/timer';

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: "",
        id: 1
      },
      allTasks: [],
      workSessions: [],
      currentSession: [],
      currentTasks: []
      }
    }
    
    deleteTask = task => {
      console.log("delete button", task)
    }

    sendTime = () => {
      let currentDate = new Date();
      let date = currentDate.toString();
      date = date.split(" (")[0]
      
      fetch(`http://localhost:3001/work_sessions/${this.state.currentSession.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          start_time: date
        })
      })
    }
    
    addATask = (e) => {
      debugger;
      e.preventDefault()
      e.persist()
      const input = e.target[0].value;
      console.log(e.target[0].value)
  
      if (input.length > 0) {
        fetch("http://localhost:3001/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            status: "open",
            title: input,
            work_session_id: this.state.currentSession.id
          })
        })
        .then(resp => resp.json())
        .then(newTask => stateNewTask(newTask) )
  
        e.target[0].value = ""

        const stateNewTask = newTask => {
          this.setState({
            currentTasks: [
              newTask,
              ...this.state.currentTasks
            ]
          })
       }
  
      } else {
          console.log("error")
      }
    }

    render() {
      return (
        <div className="App">
          <UserHomepage appState={this.state} sendTime={this.sendTime} addATask={this.addATask} deleteTask={this.deleteTask}/>
        </div>
      );
    }

    componentDidMount() {

      fetch("http://localhost:3001/work_sessions")
      .then(res => res.json())
      .then(data => filterWorkSessions(data))
  
      const filterWorkSessions = (data) => {
        let sessions = data.filter( item => {
          return item.user_id === this.state.user.id
        })

        this.setState({
          workSessions: sessions
        }, ()=> {getCurrentSession()})
      }
  
      const getCurrentSession = () => {
        if (this.state.currentSession.length === 0) {
  
          const lastSession = this.state.workSessions[this.state.workSessions.length - 1]
  
          if (lastSession.start_time === ""){
  
            const sessions = this.state.workSessions.filter(session => session !== lastSession)
  
            this.setState({
              ...this.state,
              currentSession: lastSession,
              workSessions: sessions
            }, )
  
          } else {
            fetch("http://localhost:3001/work_sessions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                start_time: "",
                end_time: "",
                total_time: 20,
                note: "",
                user_id: this.state.user.id
              })
            })
            .then(resp => resp.json())
            .then(wsData => {
              this.setState({
                ...this.state,
                currentSession: wsData
              }, )
            })
          }
        }
      }

      fetch("http://localhost:3001/tasks/")
    .then(resp => resp.json())
    .then(tasks => {
      filterCurrentTasks(tasks);
      getAllTasks(tasks);
    })

    const filterCurrentTasks = tasks => {

      const currentTasks = tasks.filter(task => {
        return task.work_session_id === this.state.currentSession.id
      })
      
      this.setState({
        ...this.state,
        currentTasks: currentTasks
      })
    }

    const getAllTasks = tasks => {
      this.setState({
        ...this.state,
        allTasks: tasks
      })
    }
  }

  componentDidUpdate() {

    const getOpenTasks = () => {
      fetch("http://localhost:3001/tasks")
      .then(res => res.json())
      .then(data => filterOpenTasks(data))
    }
  
    const filterOpenTasks = tasks => {
      const openTasks = tasks.filter(task => {
        return task.status === "open"
      })
      reassignWS(openTasks)
    }

    const reassignWS = openTasks => {
      openTasks.map(task => {
        fetch(`http://localhost:3001/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            work_session_id: this.state.currentSession.id
          })
        })
      })
    }
    getOpenTasks();
  };
}

export default App;