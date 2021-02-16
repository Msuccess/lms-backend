import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserClassDto {
  public readonly classId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Class name cannot be null' })
  public className: string;
}
