import { Observable, from, of } from "rxjs";
import HttpClient from "../../contracts/HttpClient";
import axios from 'axios';
import {Axios} from 'axios';

import { map } from "rxjs/operators";
import config from '../../config/http';

export default class AxiosClient implements HttpClient {

    client: Axios;

    constructor() { //config: Config // add dependency injection?
        this.client = axios.create({
            headers: {'X-Sent-By': 'Reangular'},
            baseURL: config.baseURL,
        });
    }

    header(key: string, value?: string | undefined): HttpClient {
        throw new Error("Method not implemented.");
    }

    get(url: string, params?: any): Observable<any> {
        return from(this.client.get(url)).pipe(map(res => res.data));
    }

    put(url: string, body?: any, params?: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    post(url: string, body?: any, params?: any): Observable<any> {
        return from(this.client.post(url));
    }

    patch(url: string, body?: any, params?: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

    delete(url: string, params?: any): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
};
