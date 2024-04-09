import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from '../modules/workers/worker.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string=null;

  constructor(private workerService: WorkerService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      this.errorMessage = null
      return;
    }
    const { userName, password } = this.loginForm.value;
    this.workerService.login(userName, password)
      .subscribe(
        (response: any) => {
          if (response && response.token) {
            this.errorMessage = null;
            sessionStorage.setItem('token', response.token);
            let timerInterval;
            Swal.fire({
              title: "Connects to the database...🔌",
              html: "already finishing.",
              timer: 1500,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                }, 100);

              },
              willClose: () => {
                clearInterval(timerInterval);
              }
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                this.router.navigate(['/workers']);
              }
            });
          }
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Just maneger can use this app.';
        }
      );
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
