import React, { useState } from 'react';
import Task from './task';


export default function TaskList({tasks, remove}) {

    return (
        <div className='tasks_list'>
            {tasks.map(task =>
                <Task remove={remove} task={task} key={task.id} />
            )}
        </div>
    )
}