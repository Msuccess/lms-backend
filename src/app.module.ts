import { PasswordEncrypterService } from './authentication/auth-configuration/password-encrypter.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [AuthenticationController, AppController],
  providers: [PasswordEncrypterService, AppService],
})
export class AppModule {}
