import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './components/TodoList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <!-- Navigation header --> */}
      <header className="navigation-header">
        <span className="navigation-logo">
          <img src="./todo-icon.png" alt="todo-logo"/>
        </span>
        <span className="spacer"></span>
        <span className="navigation-description">Todo List</span>
      </header>

      {/* <!-- Main content --> */}
      <TodoList />

      {/* <!-- Footer --> */}
      <footer className="footer">
        <p>Copyright © designed by Mihail Valkov</p>
      </footer>
    </>
  )
}

export default App
