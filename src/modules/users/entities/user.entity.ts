export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  salt: string;
  createdTime: Date;
  updatedTime: Date;
  deletedTime?: Date;
  status: number;
  tenantId?: number;

  static fromJson(json: any): User {
    const user = new User();
    user.id = json.id;
    user.username = json.username;
    user.email = json.email;
    user.password = json.password;
    user.createdTime = new Date(json.createdTime);
    user.updatedTime = new Date(json.updatedTime);
    user.status = json.status;
    user.salt = json.salt;
    if (json.deletedTime) {
        user.deletedTime = new Date(json.deletedTime);
    }
    if (json.tenantId) {
        user.tenantId = json.tenantId;
    }
    
    return user;
  }

  payload(): any  {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      status: this.status,
      tenantId: this.tenantId,
    };
  }

  
}
