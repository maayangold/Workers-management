import { Component, numberAttribute } from '@angular/core';
import { Gender, Worker } from '../models/worker.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from '../worker.service';
import { RoleService } from '../../roles/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['../../../card-style.scss']
})
export class EditWorkerComponent {
  worker: Worker
  workerId: number;
  genderType = Gender;
  selectedLecturerId: number = null;
  workerForm: FormGroup;

  constructor(private _route: ActivatedRoute, private _workerService: WorkerService, private _roleService: RoleService, private _router: Router) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.workerId = +params['id'];
      if (this.workerId) {
        this._workerService.getWorkerById(this.workerId).subscribe(
          (data) => {
            this.worker = data;
            this.fullForm(data);
          },
          () => {
            Swal.fire({ icon: "error", title: "Error...", text: "There is no worker with such an id number" });
            this._router.navigate(['/workers']);
          }
        );
      }
    });
  }
  fullForm(value: Worker) {
    this.workerForm = new FormGroup({

      firstName: new FormControl(value.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      lastName: new FormControl(value.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      identity: new FormControl(value.identity, [Validators.required, Validators.pattern(/^\d{9}$/)]),
      startOfWork: new FormControl(new Date(value.startOfWork).toISOString().split('T')[0], [Validators.required]),
      birthdate: new FormControl(new Date(value.birthdate).toISOString().split('T')[0], [Validators.required]),
      gender: new FormControl(value.gender, [Validators.required]),
      status: new FormControl(value.status, [Validators.required])
    });
  }

  removeRole(roleId: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._workerService.deleteRoleFromWorker(this.worker.id, roleId).subscribe(() => {
          // Remove the role from this.worker.roles array
          this.worker.roles = this.worker.roles.filter(role => role.roleId !== roleId);
     
        }, (error) => {
          console.error('Error:', error);
        });
      }
    });
  }
  
  
  addRole() {
    this.saveChanges();
    const workerParam = encodeURIComponent(JSON.stringify(this.worker));
    this._router.navigate(['/workers/addRoleTo', { worker: workerParam }]);
  }
  saveChanges() {

    if (this.workerForm.valid) {
      this.worker.id = this.workerId;
      this.worker.firstName = this.workerForm.get('firstName').value;
      this.worker.lastName = this.workerForm.get('lastName').value;
      this.worker.identity = this.workerForm.get('identity').value;
      this.worker.startOfWork = this.workerForm.get('startOfWork').value;
      this.worker.birthdate = this.workerForm.get('birthdate').value;
      this.worker.gender = this.workerForm.get('gender').value;
      console.log(this.workerForm.get('status').value)
      this.worker.status = this.workerForm.get('status').value;

      this._workerService.updateWorker(this.workerId, this.worker).subscribe(

      );
    } else {
      this.markFormGroupTouched(this.workerForm)
    }
  }
  EditWorker() {

    if (this.workerForm.valid) {
      this.worker.id = this.workerId;
      this.worker.firstName = this.workerForm.get('firstName').value;
      this.worker.lastName = this.workerForm.get('lastName').value;
      this.worker.identity = this.workerForm.get('identity').value;
      this.worker.startOfWork = this.workerForm.get('startOfWork').value;
      this.worker.birthdate = this.workerForm.get('birthdate').value;
      this.worker.gender = this.workerForm.get('gender').value;
      console.log(this.workerForm.get('status').value)
      this.worker.status = this.workerForm.get('status').value;

      console.log(this.worker)
      this._workerService.updateWorker(this.workerId, this.worker).subscribe(
        () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Update data for ${this.worker.firstName}`,
            showConfirmButton: false,
            timer: 1500,
          });

          this._router.navigate(['workers']);

        },
        () => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "error occurred...:(",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.workerForm)
    }

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