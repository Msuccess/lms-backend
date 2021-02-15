import { Module } from '@nestjs/common';
import { IdentityUserRepository } from './identity-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityUserService } from './identity-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityUserRepository])],
  providers: [IdentityUserService],
  exports: [IdentityUserService],
})
export class IdentityUserModule {}
