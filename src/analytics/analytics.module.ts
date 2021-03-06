import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Module } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { UsersClassModule } from 'src/users-class/users-class.module';
import { DocumentModule } from 'src/document/document.module';
import { InstitutionModule } from 'src/institution/institution.module';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    // CourseModule,
    // UsersClassModule,
    // DocumentModule,
    // InstitutionModule,
    // TeacherModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
