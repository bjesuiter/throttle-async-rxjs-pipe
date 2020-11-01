import test from 'ava';
import {clear} from 'console';
import {EMPTY, interval, of, TimeoutError} from 'rxjs';
import {catchError, map, take, tap, timeout} from 'rxjs/operators';
import {throttleAsync} from './throttle-async';

/**
 * Throttle Async Pipe (Source Interval 500)
 * Without any waitUntil$ emission
 * Should emit first element and wait 'indefinitely'
 * (test waits for 3000 ms)
 */
test(`ThrottleAsync Pipe should emit first event`, t => {
	const waitObservable = EMPTY;
	let eventCount = 0;
	let absoluteTime = 0;

	return interval(500).pipe(
		tap(() => {
			absoluteTime += 500;
			console.log(`Time Passed: ${absoluteTime}`);
		}),
		throttleAsync(waitObservable),
		tap(() => {
			console.log(`Emit after ThrottleAsync: ${absoluteTime}`);
		}),
		map(() => eventCount++),
		timeout(2000),
		catchError(error => {
			console.log(`TimeoutEvent: `, error);
			t.true(error instanceof TimeoutError);
			t.is(eventCount, 1);
			clear;
			return of('timeout');
		})
	);
});
