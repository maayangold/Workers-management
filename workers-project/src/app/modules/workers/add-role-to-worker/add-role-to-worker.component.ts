import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker } from '../models/worker.model';
import { Role } from '../../roles/role.model';
import { WorkerService } from '../worker.service';
import { RoleService } from '../../roles/role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-role-to-worker',
  templateUrl: './add-role-to-worker.component.html',
  styleUrls: ['../../../card-style.scss',]
})
export class AddRoleToWorkerComponent implements OnInit {
  worker: Worker;
  roles: Role[];
  isExsistWorker: boolean = false; 
  workerId: number;
  roleForm: FormGroup;
  goToeEdit: boolean;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _workerService: WorkerService,
    private _roleService: RoleService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this._route.paramMap.subscribe(paramMap => {
      if (paramMap.has('worker')) {
        const workerJson = decodeURIComponent(paramMap.get('worker') ?? '');
        this.worker = JSON.parse(workerJson) as Worker;
      } else {
        console.log("No worker parameter found in route");
      }
    });
    if (this.worker && this.worker.id !== undefined && this.worker.id !== null) {
      this.isExsistWorker = true;
      this.workerId = this.worker.id;
      this.goToeEdit = true;
    }
    else {
      this.goToeEdit = false
    }
    this._roleService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });

    this.roleForm = new FormGroup({
      roleId: new FormControl('', Validators.required),
      startRoleDate: new FormControl(today.toISOString().substring(0, 10), [Validators.required]),
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

  onSaveWorker() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `worker ${this.worker.id} :${this.worker.firstName}  has been saved`,
      showConfirmButton: false,
      timer: 1500
    });
    if (this.roleForm.valid) {
      const roleToWorker = this.roleForm.value;
      this.worker.roles.push(roleToWorker);
      this._workerService.addWorker(this.worker).subscribe(
        (response) => {
          this.workerId = response.id;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.isExsistWorker = true;
         
        },
        (err) => {
          Swal.fire({
            position: "center",

            timer: 3000,
            icon: "error",
            title: "error in the details",
            text: "fill the form again,notice that worker must be 18 years old...",
          });
          console.log(err);
          this._router.navigate(['/workers/add']);

        }
      );

    } else {

      this.markFormGroupTouched(this.roleForm);
    }
  }

  addRoleToExistingWorker() { 
    if (this.roleForm.valid) {
      const roleToWorker = this.roleForm.value;
      this._workerService.addRoleToWorker(this.workerId, roleToWorker).subscribe(
        () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added role to ${this.worker.firstName}`,
            showConfirmButton: false,
            timer: 1500,
          });


        },
        (err) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Exsisting Role...",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.roleForm);
    }
  }
  onFinish() {
    if (this.goToeEdit === true)
      this._router.navigate(['/workers/edit/' + this.workerId]);
    else
      this._router.navigate(['/workers']);

  }
  onCancel() {
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "cancle...",
      showConfirmButton: false,
      timer: 2000
    });
  }
}
