import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/shared/enums/role.enum';

export class InstitutionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username cannot be null' })
  public username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password cannot be null' })
  public password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Full Name cannot be null' })
  public fullname: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone Number cannot be null' })
  public phoneNumber: string;
}
