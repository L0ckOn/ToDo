import { __esModule } from '@testing-library/jest-dom/dist/matchers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TaskList from './components/task-list';
import Pages from './components/pages';


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
      const sortDate = document.getElementById('↑');
      if (sortDate.disabled)
        setTasks([...tasks, newTask]);
      else
        setTasks([newTask, ...tasks])
      setTaskName('');

    }
  };

  const [sortUpDisabled, setSortUpDisabled] = useState(false);
  const [sortDownDisabled, setSortDownDisabled] = useState(true);
  const sortByDate = ({ target }) => {
    if (target.lastChild.data === '↑') {
      setTasks([...tasks].sort( (a, b) => a.id - b.id));
      setSortUpDisabled(true);
      setSortDownDisabled(false);
    }
    if (target.lastChild.data === '↓') {
      setTasks([...tasks].sort( (a, b) => b.id - a.id));
      setSortUpDisabled(false);
      setSortDownDisabled(true);
    }
  }
  // disabling sorting buttons
  const [sortAll, setSortAll] = useState(true);
  const [sortDone, setSortDone] = useState(false);
  const [sortUndone, setSortUndone] = useState(false);
  const [sort, setSort] = useState('all');
  // --------------------------
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5;
  const lastTaskIndex = currentPage * tasksPerPage
  const firstTaskIndex = lastTaskIndex - tasksPerPage

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
    const curPage = document.getElementById(pageNumber)
    console.log(curPage)};

  const sortedTasks = useMemo( () => {
    switch(sort) {
      case 'all':
        paginate(1);
        setSortAll(true);
        setSortDone(false);
        setSortUndone(false);
        return tasks;
      case 'done':
        paginate(1);
        setSortAll(false);
        setSortDone(true);
        setSortUndone(false);
        return tasks.filter( (task) => task.isDone);
      case 'undone':
        paginate(1);
        setSortAll(false);
        setSortDone(false);
        setSortUndone(true);
        return tasks.filter( (task) => !task.isDone)
    }

  }, [tasks, sort])

  const currentTasks = sortedTasks.slice(firstTaskIndex, lastTaskIndex);

  const removeTask = (task) => {
    setTasks(tasks.filter((cur_task) => cur_task.id !== task.id));
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
          <button className='btn' disabled={sortAll} onClick={() => setSort('all')}>All</button>
          <button className='btn' disabled={sortDone} onClick={() => setSort('done')}>Done</button>
          <button className='btn' disabled={sortUndone} onClick={() => setSort('undone')} >Undone</button>
          </div>
          <div className="flex_date_sort">
              <span>Sort by date</span>
              <button class="btn arrow_btn" id='↑' disabled={sortUpDisabled} onClick={sortByDate}>↑</button>
              <button class="btn arrow_btn" disabled={sortDownDisabled} onClick={sortByDate}>↓</button>
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
