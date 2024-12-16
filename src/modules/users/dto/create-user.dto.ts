export class CreateUserDto {
  
  username: string;
  password: string;
  email: string;
  tenantId?: number;
  
  toMap(): any {
    return {
      username: this.username,
      password: this.password,
      email: this.email,
      tenantId: this.tenantId
    };
  }
}
