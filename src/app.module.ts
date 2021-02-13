import { PasswordEncrypterService } from './authentication/auth-configuration/password-encrypter.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { DocumentModule } from './document/document.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { InstitutionModule } from './institution/institution.module';

@Module({
  imports: [
    AuthenticationModule,
    CourseModule,
    DocumentModule,
    StudentModule,
    TeacherModule,
    InstitutionModule,
  ],
  controllers: [AuthenticationController],
  providers: [PasswordEncrypterService],

})
export class AppModule {}
