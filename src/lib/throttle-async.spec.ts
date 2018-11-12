import {EMPTY, interval, of, TimeoutError} from "rxjs";
import {catchError, timeout} from "rxjs/operators";
// import {throttleAsync} from "throttle-async-lib/throttle-async";
import {throttleAsync} from "./throttle-async";

describe('Throttle Async Pipe', () => {
    describe('Without any waitUntil$ emission', () => {

        it('Should emit first element', (done) => {
            const waitObservable = EMPTY;
            let eventCount = 0;

            interval(500).pipe(
                throttleAsync(waitObservable),
                timeout(1500),
                catchError((error) => {
                    expect(error).toBeInstanceOf(TimeoutError);
                    return of('timeout')
                })
            ).subscribe((data) => {
                if (data === 'timeout') {
                    expect(eventCount === 1);
                    done()
                }
            });
        })

    })

});