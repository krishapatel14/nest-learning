import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/users")
  getArray():any[]{
    return this.appService.getArray();
  }

  @Post("/users")
  addUser(@Req() req,@Res() res):any[]{
    let user=req.body;
    console.log(user);
    this.appService.users.push(user);

    return res.status(200).json({
      message:"user added successfully",
      data:this.appService.getArray()
    })
  }
    
    @Get("/users/:id")
    getUserById( @Req() req,@Res() res){
        let  id = req.params.id;
        return res.status(200).json({
          message : "successfully got the user by id",
          data : this.appService.users.find(user=>user.id==id)
        })
    }

    @Get("/users/salary/:salary")
    getUserBySalary(@Req()  req , @Res() res ) {
      let salary = req.params.salary;
      console.log(salary);
      return res.status(200).json({
        message : 'Successfuly got users with given salary',
        data:this.appService.users.find(user=>user.salary>salary)

      });

    }
  }
 

