export enum Role {
    Secretary=1, 
    Teacher=2,
     Manager=3, 
     Supervisor=4

}
export class Job {
    role:Role;
    managerial:boolean;
    startOfJob:Date;

}
  