import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEncryptionService } from 'src/shared/password-encryption/password-encryption.service';
import { InstitutionController } from './institution.controller';
import { InstitutionRepository } from './institution.repository';
import { InstitutionService } from './institution.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionRepository])],
  controllers: [InstitutionController],
  providers: [InstitutionService, PasswordEncryptionService],
})
export class InstitutionModule {}
