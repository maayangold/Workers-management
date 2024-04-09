import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RoleService } from '../role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../role.model';

@Component({
  selector: 'edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['../../../card-style.scss',]
})
export class EditRoleComponent {
  roleForm: FormGroup;
  role: Role;
  roleId: number;

  constructor(private _roleService: RoleService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.roleId = +params['id'];
      if (this.roleId) {
        this._roleService.getRoleById(this.roleId).subscribe(
          (data) => {
            this.role = data;
            console.log( this.role)
            this.fullForm(data);
          },
          () => {
            Swal.fire({ icon: "error", title: "Error...", text: "There is no role with such an id number" });
            this._router.navigate(['/roles']);
          }
        );
      }
    });
  }
  fullForm(value: Role) {
    this.roleForm = new FormGroup({
      name: new FormControl(value.name, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      managerial: new FormControl(value.managerial, [Validators.required])
    });
  }

  saveRole() {

    if (this.roleForm.valid) {
      this.role.id = this.roleId;
      this.role.name = this.roleForm.get('name').value;
      this.role.managerial = this.roleForm.get('managerial').value;

      this._roleService.updateRole(this.roleId, this.role).subscribe(
        () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added role to ${this.role.name}`,
            showConfirmButton: false,
            timer: 1500,
          });

          this._router.navigate(['roles']);

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
      this.markFormGroupTouched(this.roleForm)
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