import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  animation: string = `assets/animtion.gif`;

  constructor(private router: Router) { }

  isLoggedIn(): boolean {

    return sessionStorage.getItem('token') !== null;
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  // Logout function
  logout(): void {

    sessionStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
