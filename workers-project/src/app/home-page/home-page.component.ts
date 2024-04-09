import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  image:string=`assets/icons/logo4.jpg`;
  constructor(private router: Router) {}



}
