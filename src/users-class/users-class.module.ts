import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClassRepository } from './user-class.repository';
import { UsersClassController } from './users-class.controller';
import { UsersClassService } from './users-class.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserClassRepository])],
  controllers: [UsersClassController],
  providers: [UsersClassService],
  exports: [UsersClassService],
})
export class UsersClassModule {}
