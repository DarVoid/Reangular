import { take, tap,of, Observable, BehaviorSubject } from 'rxjs';

interface Todo {
    id: Number;
    description: String;
    done: Boolean;
}

export class TodoService {

    todos: BehaviorSubject<Array<Todo>>;
    list: Array<Todo>;
    
    initialValue: Array<Todo> = [
        { id: 1, description: "comer fruta", done: true },
        { id: 2, description: "da tua mae", done: false },
    ];
    
    constructor() {
        this.todos = new BehaviorSubject(this.initialValue);
        this.list = this.initialValue;
    }

    getTodos(): Observable<any>{
        return this.todos;
    }
    
    toggleTodo(todoId: Number): void {       
        const current = this.todos.pipe(
            take(1),
            tap(antes => {
                console.log("antes: ", antes);
            })
        ).subscribe(cada => {
            const changed = cada.map(({ id, description, done }) => ({
                id,
                description,
                done: todoId === id ? !done : done,
            }));
            console.log("depois: ", changed);
            this.todos.next(changed);
        });
    }

    postsTodoOnline(): Observable<any>{
        return of()
    }
}

