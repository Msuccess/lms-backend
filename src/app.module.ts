import { AnalyticsModule } from './analytics/analytics.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { DocumentModule } from './document/document.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { InstitutionModule } from './institution/institution.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UsersClassModule } from './users-class/users-class.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    AnalyticsModule,
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
    MulterModule.register({
      dest: './uploads',
    }),
    CourseModule,
    DocumentModule,
    StudentModule,
    TeacherModule,
    InstitutionModule,
    UsersClassModule,
    AuthenticationModule,
    SubjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
