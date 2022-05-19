import React, { useMemo, useState } from 'react';
import TaskList from './components/task-list';


function App({ target }) {
  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState('');

  const addNewTask = (props) => {
    if (props.key === 'Enter' && props.target.value) {
      const newTask = {
        id: Date.now(),
        name: props.target.value,
        isDone: false,
      };
      setTasks([newTask, ...tasks]);
      setTaskName('');
    }
  };

  const getSortedTasks = ({target}) => {
    console.log('sorted!');
    if (target.lastChild.data === 'All') {
      return getAllTasks;
    }
    else if (target.lastChild.data === 'Done') {
      console.log('only Done')
    }
    else if (target.lastChild.data === 'Undone') {
      console.log('only Undone')
    }
    else if (target.lastChild.data === '↑') {
      console.log('from new')
    }
    else if (target.lastChild.data === '↓') {
      console.log('from old')
    }    

  }

  const getAllTasks = useMemo(() => {
    return [...tasks].filter(task => task.idDone);
  }, [tasks]);

  const removeTask = (task) => {
    setTasks(tasks.filter((cur_task) => cur_task.id !== task.id))
  };

  return (
    <div className='App'>
      <h1>ToDo</h1>

      <input
        className="add_task"
        type='text' 
        placeholder='что бы я хотел сделать...'
        value={taskName}
        onChange={target => setTaskName(target.value)}
        onKeyDown={addNewTask}
      />

      <div className="header_buttons">
          <div>
          <button className='btn' onClick={getSortedTasks}>All</button>
          <button className='btn' onClick={getSortedTasks}>Done</button>
          <button className='btn' onClick={getSortedTasks}>Undone</button>
          </div>
          <div className="flex_date_sort">
              <span>Sort by date</span>
              <button class="btn arrow_btn" onClick={getSortedTasks}>↑</button>
              <button class="btn arrow_btn" onClick={getSortedTasks}>↓</button>
          </div>
      </div>
      
        <TaskList remove={removeTask} tasks={tasks} />

      <div class="page_number_container">
            <button class="btn page_number">{'<<'}</button>
            <button class="btn page_number">1</button>
            <button class="btn page_number">2</button>
            <button class="btn page_number">3</button>
            <button class="btn page_number">4</button>
            <button class="btn page_number">5</button>
            <button class="btn page_number">{'>>'}</button>
        </div>

    </div>
  );
}

export default App;
