import { title } from 'process';
import { take, tap, Observable, BehaviorSubject } from 'rxjs';
import HttpClient from '../contracts/HttpClient';

interface Todo {
    id: Number;
    title: String;
    status: Boolean;
}

export class TodoService {
    
    todos: BehaviorSubject<Array<Todo>>;
    list: Array<Todo>;
    
    initialValue: Array<Todo> = [
        { id: 1, title: "comer fruta", status: true },
        { id: 2, title: "da tua mae", status: false },
    ];
    
    constructor(private http: HttpClient) {
        this.todos = new BehaviorSubject(this.initialValue);
        this.list = this.initialValue;
    }

    getTodos(): Observable<any> {
        return this.todos;
    }
    
    toggleTodo(todoId: Number): void {       
        const current = this.todos.pipe(
            take(1),
            tap(antes => {
                console.log("antes: ", antes);
            })
        ).subscribe(cada => {
            const changed = cada.map(({ id, title, status }) => ({
                id,
                title,
                status: todoId === id ? !status : status,
            }));
            console.log("depois: ", changed);
            this.todos.next(changed);
        });
    }

    fetchPostsFromServer(): void {
        this.http.get("todos")
            .pipe(take(1))
            .subscribe(res => {
                console.log(res)
                this.todos.next(res.map((a: any) => ({
                    id: a.id,
                    status: a.status === "done",
                    title: a.title
                } as Todo)));
            });

    }
}
