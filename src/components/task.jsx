import React, { useState } from 'react';

export default function Task(props) {

    const [check, setCheck] = useState(false);

    const handleCheck = ({target}) => {
        console.log(target.checked)
        setCheck(true);
    }

    return (
        <div className='task' key={props.task.id}>
            <div className='left_side'>
                <input 
                    type='checkbox' 
                    defaultChecked={false}
                    onClick={handleCheck}
                    />
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
