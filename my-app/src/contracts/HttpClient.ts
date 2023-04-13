import { Observable } from "rxjs";

export default interface HttpClient {

    header(key: string, value?: string): HttpClient,

    get(url: string, params?: any): Observable<any>,
    put(url:string, body?:any, params?: any): Observable<any>,
    post(url:string, body?:any, params?: any): Observable<any>,
    patch(url:string, body?:any, params?: any): Observable<any>,
    delete(url:string, params?: any): Observable<any>,
    

};
