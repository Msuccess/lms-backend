import { UserGender } from './../../shared/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/shared/enums/role.enum';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username cannot be null' })
  public username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password cannot be null' })
  public password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Full Name cannot be null' })
  public fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email Class cannot be null' })
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone Number cannot be null' })
  public phoneNumber: string;

  @ApiProperty()
  public dateOfBirth?: string;

  @ApiProperty()
  public userClass?: string;

  @ApiProperty()
  public gender?: UserGender;

  @ApiProperty()
  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: UserRole;
}
