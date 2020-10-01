import React from 'react';


const TaskList = props => {

  const addTasks = () => {
    return props.tasks.map(task => {
      return <li>{task.title}</li>
    })
  }

    return (
      <div>

      </div>
    )
  }

export default TaskList;