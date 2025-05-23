import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();

  toggle() {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }

  close() {
    this.sidebarOpen.next(false);
  }

  open() {
    this.sidebarOpen.next(true);
  }
}
