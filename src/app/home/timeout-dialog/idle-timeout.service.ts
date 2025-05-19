import { Injectable } from '@angular/core';
import { Logger } from 'app/core/logger/logger.service';
import { environment } from 'environments/environment';
import { interval, merge, fromEvent, Observable } from 'rxjs';
import { takeUntil, repeat, map, filter, tap, debounceTime } from 'rxjs/operators';

/**
 *  Idle timeout service used to track idle user
 */
@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
  private readonly logger: Logger = new Logger('Idle Timeout');
  // Constants
  private readonly STORAGE_NAME = 'user_last_activity_timestamp';
  // max timeout for an idle user
  readonly timeoutDelay = environment.session.timeout.idleTimeout || 300000; // 5 minutes

  // observable timeout
  readonly $onSessionTimeout: Observable<void>;

  constructor() {
    const events = [
      'mousemove',
      'keydown',
      'wheel',
      'mousedown',
      'scroll',
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel'
    ];
    const $userActivity = merge(...events.map((eventName) => fromEvent(document, eventName))).pipe(
      debounceTime(10),
      tap(() => {
        this.updateLastActivity();
      })
    );

    const userEvents = interval(this.timeoutDelay).pipe(
      takeUntil($userActivity),
      map(() => undefined),
      repeat()
    );

    this.$onSessionTimeout = merge(
      userEvents,

      // When window is focused
      fromEvent(document, 'visibilitychange').pipe(
        filter(() => document.visibilityState === 'visible'),
        map(() => {
          if (this.hasTimedOut()) {
            return undefined;
          } else {
            return null;
          }
        }),
        filter((value) => value !== null)
      )
    );
  }

  /**
   * Checks for if the inactive period exceeds the allowed timeout
   */
  private hasTimedOut(): boolean {
    const lastActivity = this.getLastActivity();
    const now = Date.now();
    const inactive = now - lastActivity;
    return this.timeoutDelay <= inactive;
  }

  /**
   * Gets the last recorded activity
   */
  private getLastActivity() {
    try {
      const activity = localStorage.getItem(this.STORAGE_NAME);
      return parseInt(activity);
    } catch {
      return Date.now();
    }
  }

  /**
   * Update the last activity
   */
  private updateLastActivity() {
    try {
      localStorage.setItem(this.STORAGE_NAME, Date.now().toString());
    } catch {
      this.logger.error('Failed to save timestamp to localStorage');
    }
  }
}
