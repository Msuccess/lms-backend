import { IdentityUserRepository } from './../authentication/identityUser/identity-user.repository';
import { IdentityUserService } from '../authentication/identityUser/identity-user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityUserRepository])],
  controllers: [],
  providers: [IdentityUserService],
  exports: [IdentityUserService],
})
export class SharedModule {}
