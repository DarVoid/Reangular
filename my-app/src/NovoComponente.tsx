import { Component } from "react";
import {  Subscription } from "rxjs";
import { TodoService } from "./services/todoService";
import Axios from "./lib/http/Axios";

export default class NovoComponente extends Component {

    private todoService: TodoService;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);

        this.todoService = new TodoService(new Axios());
    }
    
    state = {
        todoSub: new Subscription() as Subscription,
        todos: [] as Array<any>,
    }

    componentDidMount(): void {
        this.setState({ 
            todoSub: this.todoService.getTodos().subscribe(
                (todos: any) => {
                    this.setState({todos});
                }
            )
        });
    }

    componentWillUnmount(): void {
        this.state.todoSub.unsubscribe();
    }

    render() {
        return (
            <div className="px-16 py-4">
                <h1 className="font-bold tracking-tight text-3xl">Todo</h1>
                <ul className="mt-4">
                    { this.state.todos.map(todo => <li className="my-1 flex items-center justify-start gap-2">
                        <button className="bg-white border-2 hover:bg-gray-300 border-gray-500 w-8 h-8 rounded-lg" onClick={ () => this.todoService.toggleTodo(todo.id) }>
                            {todo.status ? "✔️": "❌"}
                        </button>
                        <span>{ todo.title }</span>
                    </li>) }

                </ul>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-blue-100 text-sm font-bold tracking-tight px-6 py-2 rounded-full" onClick={ () => this.todoService.fetchPostsFromServer() }>
                    Yeet 'em
                </button>
            </div>
        );
    }

}
