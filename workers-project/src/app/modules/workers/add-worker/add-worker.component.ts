import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender, Worker } from '../models/worker.model';

@Component({
  selector: 'add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['../../../card-style.scss',]
})
export class AddWorkerComponent {

  gender = Gender;
  selectedLecturerId: number = null;
  workerForm: FormGroup;
  constructor(private _router: Router) {

  }

  ngOnInit(): void {
    // Calculate birthdate 18 years ago
    const today = new Date();
    const birthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // Initialize the form with default values
    this.workerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      identity: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
      startOfWork: new FormControl(today.toISOString().substring(0, 10), [Validators.required]), // Start of Work initialized with today's date
      birthdate: new FormControl(birthdate.toISOString().substring(0, 10), [Validators.required]), // Birthdate initialized with 18 years before today
      gender: new FormControl(this.gender.Male, [Validators.required]),
      roles: new FormControl([]),
      status: new FormControl(true, [Validators.required])
    });
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

  goToNextPage() {
    if (this.workerForm.valid) {
      const newWorker = this.workerForm.value;
      const workerParam = encodeURIComponent(JSON.stringify(newWorker));
      this._router.navigate(['/workers/addRoleTo', { worker: workerParam }]);
    }
    else{
      this.markFormGroupTouched(this.workerForm);

    }
  }
}