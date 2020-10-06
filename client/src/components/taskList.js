import React from 'react';


const TaskList = props => {

  const addTasks = () => {
    return props.tasks.map(task => {
      return <li key={idx}>

      {task.title}
      <button className="delete-button" name="delete-button" onClick={()=> props.deleteTask(task)}>X</button>
      <button className="edit-button" name="edit-button">E</button>
      </li>
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