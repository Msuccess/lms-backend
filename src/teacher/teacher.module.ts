import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    SharedModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService]
})
export class TeacherModule {}
