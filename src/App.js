
import React, { useEffect, useMemo, useState } from 'react';
import TaskList from './components/task-list';
import Pages from './components/pages';
import axios, { AxiosError } from 'axios';


function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([])
  const [tasksCount, setTasksCount] = useState(0)
  const [sort, setSort] = useState('all');
  const [sortUpDisabled, setSortUpDisabled] = useState(false);
  const [sortDownDisabled, setSortDownDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  
  useEffect(() => {
    axios.get("https://todo-api-learning.herokuapp.com/v1/tasks/3?pp=5&page=1")
    .then(response => {
      setTasksCount(response.data.count)
      setTasks(response.data.tasks)
    })
    .catch(err => console.log(err));
  }, []);
  
  const addNewTask = async (props) => {

    if (props.key === 'Enter' && props.target.value) {
      setTaskName('')
      try {
        const response = await axios.post("https://todo-api-learning.herokuapp.com/v1/task/3", {
          "name": props.target.value,
          "done": false,
        })
        setTasks(() => {
          if (sortDownDisabled) {
            return [response.data, ...tasks].slice(0, 5);
          } else {
            return [...tasks, response.data].slice(0, 5);
          }
          
          })
          setTasksCount(tasksCount + 1);
      } catch (AxiosError) {
        console.log(AxiosError, 'probably task with the same name')
      }
      
    }
  };

  const sortByDate = ({ target }) => {

    if (target.id === '↑') {
      setTasks([...tasks].sort( (a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
      setSortUpDisabled(true);
      setSortDownDisabled(false);
    }
    if (target.id === '↓') {
      setTasks([...tasks].sort( (a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setSortUpDisabled(false);
      setSortDownDisabled(true);
    }
  }
//  ------------------------------------
  const paginate = async (pageNumber) => {
    if (sort === 'done' || sort === 'undone') {
      const url = `https://todo-api-learning.herokuapp.com/v1/tasks/3?filterBy=${sort}&order=${() => sortUpDisabled ? 'asc' : 'desc'}&pp=5&page=${pageNumber}`
      const response = await axios.get(url)
      setTasks(response.data.tasks)
      setCurrentPage(pageNumber);

    } else {
      const url = `https://todo-api-learning.herokuapp.com/v1/tasks/3?filterBy=order=${() => sortUpDisabled ? 'asc' : 'desc'}&pp=5&page=${pageNumber}`
      const response = await axios.get(url)
      setTasks(response.data.tasks)
      setCurrentPage(pageNumber);
    }
  }

  useMemo( () => {
    switch(sort) {
      case 'all':
        return paginate(1);
      case 'done':
        return paginate(1);
      case 'undone':
        return paginate(1);
    }

  }, [sort])

  const removeTask = (task) => {
    axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`)
    .then(() => {
      setTasksCount(tasksCount - 1);
      return paginate(1)})
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
          <button className='btn' disabled={sort === 'all'} onClick={() => setSort('all')}>All</button>
          <button className='btn' disabled={sort === 'done'} onClick={() => setSort('done')}>Done</button>
          <button className='btn' disabled={sort === 'undone'} onClick={() => setSort('undone')} >Undone</button>
          </div>
          <div className="flex_date_sort">
              <span>Sort by date</span>
              <button className="btn arrow_btn" id='↑' disabled={sortUpDisabled} onClick={sortByDate}>↑</button>
              <button className="btn arrow_btn" id='↓' disabled={sortDownDisabled} onClick={sortByDate}>↓</button>
          </div>
      </div>
      
        <TaskList remove={removeTask} tasks={tasks} />
      <Pages 
        tasksCount={tasksCount}
        paginate={paginate}
        curPage={currentPage}
      />
    </div>
  );
}

export default App;
