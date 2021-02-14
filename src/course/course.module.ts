import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { MetamorphosisModule } from '@fabio.formosa/metamorphosis-nest';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseRepository]),
    MetamorphosisModule.register(),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
