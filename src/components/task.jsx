import axios from "axios";
import React from "react";

export default function Task({ task, tasks, remove, setTasks}) {
  const handleCheck = () => {
    axios
      .patch(`https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`, {
        done: !task.done,
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = async () => {
      const newName = prompt()
      axios
      .patch(`https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`, {
          name: newName
      })
      .then(response => setTasks(tasks.map((post) => {
        if (post.uuid === response.data.uuid) {
            post.name = newName
        }
        return post;
      })))
      .catch(err => console.log(err))
  }

  return (
    <div className="task" key={task.uuid}>
      <div className="left_side">
        <input
          type="checkbox"
          defaultChecked={task.done}
          onClick={handleCheck}
        />
        <p onDoubleClick={handleEdit}>{task.name}</p>
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
