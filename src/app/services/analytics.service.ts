import { Injectable } from '@angular/core';

declare function gtag(...args: unknown[]): void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params ?? {});
    }
  }
}
