import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { DocumentModule } from './document/document.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { InstitutionModule } from './institution/institution.module';

@Module({
  imports: [
    CourseModule,
    DocumentModule,
    StudentModule,
    TeacherModule,
    InstitutionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
