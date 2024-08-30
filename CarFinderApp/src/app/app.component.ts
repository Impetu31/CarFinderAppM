import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loggedInUser: any;
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        this.showHeader = event.url !== '/home';
      }
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUser = null;
    this.router.navigate(['/home']);
  }
}
