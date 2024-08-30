import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { log } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: number) {
    const id = Number(userId);
    return this.userService.getUser(id);
  }
}
