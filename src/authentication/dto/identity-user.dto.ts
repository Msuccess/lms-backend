import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { UserRole } from 'src/shared/enums/role.enum';

export class IdentityUserDto {
  public id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be null' })
  public username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name cannot be null' })
  public fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  public phoneNumber: string;

  @ApiProperty()
  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  public role: UserRole;
}
