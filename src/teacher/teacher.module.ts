import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
