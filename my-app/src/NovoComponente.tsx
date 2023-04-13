import { Component } from "react";
import { Subject, Subscription } from "rxjs";
import { TodoService } from "./services/todoService";

export default class NovoComponente extends Component {
    
    //private todoService: TodoService;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(private todoService: TodoService, props: any) {
        super(props);

        this.todoService = new TodoService();
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
                
            </div>
        );
    }

}
