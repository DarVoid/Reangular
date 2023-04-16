
import React, { useState, useEffect } from 'react';
import { interval } from 'rxjs';

export default function Counter() {
    const [state, setState] = useState(0);

    const observable$ = interval(1000);

    useEffect(() => {
    observable$.subscribe((value:any) => {
        console.log(value )
        setState(value)
    });
    });
    

    return (
    <div>
        <h1>Hello RxJS!</h1>
        <p>Observable value: {state}</p>
    </div>
    );
}