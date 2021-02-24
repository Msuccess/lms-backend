import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserGender } from 'src/shared/enums/gender.enum';
import { UserRole } from 'src/shared/enums/role.enum';

export class CreateStudentDto {
  public readonly userId?: string;

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
  @IsNotEmpty({ message: 'Date Of Birth cannot be null' })
  public dateOfBirth: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Class cannot be null' })
  public userClassId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Gender cannot be null' })
  public gender: UserGender;

  @ApiProperty()
  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: UserRole;
}
