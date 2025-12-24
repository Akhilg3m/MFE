import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MESSAGES } from '../constants/app.constants';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class NotifyGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (component && component.canDeactivate) {
      return component.canDeactivate();
    }
    return window.confirm(MESSAGES.LEAVE_PAGE);
  }
}
