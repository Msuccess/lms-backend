import { IdentityUserService } from './authentication/identityUser/identityuser.service';
import { PasswordEncrypterService } from './authentication/auth-configuration/password-encrypter.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { DocumentModule } from './document/document.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { InstitutionModule } from './institution/institution.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthenticationModule,
    CourseModule,
    DocumentModule,
    StudentModule,
    TeacherModule,
    InstitutionModule,
  ],
  controllers: [AuthenticationController],
  providers: [IdentityUserService, PasswordEncrypterService],
})
export class AppModule {}
