import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = '/api/Roles';

  constructor(private http: HttpClient) {}

  // Fetch all roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // Fetch a role by ID
  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  // Add a new role
  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  // Update an existing role
  updateRole(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, role);
  }


}
