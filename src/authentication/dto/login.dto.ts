import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LogInDto {
  @ApiProperty()
  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Username cannot be null' })
  public username: string;
}
