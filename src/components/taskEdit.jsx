import axios from "axios";
import React, { useState } from "react"

export default function TaskEdit({ value, setTasks, tasks, task, setTaskEditHidden }) {

    const [newValue, setNewValue] = useState(value)
    const handleEdit = ({ key }) => {
        if (key === 'Enter') {
            axios.patch(`https://localhost:4000/tasks/${task.uuid}`, {
                name: newValue
            });
            setTasks(tasks.map((post) => {
                if (post.uuid === task.uuid) {
                    post.name = newValue;
                }
                return post;
            }))
            setTaskEditHidden(true);
        }
    }


    return (
        <div className="task-edit">
            <input type="text"
            autoFocus
            onChange={({target}) => setNewValue(target.value)} 
            value={newValue}
            onBlur={() => setTaskEditHidden(true)}
            onKeyDown={handleEdit}></input>
        </div>
    )
}