import { SharedModule } from './../shared/shared.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    SharedModule,
    forwardRef(() => AuthenticationModule),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
