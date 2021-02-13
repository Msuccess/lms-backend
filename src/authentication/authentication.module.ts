import { SharedModule } from './../shared/shared.module';
import { PasswordEncrypterService } from './auth-configuration/password-encrypter.service';
import { EXPIRESIN, SECRET } from './../config/config';
import { InstitutionModule } from './../institution/institution.module';
import { StudentModule } from './../student/student.module';
import { AuthenticationService } from './authentication.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth-configuration/jwt.strategy';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    StudentModule,
    InstitutionModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || SECRET,
      signOptions: { expiresIn: EXPIRESIN },
    }),
    SharedModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PasswordEncrypterService, JwtStrategy],
  exports: [PassportModule, AuthenticationService, PasswordEncrypterService],
})
export class AuthenticationModule {}
