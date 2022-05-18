import React, { useState } from 'react';

export default function Task(props) {
    return (
        <div className='task' key={props.task.id}>
            <div className='left_side'>
                <input type='checkbox' />
                <p>{props.task.name}</p>
            </div>
            
            <div className='right_side'>
                <span>{(new Date(props.task.id)).toLocaleDateString()}</span>
                <input 
                    type='button' 
                    className='trashcan' 
                    onClick={() => props.remove(props.task)}    
                />
            </div>
        </div>
    );

}
