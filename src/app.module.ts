import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import path from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationMiddleware } from './middleware/authorization';
import { MoviesModule } from './movies/movies.module';

const envFilePath = path.join(path.dirname(__dirname), '../.env');
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes('*');
  }
}