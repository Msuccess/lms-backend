import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { IdentityUserModule } from 'src/authentication/identityUser/identity-user.module';

@Module({
  imports: [IdentityUserModule],
  controllers: [UploadController],
  providers: [],
  exports: [],
})
export class SharedModule {}
