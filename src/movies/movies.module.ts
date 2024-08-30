import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/middleware/prisma.service';

@Module({
    imports: [HttpModule],
    controllers: [MoviesController],
    providers: [MoviesService, PrismaService],
})
export class MoviesModule { }
