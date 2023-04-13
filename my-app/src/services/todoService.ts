import { of, take,  Observable, BehaviorSubject } from 'rxjs';
//import { of, map } from 'rxjs/operators';

export class TodoService {

    todos: BehaviorSubject<Array<any>>;
    list: Array<any>;
    
    initialValue: any = [{id: 1,desc:"comer fruta", done: true},{id: 2,desc:"da tua mae", done: false}]
    
    constructor() {
        this.todos = new BehaviorSubject(this.initialValue)
        this.list = this.initialValue
    }

    getTodos(): Observable<any>{
        return this.todos;
    }
    
    toggleTodo(key: number): void {
        console.log(`I was toggled! [${key}]`);
        
        const current = this.todos.asObservable().pipe(take(1)).subscribe(cada => {
            const changed = cada.map(({ id, desc, done }) => ({
                id,
                desc,
                done: key === id ? !done : done,
            }));
            this.todos.next(changed);
        });
        

        console.log(this.todos);
    }
}

