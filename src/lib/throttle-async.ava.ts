import test from 'ava';
import {EMPTY, interval, of, TimeoutError} from 'rxjs';
import {catchError, map, take, timeout} from 'rxjs/operators';
import {throttleAsync} from './throttle-async';

test(`
Throttle Async Pipe (Source Interval 500)
Without any waitUntil$ emission
Should emit first element and wait 'indefinitely'
(test waits for 3000 ms)
`, t => {
	const waitObservable = EMPTY;
	let eventCount = 0;

	return interval(500).pipe(
		throttleAsync(waitObservable),
		map(() => eventCount++),
		timeout(3000),
		catchError(error => {
			t.true(error instanceof TimeoutError);
			t.is(eventCount, 1);
			return of('timeout');
		})
	);
});
