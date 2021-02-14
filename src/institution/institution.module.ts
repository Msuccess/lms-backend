import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionController } from './institution.controller';
import { InstitutionRepository } from './institution.repository';
import { InstitutionService } from './institution.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstitutionRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    SharedModule,
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports:[InstitutionService]
})
export class InstitutionModule {}
