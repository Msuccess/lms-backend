import { IdentityUserRepository } from './../authentication/identityUser/identity-user.repository';
import { IdentityUserService } from './../authentication/identityUser/identityuser.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityUserRepository])],
  controllers: [UploadController],
  providers: [IdentityUserService],
  exports: [IdentityUserService, UploadController],
})
export class SharedModule {}
