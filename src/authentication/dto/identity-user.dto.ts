import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { UserRole } from 'src/shared/enums/role.enum';

export class IdentityUserDto {
  public id?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Username cannot be null' })
  public username: string;

  @ApiProperty()
  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  @ApiProperty()
  @Length(8)
  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: UserRole;
}
