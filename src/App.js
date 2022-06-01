import React, { useEffect, useMemo, useState } from "react";
import TaskList from "./components/task-list";
import Pages from "./components/pages";
import axios, { AxiosError } from "axios";

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [tasksCount, setTasksCount] = useState(0);
  const [sort, setSort] = useState("all");
  const [sortByDate, setSortByDate] = useState("desc");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        "https://todo-api-learning.herokuapp.com/v1/tasks/3?filterBy=order=desc&pp=5&page=1"
      )
      .then((response) => {
        setTasksCount(response.data.count);
        setTasks(response.data.tasks);
      })
      .catch((err) => console.log(err));
  }, []);

  const addNewTask = async (props) => {
    if (props.key === "Enter" && props.target.value) {
      setTaskName("");
      try {
        await axios.post(
          "https://todo-api-learning.herokuapp.com/v1/task/3",
          {
            name: props.target.value,
            done: false,
          }
        );
        if (sortByDate === 'asc' && tasksCount > 0 && tasksCount % 5 === 0) {
          paginate(pageCount + 1)

        } else if (sortByDate === 'asc') {
          paginate(pageCount);

        } else {
          paginate(1);
        }
        
        
        setTasksCount(tasksCount + 1);
      } catch (AxiosError) {
        console.log(AxiosError, "probably task with the same name");
      }
    }
  };

  const paginate = async (pageNumber) => {
    const url = `https://todo-api-learning.herokuapp.com/v1/tasks/3?filterBy=${
      sort !== "all" ? sort : ""
    }&order=${sortByDate}&pp=5&page=${pageNumber}`;

    const response = await axios.get(url);
    setTasks(response.data.tasks);
    setTasksCount(response.data.count);
    setCurrentPage(pageNumber);
  };

  useMemo(() => {
    setPageCount(Math.ceil(tasksCount / 5));
  }, [tasks]);

  useMemo(() => {
    switch (sort) {
      case "all":
        return paginate(1);
      case "done":
        return paginate(1);
      case "undone":
        return paginate(1);
    }
  }, [sort]);

  useEffect(() => {
    paginate(1);
  }, [sortByDate])

  const removeTask = (task) => {
    axios
      .delete(`https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`)
      .then(() => {
        setTasksCount(tasksCount - 1);
        return paginate(1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>ToDo</h1>

      <input
        className="add_task"
        type="text"
        placeholder="что бы я хотел сделать..."
        value={taskName}
        onChange={(target) => setTaskName(target.value)}
        onKeyDown={addNewTask}
      />

      <div className="header_buttons">
        <div>
          <button
            className="btn"
            disabled={sort === "all"}
            onClick={() => setSort("all")}
          >
            All
          </button>
          <button
            className="btn"
            disabled={sort === "done"}
            onClick={() => setSort("done")}
          >
            Done
          </button>
          <button
            className="btn"
            disabled={sort === "undone"}
            onClick={() => setSort("undone")}
          >
            Undone
          </button>
        </div>
        <div className="flex_date_sort">
          <span>Sort by date</span>
          <button
            className="btn arrow_btn"
            id="↑"
            disabled={sortByDate === "asc"}
            onClick={() => {
              setSortByDate("asc")
              
            }}
          >
            ↑
          </button>
          <button
            className="btn arrow_btn"
            id="↓"
            disabled={sortByDate === "desc"}
            onClick={() => setSortByDate("desc")}
          >
            ↓
          </button>
        </div>
      </div>

      <TaskList remove={removeTask} tasks={tasks} setTasks={setTasks}/>
      <Pages
        tasksCount={tasksCount}
        paginate={paginate}
        curPage={currentPage}
        pageCount={pageCount}
        sort={sort}
      />
    </div>
  );
}

export default App;
