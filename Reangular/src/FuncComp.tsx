import React, { useState, useEffect } from 'react';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { TodoService } from './services/todoService';
import Axios from './lib/http/Axios';

function NovoComponente2() {
    const [todos, setTodos] = useState<any[]>([]);
    let todoSub: Subscription;
    const todoService = new TodoService(new Axios());
    useEffect(() => {
        todoSub =  todoService.getTodos().subscribe((todos2: any) => {
            console.log("asdasd")
            console.log(todos2)
            setTodos(todos2)
        });
        console.log("aaaa")
        return () => {
            
            console.log("uga booga")
            todoSub.unsubscribe();
        };
    }, []);
    
    const toggleTodo = (todoId: number) => {
        todoService.toggleTodo(todoId);
    };

    const fetchPostsFromServer = () => {
        todoService.fetchPostsFromServer();
    };

    return (
    <div className='px-16 py-4'>
        <h1 className='font-bold tracking-tight text-3xl'>Todo</h1>
        <ul className='mt-4'>
        {todos.map((todo) => (
            <li className='my-1 flex items-center justify-start gap-2' key={todo.id}>
            <button
                className='bg-white border-2 hover:bg-gray-300 border-gray-500 w-8 h-8 rounded-lg'
                onClick={() => toggleTodo(todo.id)}
            >
                {todo.status ? '✔️' : '❌'}
            </button>
            <span>{todo.title}</span>
            </li>
        ))}
        </ul>
        <button
        className='mt-4 bg-blue-600 hover:bg-blue-700 text-blue-100 text-sm font-bold tracking-tight px-6 py-2 rounded-full'
        onClick={() => fetchPostsFromServer()}
        >
        Yeet 'em
        </button>
    </div>
    );
}

export default NovoComponente2;
