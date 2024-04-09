import { Role } from "../../roles/role.model";
import { WorkerRole } from "./workerRole.model";

export enum Gender {
  Male = 1,
  Female = 2,

}
export class Worker {

  id: number
  firstName: string;
  lastName: string;
  identity: string;
  startOfWork: Date;
  birthdate: Date;
  gender: Gender;
  roles: WorkerRole[] = [];
  status: boolean;
}