import React from 'react';


const TaskList = props => {

  const addTasks = () => {
    return props.tasks.map(task => {
      return <li>{task.title}</li>
    })
  }

    return (
      <div className="comp">
          <form>
          <input type="text" name="taskInput" />
          <input type="submit" value="Add"/>
        </form>
        <ul>
          {addTasks()}
        </ul>
      </div>
    )
  }

export default TaskList;