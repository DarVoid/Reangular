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
        { id: 1, title: "Comer fruta", status: true },
        { id: 2, title: "Beber leite", status: false },
        { id: 3, title: "Chorar em espanhol", status: false },
        { id: 4, title: "1. Cereais", status: true },
        { id: 5, title: "2. Leite", status: false },
        { id: 6, title: "3. Taça", status: false },
        { id: 7, title: "4. Garfo", status: false },
        { id: 8, title: "Dispose of the body", status: false },
    ];
    
    constructor(private http: HttpClient) {
        this.todos = new BehaviorSubject(this.initialValue);
        this.list = this.initialValue;
    }

    getTodos(): Observable<any> {
        return this.todos;
    }
    
    toggleTodo(todoId: Number): void {       
        this.todos.pipe(
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
