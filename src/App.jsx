import { useState } from 'react'
import './App.css'

const db = [
  {
    id: 1,
    content: 'todo 1',
    completed: false,
  },
  {
    id: 2,
    content: 'todo 2',
    completed: true,
  }
]

function Header({ todos, setTodos }) {
  const [newtodo, setNewtodo] = useState('')

  function handleKey(e) {
    // console.log(`e: ${e.key}`)
    if (e.key === 'Enter') {
      const newTodos = [ ...todos, {id: todos.length+1, content: newtodo, completed: false} ]
      setTodos(newTodos)
      setNewtodo('')
    }
  }

  return (
    <div className="border-b border-gray-200">
      <input 
        className="w-full placeholder:italic py-2 px-4 focus:border focus:border-gray-500" 
        type="text" 
        placeholder="What needs to be done?"
        autoComplete="true"
        onKeyDown={(e) => handleKey(e)}
        value={newtodo}
        onChange={(e) => setNewtodo(e.target.value)}
        onBlur={() => setNewtodo('')}
      />
    </div>
  )
}

function TodosList({ todos, setTodos }) {
  const [isWritable, setIswritable] = useState(false)
  const [writableId, setWritableId] = useState(-1)

  function handleToggle(e, id) {
    // console.log(`e: ${e.target.checked}`)
    // console.log(`id: ${id}`)
    const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    setTodos(newTodos)
  }

  function handleDelete(id) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  function handleDoubleClick(e, id) {
    setIswritable(true)
    setWritableId(id)
  }

  function handleBlur() {
    setIswritable(false)
    setWritableId(-1)
  }

  function handleKeyDown(e, id) {
    if (e.key === 'Enter') {
      const newTodos = todos.map(todo => todo.id === id ? { ...todo, content: e.target.value } : todo)
      setTodos(newTodos)
      setIswritable(false)
      setWritableId(-1)
    }
  }

  return (
    <ul>
      {todos.length > 0 &&
        todos.map((todo) => (
          <li key={todo.id}>
            {isWritable && writableId === todo.id ? (
              <div className="border border-gray-500 flex-1">
                <input 
                  className="w-full py-2 px-4" 
                  type="text" 
                  autoFocus 
                  defaultValue={todo.content} 
                  onBlur={e => handleBlur(e)} 
                  onKeyDown={e => handleKeyDown(e, todo.id)}
                />
              </div>
            ) : (  
              <div className="flex py-2 border-b border-gray-200">
                <div className="flex-1 flex">
                  <p className="mr-2">
                    <input 
                      type="checkbox" 
                      checked={todo.completed} 
                      onChange={e => handleToggle(e, todo.id)} 
                    />
                  </p>
                  <p 
                    className={todo.completed ? "w-full line-through" : "w-full"} 
                    onDoubleClick={(e) => handleDoubleClick(e, todo.id)}
                  >
                    {todo.content}
                  </p>
                </div>
                <div>
                  <p className="hover:bg-gray-400">
                    <button 
                      className="px-2 cursor-pointer" 
                      onClick={() => handleDelete(todo.id)}
                    >
                      X
                    </button>
                  </p>
                </div>
              </div>
            )}
          </li>
        ))
}
    </ul>
  )
}

function App() {
  const [todos, setTodos] = useState(db)

  return (
    <div className="max-w-60">
      <Header todos={todos} setTodos={setTodos} />
      <TodosList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
