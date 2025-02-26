import { useState, useEffect } from 'react';
import Todo from './Todo';

export default function TodoList() {

    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/todos')
            .then(response => response.json())
            .then(data => {
                setTodos(Object.values(data))
                setLoading(true)
            })
            .catch(error => console.error('Error fetching todos:', error));
    },[]);

    function changeStatus(id) {
        let todo = todos.find(todo => todo._id === id ? todo : null)
        todo.isCompleted = !todo.isCompleted
        
        fetch(`http://localhost:3030/jsonstore/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(response => {        
            setTodos((todos)=>todos.map(todo=>todo._id === id ? {...todo, isCompleted:todo.isCompleted} : todo));
            setTodoText('');
        })
        .catch(error => console.error('Error updating todo:', error));
    }

    function addTodo(todoText) {
        if(todoText === '') return;

        const newTodo = {
            _id: 'todo_'+todos.length,
            text: todoText,
            isCompleted: false
        };
        
        fetch('http://localhost:3030/jsonstore/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
        .then(response => response.json())
        .then(newTodo => {
            setTodos(oldTodos => [...oldTodos, newTodo]);
            setTodoText(''); // Clear input after adding
        })
        .catch(error => console.error('Error adding todo:', error));
    }

    function handleSetTodoText(text) {
        setTodoText(text);
    }

    return (
        <main className="main">

            {/* <!-- Section container --> */}
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <input type="text" placeholder="Add new todo" onInput={(e) =>handleSetTodoText(e.target.value)} />
                    <button onClick={()=>addTodo(todoText)} className="btn">+ Add new Todo</button>
                </div>

                <div className="table-wrapper">

                    {/* <!-- Loading spinner - show the load spinner when fetching the data from the server--> */}
                    {!loading &&
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <span className="loading-spinner-text">Loading</span>
                            </div>
                        </div>
                    }

                    {/* <!-- Todo list table --> */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-task">Task</th>
                                <th className="table-header-status">Status</th>
                                <th className="table-header-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* <!-- Todo item --> */}
                            {todos.map(
                                todo => <Todo key={todo._id}
                                    id={todo._id}
                                    text={todo.text}
                                    isCompleted={todo.isCompleted}
                                    changeStatus={changeStatus}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
