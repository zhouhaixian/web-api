import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      process.env['DATABASE'] || 'mongodb://localhost:27017/web-api',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
