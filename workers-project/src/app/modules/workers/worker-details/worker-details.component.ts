import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import { RoleService } from '../../roles/role.service';
import Swal from 'sweetalert2';
import { Worker } from '../models/worker.model';

@Component({
  selector: 'worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['../../../card-style.scss']
})
export class WorkerDetailsComponent {
  worker:Worker;
  Gender
  constructor(private _route: ActivatedRoute, private _workerService: WorkerService, private _roleService: RoleService, private _router: Router) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
     const workerId = +params['id'];
      if (workerId) {
        this._workerService.getWorkerById(workerId).subscribe(
          (data) => {
            this.worker = data;          
          },
          () => {
            Swal.fire({ icon: "error", title: "Error...", text: "There is no Course with such an id number" });
            this._router.navigate(['/workers']);
          }
        );
      }
    });
  }
}
