
import React, { useEffect, useMemo, useState } from 'react';
import TaskList from './components/task-list';
import Pages from './components/pages';
import axios, { AxiosError } from 'axios';


function App({ target }) {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([])
  const [totalTasks, setTotalTasks] = useState(0)
  // disabling sorting buttons
  const [sortAll, setSortAll] = useState(true);
  const [sortDone, setSortDone] = useState(false);
  const [sortUndone, setSortUndone] = useState(false);
  const [sort, setSort] = useState('all');
  // --------------------------
  const [sortUpDisabled, setSortUpDisabled] = useState(false);
  const [sortDownDisabled, setSortDownDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  
  useEffect(() => {
    axios.get("https://todo-api-learning.herokuapp.com/v1/tasks/3?pp=5&page=1")
    .then(response => {
      setTotalTasks(response.data.count)
      setTasks(response.data.tasks)
    })
    .catch(err => console.log(err));
  }, []);
  
  const addNewTask = async (props) => {

    if (props.key === 'Enter' && props.target.value) {
      setTaskName('')
      try {
        await axios.post("https://todo-api-learning.herokuapp.com/v1/task/3", {
          "name": props.target.value,
          "done": false,
        })
      } catch (AxiosError) {
        console.log(AxiosError, 'probably task with the same name')
      }
      
    }
  };

  const sortByDate = ({ target }) => {
    if (target.lastChild.data === '↑') {
      // надо взять все таски одновременно
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
//  ------------------------------------
  const paginate = async (pageNumber) => {
    const response = await axios.get(`https://todo-api-learning.herokuapp.com/v1/tasks/3?pp=5&page=${pageNumber}`)
    setTasks(response.data.tasks)
    setCurrentPage(pageNumber);
    console.log(1)
    }

  useMemo( () => {
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

  }, [sort])

  const removeTask = (task) => {
    axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`)
    .catch(err => console.log(err));
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
              <button className="btn arrow_btn" id='↑' disabled={sortUpDisabled} onClick={sortByDate}>↑</button>
              <button className="btn arrow_btn" disabled={sortDownDisabled} onClick={sortByDate}>↓</button>
          </div>
      </div>
      
        <TaskList remove={removeTask} tasks={tasks} />
      <Pages 
        totalTasks={totalTasks}
        paginate={paginate}
        curPage={currentPage}
      />
    </div>
  );
}

export default App;
