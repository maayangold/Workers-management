import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  animation: string = `assets/animtion.gif`;
  loginErrorMessage = null;

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }
  tryEnter() {
    if (!this.isLoggedIn()) {
      this.loginErrorMessage = "For Watching Workers-List You Must Login Before!";
      setTimeout(() => {
        this.resetErrorMessage();
      }, 2000); 
    } else {
      this.resetErrorMessage();
    }
  }
  
  goToLogin() {
    this.resetErrorMessage();
    this.router.navigate(['/login']);
  }
  // Logout function
  logout(): void {
    this.resetErrorMessage();
    sessionStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
  resetErrorMessage() {
    this.loginErrorMessage = null

  }
}

