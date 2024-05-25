import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  users:any[]=[
    {
      id:1,
      name:"John Doe",
      salary:30000
    },
    {
      id:2,
      name:"Jane Smith",
      salary:45000
    }
  ]
  getHello(): string {
    return 'Hello World!';
  }
  getArray():any[]{
    return  this.users;
  }

}
