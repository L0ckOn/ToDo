import { __esModule } from '@testing-library/jest-dom/dist/matchers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TaskList from './components/task-list';
import Pages from './components/pages';


function App({ target }) {
  const [tasks, setTasks] = useState([]);
  const allTasks = useRef([]);

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

  const sortByDate = ({ target }) => {
    if (target.lastChild.data === '↑') {
      setTasks([...tasks].sort( (a, b) => a.id - b.id))
    }
    if (target.lastChild.data === '↓') {
      setTasks([...tasks].sort( (a, b) => b.id - a.id))
    }
  }

  const [sort, setSort] = useState('all');

  const sortedTasks = useMemo( () => {
    switch(sort) {
      case 'all':
        return tasks;
      case 'done':
        return tasks.filter( (task) => task.isDone);
      case 'undone':
        return tasks.filter( (task) => !task.isDone)
    }

  }, [tasks, sort])

  const removeTask = (task) => {
    setTasks(tasks.filter((cur_task) => cur_task.id !== task.id));
  };

  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5;
  const lastTaskIndex = currentPage * tasksPerPage
  const firstTaskIndex = lastTaskIndex - tasksPerPage
  const currentTasks = sortedTasks.slice(firstTaskIndex, lastTaskIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
          <button className='btn' onClick={() => setSort('all')}>All</button>
          <button className='btn' onClick={() => setSort('done')}>Done</button>
          <button className='btn' onClick={() => setSort('undone')} >Undone</button>
          </div>
          <div className="flex_date_sort">
              <span>Sort by date</span>
              <button class="btn arrow_btn" onClick={sortByDate}>↑</button>
              <button class="btn arrow_btn" onClick={sortByDate}>↓</button>
          </div>
      </div>
      
        <TaskList remove={removeTask} tasks={currentTasks} />
      <Pages 
        totalTasks={sortedTasks.length}
        tasksPerPage={tasksPerPage}
        paginate={paginate}
        curPage={currentPage}
      />
    </div>
  );
}

export default App;
