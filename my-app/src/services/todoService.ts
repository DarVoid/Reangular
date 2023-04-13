import { of, Observable } from 'rxjs';
//import { of, map } from 'rxjs/operators';

export class TodoService{

    todos: Array<any>;

    constructor(){ // private handler
        this.todos = [{id: 1,desc:"sim", done: false},{id: 2,desc:"nao", done: false}]
    }
    getTodos(): Observable<any>{
        return of(this.todos)
    }
    
    toggleTodo(key: number): Observable<any>{
        this.todos = this.todos.map(({id, desc, done})=>{
            if(id === key){
                return {
                    id,
                    desc,
                    done: !done
                }
            }
            return {
                id,
                desc,
                done
            }
        })
        return of(this.todos)
    }
}