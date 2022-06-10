import axios from "axios";
import React, { useState } from "react";
import TaskEdit from "./taskEdit";

export default function Task({ task, tasks, remove, setTasks}) {

    const [taskEditHidden, setTaskEditHidden] = useState(true);

    const handleCheck = () => {
    axios
      .patch(`https://alpaca-express-server.herokuapp.com/tasks/${task.uuid}`, {
        done: !task.done,
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="task" key={task.uuid}>
      <div className="left_side">
        <input
          type="checkbox"
          defaultChecked={task.done}
          onClick={handleCheck}
        />
        
        {taskEditHidden ? 
        <p onDoubleClick={() => setTaskEditHidden(false)}>{task.name}</p> :
        <TaskEdit value={task.name} 
        setTasks={setTasks} 
        tasks={tasks}
        setTaskEditHidden={setTaskEditHidden}
        task={task}/>}
      </div>

      <div className="right_side">
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        <input
          type="button"
          className="trashcan"
          onClick={() => remove(task)}
        />
      </div>
    </div>
  );
}
