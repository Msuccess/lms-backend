import { Module } from '@nestjs/common';
import { UsersClassController } from './users-class.controller';
import { UsersClassService } from './users-class.service';

@Module({
  controllers: [UsersClassController],
  providers: [UsersClassService],
})
export class UsersClassModule {}
