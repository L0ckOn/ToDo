import axios from 'axios';
import React from 'react';

export default function Task({ task, remove }) {

    const handleCheck = () => {
        axios.patch(
            `https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`,
            {"done": true})
        .catch(err => console.log(err));
    }

    return (
        <div className='task' key={task.id}>
            <div className='left_side'>
                <input 
                    type='checkbox' 
                    
                    defaultChecked={task.done}
                    onClick={handleCheck}
                    />
                <p>{task.name}</p>
            </div>
            
            <div className='right_side'>
                <span>{(new Date(task.createdAt)).toLocaleDateString()}</span>
                <input 
                    type='button' 
                    className='trashcan' 
                    onClick={() => remove(task)}    
                />
            </div>
        </div>
    );

}
