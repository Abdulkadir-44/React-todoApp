import { useReducer, useState } from "react"
import './App.css'
const reducer = (state, action) => {
  
  switch (action.type) {
    case 'SET_TODO':
      return {
        ...state,
        todo: action.value
      }
    case 'ADD_TODO':
      return {
        ...state,
        todo: '',
        todos: [...state.todos, action.value]
      }
    case 'DELETE':
        
       return {
         ...state,
         todos:state.todos.filter(todo=>{
          if(todo!=state.todos[action.button_id])
            return todo;
        })
       }
  }

}

function App() {

  const [state, dispatch] = useReducer(reducer, { todos: [], todo: '' });

  function onchange(event) {
    dispatch({
      type: 'SET_TODO',
      value: event.target.value
    })
  };
  function submitHandle(event) {
    event.preventDefault();
    if(state.todo=='')
    {
      alert('Boş kutucuk...')
    }
    else
    {
      dispatch({
        type: 'ADD_TODO',
        value: state.todo
      })
    }
   
  }
  function deleteButton(e){
    
     dispatch({
       type:'DELETE',
       button_id:(+e.target.id)
     })
  }

  return (
    <>
      <div className="wrapper">
        <h1>React Todo App</h1>
        <form onSubmit={submitHandle}>
          <input type="text" value={state.todo} onChange={onchange} />
          <button type="submit">Ekle</button>
        </form>
        <ul>
          {
            state.todos.map((item, index) => (
              <li key={index}>
                {item}
                <button id={index} onClick={deleteButton}>Kaldır</button>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}
export default App