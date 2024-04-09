export class WorkerRole {
    id: number;
    roleId: number;
    roleName:string
    startRoleDate: Date;
    constructor( roleId: number,  startRoleDate: Date) {
      this.roleId=roleId;
      this.startRoleDate=startRoleDate
    }

  }