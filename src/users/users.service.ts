import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/middleware/prisma.service';
// import { supabase } from 'src/supabase/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}
  async getUser(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        userMovies: true,
      },
    });

    // should this call supabase to get the email and identity of the user?
    // const { data, error } = await supabase().auth.getUser(token);

    // if (!user) {
    //   this.prisma.user.create({
    //     data: {
    //       email:
    //       },
    //   });
    return { status: 'Ok' };
  }
}
