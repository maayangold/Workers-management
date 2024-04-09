import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Worker } from "./models/worker.model";

import { WorkerRole } from "./models/workerRole.model"
@Injectable()
export class WorkerService {
    getWorkers(): Observable<Worker[]> {
        return this._http.get<Worker[]>("/api/Workers")
    }
    getWorkerById(id: number): Observable<Worker> {
        return this._http.get<Worker>("/api/Workers/" + id);
    }
    addWorker(newWorker: Worker): Observable<Worker> {
        return this._http.post<Worker>("/api/Workers", newWorker);
    }
    updateWorker(id: number, Worker: Worker): Observable<Worker> {
        return this._http.put<Worker>(`/api/Workers/${id}`, Worker);
    }
    changeWorkerStatus(id: number): Observable<boolean> {
        return this._http.put<boolean>(`/api/Workers/${id}/status`, null);
    }

    login(userName: string, password: string): Observable<string> {
        const loginModel = { userName, password }; 
        
        return this._http.post<string>('/api/Auth', loginModel);
    }
    addRoleToWorker(workerId: number, roleToWorker:WorkerRole): Observable<Worker> {
        return this._http.post<Worker>(`/api/Workers/${workerId}/Role`, roleToWorker);
    }

    deleteRoleFromWorker(workerId: number, roleId: number): Observable<boolean> {
        return this._http.delete<boolean>(`/api/Workers/${workerId}/${roleId}`);
    }
    constructor(private _http: HttpClient) {
        //  http://localhost:51028/api/Workers
    }
}