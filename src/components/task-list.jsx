import React from 'react';

import Task from './task';


export default function TaskList({tasks, remove, setTasks}) {

    return (
        <div className='tasks_list'>
            {tasks.map(task =>
                <Task 
                 remove={remove}
                 task={task} 
                 tasks={tasks}
                 setTasks={setTasks}
                />
            )}
        </div>
    )
}