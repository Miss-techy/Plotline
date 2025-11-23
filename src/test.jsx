

import './App.css'
import TodoList from './TodoList'
import  { useState } from 'react'


const sectionTypeTitle = {
  completed: 'Completed',
  pending: 'Pending',
}


function App() {

//state to hold the user's type value which is 
//initialized by an empty string
const [typedInTodo, setTypedInTodo] = useState("");
const [pendingTodos, setPendingTodos] = useState([])
const [completedTodos, setCompletedTodos] = useState([])
console.log(typedInTodo)
console.log(pendingTodos)


//Create a function to delete the todo
function deleteTodo(todoIndex, targetSection){
  const targetList = 
  targetSection === 'pending' ? pendingTodos : 
  completedTodos;
  const setter = targetSection === 'pending' ? 
  setPendingTodos : setCompletedTodos
  //the function accepts to arguments which is the todo
  //itself(which is labeled _ because we dont need it),
  //and the index of the todo
  const filteredTodos = 
  // the todos that are not deleted are filtered out into
  // a new array(this returns a new array with the 
  // filtered-out item). This is done by removing any 
  // todo that has the same index as the target one.
  targetList.filter((_, index) => todoIndex != index)
  setter(filteredTodos)
}


function completeTodos(todoIndex) {
  //get the pending todo as an argument and assign it to
  //a variable
  const pendingTask = pendingTodos[todoIndex];
  //adds the pending todos to the completedTodos using 
  //the spread operator[...]
  setCompletedTodos([...completedTodos, pendingTask]);
  //deletes the todo from the pendingTodos array
  deleteTodo(todoIndex, "pending");
}


//Create a function to add a todo using the enter btn
function onKeyDown(e) {
  //if the enter key is pressed & the field isn't empty
  if(e.key === "Enter" && typedInTodo.trim()) {
    //use the spread operator to expand the array and
    //a new todo to it
    setPendingTodos([...pendingTodos, typedInTodo])
    //clear theinput field
    setTypedInTodo("");
  }
}









  return (

    <>

    

      <div className="app">


      <h1>Todo</h1>

      {/* Input field & value    */}
      <input 
      type="text" 
      placeholder="Add todo..." 
      value={typedInTodo}
      onChange={ 
      (event) => setTypedInTodo(event.target.value)}
      onKeyDown={onKeyDown} 
       />


      <div className="sectionsContainer">

      <div className="todoContainer">

      {/* h2 appears dimmed when the section is empty
      and bold when a todo is added  */}
        <h2 
        className= {
          pendingTodos.length > 0 
          ? "boldSectionTitle"
          : "dimmedSectionTitle"
        } >
          Pending
        </h2>

      <div>
      {/* map todos with unique key identifier */}

      {pendingTodos.map((todo, index) => (
        <div key={index} className="todoItem">
          <p>{todo}</p>

          {/* append 2 btns to each todo */}
          <div className="buttonsSection">
          <button className="tranparent completeButton"
          onClick={ () => deleteTodo(index)}
          >
              {/* <checkOutlined className="icon" /> */}
            </button>
          <button className="tranparent deleteButton"
          onClick={ () => completeTodos(index) }
          >
            {/* <checkOutlined className="icon" /> */}
            </button>
          </div>

        </div>
        ))}

      </div>

       </div>


       {/* COMPELETED SECTION */}

        <div className="todoContainer">

      {/* h2 appears dimmed when the section is empty
      and bold when a todo is added  */}
        <h2 
        className= {
          completedTodos.length > 0 
          ? "boldSectionTitle"
          : "dimmedSectionTitle"
        } >
          Completed
        </h2>

      <div>
      {/* map todos with unique key identifier */}

      {completedTodos.map((todo, index) => (
        <div key={index} className="todoItem">
          <p>{todo}</p>

          {/* append 2 btns to each todo */}
          <div className="buttonsSection">
          
          <button className="tranparent deleteButton"
          onClick={ () => deleteTodos(index) }
          >
            {/* <checkOutlined className="icon" /> */}
            </button>
          </div>

        </div>
        ))}

      </div>

       </div>

       </div>
       </div>





     







    <TodoList />
    </>
  )
}

export default App


