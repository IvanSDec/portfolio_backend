import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id') 
  // async findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);  
  // }

  @Post()
  async create(@Body() body: { email: string; name: string; password: string }) {
    return this.usersService.create(body);
  }

}