import React from "react"

export default function TaskEdit({ value, setTasks, tasks, setTasksEditHidden }) {

    const handleEdit = ({ key }) => {
        if (key === 'Enter') {
            setTasksEditHidden(true);
        }
    }

    return (
        <div className="task-edit">
            <input type="text" 
            value={value}
            onKeyDown={handleEdit}></input>
        </div>
    )
}