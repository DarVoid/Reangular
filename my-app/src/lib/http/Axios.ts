import { Observable, from, of } from "rxjs";
import HttpClient from "../../contracts/HttpClient";
import { Axios } from 'axios';

export default class AxiosClient implements HttpClient {

    axios: Axios;

    constructor() {
        this.axios = new Axios();
    }

    header(key: string, value?: string | undefined): HttpClient {
        throw new Error("Method not implemented.");
    }

    get(url: string, params?: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    put(url: string, body?: any, params?: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    post(url: string, body?: any, params?: any): Observable<any> {
        console.log(url)
        this.axios.post(url);
        return of("");
    }

    patch(url: string, body?: any, params?: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    delete(url: string, params?: any): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
};
