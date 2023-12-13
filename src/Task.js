import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

function Task({ obj }) {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [notcompletedTasks, setNotCompletedTasks] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(0);
  const [objIndex, setObjIndex] = useState(0);

  const handleAddNewToDo = () => {
    if (newTodoTitle == "") alert("Enter Title Field");
    else if (newDescription == "") alert("Enter Description field");
    else {
      let newToDoObj = {
        title: newTodoTitle,
        description: newDescription,
        completed: false,
      };
      // console.log (newToDoObj);
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newToDoObj);
      // console.log (updatedTodoArr);
      setAllTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setNewDescription("");
      setNewTodoTitle("");
    }
  };
  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    setObjIndex(JSON.parse(localStorage.getItem("selectedIndex")));
    console.log(objIndex);
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem("completedTodos")
    );

    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }

    let doneTask = allTodos.filter((task) => task.completed == true);
    setCompletedTasks(doneTask);
    let ndoneTask = allTodos.filter((task) => task.completed == false);
    setNotCompletedTasks(ndoneTask);
  }, []);

  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    // console.log (index);

    // console.log (reducedTodos);
    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index);
    // console.log (reducedCompletedTodos);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  const rchecked = (index) => {
    let makeTrue = [...allTodos];
    makeTrue[index].completed = false;
    localStorage.setItem("todolist", JSON.stringify(makeTrue));
    setAllTodos(makeTrue);
  };
  const checked = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;

    let makeTrue = [...allTodos];
    makeTrue[index].completed = true;
    makeTrue[index].completedOn = finalDate;
    localStorage.setItem("todolist", JSON.stringify(makeTrue));
    setAllTodos(makeTrue);
  };

  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    // console.log (filteredTodo);

    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log(updatedCompletedList);
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );
    handleToDoDelete(index);
  };

  const navigate = useNavigate();
  const openTask = (index) => {
    localStorage.setItem("selectedIndex", JSON.stringify(index));
    navigate("./task");
  };

  return (
    <div className="App">
      <h1>Individual Tasks</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your Task?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your Task?"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
            </button>
          </div>
        </div>

        <div className="todo-list">
          {allTodos.map((item, index) => {
            index == objIndex && (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3 class="title_onHover" onClick={() => openTask(index)}>
                    {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  {item.completed && (
                    <BsCheckLg
                      title="Completed?"
                      className=" check-icon"
                      onClick={() => rchecked(index)}
                    />
                  )}
                  {!item.completed && (
                    <MdOutlineCheckBoxOutlineBlank
                      className="check-icon"
                      onClick={() => checked(index)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Task;
