import { AuthenticationService } from './authentication.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './auth-main-user/main-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
