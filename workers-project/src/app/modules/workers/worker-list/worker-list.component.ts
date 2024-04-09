import { Component } from '@angular/core';
import { Worker } from '../models/worker.model';
import { Role } from '../../roles/role.model';
import { WorkerService } from '../worker.service';
import { Router } from '@angular/router';
import { RoleService } from '../../roles/role.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent {
  workers: Worker[];
  filteredWorkers: Worker[];
  roles: Role[];
  selectedRole: string = "All Roles";
  searchWorkerName: string = '';
  searchWorkerId: string = ''
  showLoginError = false;
  showAllWorkers: boolean = false;
  constructor(private datePipe: DatePipe, private _workerService: WorkerService, private _roleService: RoleService, private _router: Router) {

  }
  ngOnInit(): void {
    this._workerService.getWorkers().subscribe((data) => {
      this.workers = data;
      this.filteredWorkers = this.workers.filter(worker => {
        return this.showAllWorkers || worker.status === true;
      });
    });
    this._roleService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  filterActiveWorkers(): void {
    this.filteredWorkers = this.workers.filter(worker => {
      return this.showAllWorkers || worker.status === true;
    });
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  applyFilters(): void {
    this.filteredWorkers = this.workers.filter(worker => {
      const active = worker.status == true;
      const identitystartsWith = worker.identity.startsWith(this.searchWorkerId);
      const matchesName = worker.firstName.toLowerCase().includes(this.searchWorkerName.toLowerCase());
      const matchesRole = this.selectedRole === 'All Roles' || worker.roles.some(role => role.roleName === this.selectedRole);
      return active && identitystartsWith && matchesRole && matchesName;
    });
  }


  showWorkerDetails(workerId: number) {
    if (!this.isLoggedIn()) {
      this.showLoginError = true;
    } else {
      this._router.navigate(['/workers/workerDetails', workerId]);
    }
  }
  addNewWorker() {
    if (!this.isLoggedIn()) {
      this.showLoginError = true;
    } else {
      this._router.navigate(['/workers/add'])
    }
    ;

  }
  editWorker(id: number) {
    if (!this.isLoggedIn()) {
      this.showLoginError = true;
    } else {
      this._router.navigate(['/workers/edit', id])
    };
  }
  deleteWorker(id: number) {
    this._workerService.deleteWorker(id).subscribe(() => {
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
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "deletet worker...",
            showConfirmButton: false,
            timer: 1500
          });
          this._workerService.getWorkers().subscribe((data) => {
            this.workers = data;
            this.filteredWorkers = this.workers.filter(worker => {
              return this.showAllWorkers || worker.status === true;
            });
          });

         }
      });
    }
      ,
      (error) => {
        console.error('Error:', error);
      }
    );

  }

  addNewRole() {

  }
}
