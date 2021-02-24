import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SubjectsDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Subject class cannot be null' })
  public subjectName: string;
}
