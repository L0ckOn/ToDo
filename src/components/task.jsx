import React from 'react';

export default function Task(props) {
    const handleCheck = () => {
        props.task.isDone = props.task.isDone ? false : true;
    }

    return (
        <div className='task' key={props.task.id}>
            <div className='left_side'>
                <input 
                    type='checkbox' 
                    defaultChecked={props.task.isDone}
                    onClick={handleCheck}
                    />
                <p>{props.task.name}</p>
            </div>
            
            <div className='right_side'>
                <span>{(new Date(props.task.createdAt)).toLocaleDateString()}</span>
                <input 
                    type='button' 
                    className='trashcan' 
                    onClick={() => props.remove(props.task)}    
                />
            </div>
        </div>
    );

}
