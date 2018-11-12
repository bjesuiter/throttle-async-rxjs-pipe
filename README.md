# throttle-async-rxjs-pipe
A pipe functions for rxjs 6+ which accepts a 'wait' observable, emits 1 elements of the source stream 
and waits for an event on the 'wait' observable.

## What does throttleAsync do (in order)?
1. Get a waitUntil$ observable as parameter
2. Emit one value (may be configurable in the future)
3. Wait until waitUntil$ observable emits a value. 
4. If waitUntil$ emits a value, emit another value from the source observable.

## Why is this useful?
I personally need it for splitting up resize events from the browser into a 
`resize-start` and a `resize-end` observable. 

First, we need an observable of window resize events: 

    const windowResize$ = fromEvent(window, 'resize');

We can produce a `resize-end` observable by 

    const windowResizeEnd$ = windowResize$.pipe(debounceTime(500));
    
But how would you build the windowResizeStart$ observable?  
This is, where the `throttleAsync` pipe comes in.  
We need `windowResize$` to emit exactly one event and then pause emission  
until `windowResizeEnd$` emits a value. 

        const windowResizeStart$ = windowResize$.pipe(
            throttleAsync(windowResizeEnd$)
        );
    

## Future Features (eventually)

- Emit `n source events`  between `waitUntil$` observable emissions instead of only one.  
  The parameter n should be configureable when instantiating throttleAsync.
- Make the parameter n dynamic by using the value of the `waitUntil$` observable 
  as a number of how many events to emit next.

## Changelog

### [1.0.0] - 2018-11-12
*Initial Release*

#### Features
- throttleAsync pipe which emits one event and then waits for `waitUntil$` observable emissions