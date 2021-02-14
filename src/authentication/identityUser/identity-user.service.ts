import { InjectRepository } from '@nestjs/typeorm';
import { ResultException } from '../../shared/result';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IdentityUserDto } from '../dto/identity-user.dto';
import { IdentityUserRepository } from './identity-user.repository';

@Injectable()
export class IdentityUserService {
  constructor(
    @InjectRepository(IdentityUserRepository)
    private readonly identityUserRepository: IdentityUserRepository,
  ) {}

  public async getUserByUsername(username: string): Promise<IdentityUserDto> {
    try {
      return await this.identityUserRepository.findOne({ username });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getUserById(id: string): Promise<IdentityUserDto> {
    try {
      return await this.identityUserRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllUser(): Promise<any> {
    try {
      return await this.identityUserRepository.find();
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async createUser(user: IdentityUserDto) {
    try {
      return await this.identityUserRepository.save(user);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteUser(userId: string) {
    try {
      return await this.identityUserRepository.delete(userId);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
