import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [notcompletedTasks, setNotCompletedTasks] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);

  const handleEdit = (index) => {
    setNewTodoTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
    setIsEditing(true);
    setEditedIndex(index);
  };

  const handleSaveEdit = () => {
    if (newTodoTitle === "") {
      alert("Enter Title Field");
    } else if (newDescription === "") {
      alert("Enter Description field");
    } else {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr[editedIndex] = {
        title: newTodoTitle,
        description: newDescription,
        completed: updatedTodoArr[editedIndex].completed,
      };
      setAllTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setNewDescription("");
      setNewTodoTitle("");
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewTodoTitle("");
    setNewDescription("");
  };

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
  // const openTask = (index) => {
  //   localStorage.setItem("selectedIndex", index);
  //   navigate("./task");
  // };

  return (
    <div className="App">
      <h1>My Tasks</h1>

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
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === 0 && "active"}`}
            onClick={() => setIsCompletedScreen(0)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === 1 && "active"}`}
            onClick={() => setIsCompletedScreen(1)}
          >
            Completed
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === 2 && "active"}`}
            onClick={() => setIsCompletedScreen(2)}
          >
            Not Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === 0 &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3 class="title_onHover">{item.title}</h3>
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
                  <button
                    onClick={() => handleEdit(index)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}

          {isCompletedScreen === 1 &&
            allTodos.map(
              (item, index) =>
                item.completed == true && (
                  <>
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>
                          {" "}
                          <i>Completed at: {item.completedOn}</i>
                        </p>
                      </div>
                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleCompletedTodoDelete(index)}
                        />
                      </div>
                    </div>
                  </>
                )
            )}
          {isCompletedScreen === 2 &&
            allTodos.map(
              (item, index) =>
                item.completed == false && (
                  <>
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleCompletedTodoDelete(index)}
                        />
                      </div>
                    </div>
                  </>
                )
            )}
        </div>
      </div>
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
            </div>
            <div className="modal-body">
              <label>Title:</label>
              <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="Edit the title of your Task"
              />
              <br />
              <br />
              <label>Description:</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Edit the description of your Task"
              />
            </div>
            <div className="modal-footer">
              <button className="primary-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="primary-btn" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
