import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import Swal from 'sweetalert2';
import { Role } from '../role.model';

@Component({
  selector: 'add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['../../../card-style.scss']
})
export class AddRoleComponent {
  roleForm: FormGroup;
  roles:Role[]
  constructor(private _roleService:RoleService,private _router: Router) { }

  ngOnInit(): void {

    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      managerial: new FormControl(false, [Validators.required])
    });

    this._roleService.getAllRoles().subscribe((data) => {
      this.roles = data;
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
  updateRole(roleId:number){
    this._router.navigate([`/roles/edit/${roleId}`])
  }

  saveRole() {
    if (this.roleForm.valid) {
      const newRole = this.roleForm.value;
      this._roleService.addRole(newRole).subscribe(
        () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added role to ${newRole.name}`,
            showConfirmButton: false,
            timer: 1500,
          });

          this._roleService.getAllRoles().subscribe((data) => {
            this.roles = data;
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
}
