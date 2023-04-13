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

    render() {
        return (
            <div>
                <h1>Todo</h1>
                <ul>
                    { this.state.todos.map(todo => <li>
                        <button onClick={ () => this.todoService.toggleTodo(todo.id) }>
                            [{todo.done ? "✔️": "❌"}]
                        </button>
                        { todo.description }
                    </li>) }

                </ul>
                <button onClick={ () => this.todoService.postsTodoOnline() }>
                    Yeet 'em
                </button>
            </div>
        );
    }

}
