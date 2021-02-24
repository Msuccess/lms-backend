import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CourseDto {
  public courseID?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Title cannot be null' })
  public title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Subject cannot be null' })
  public subject: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description cannot be null' })
  public description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Related Class cannot be null' })
  public relatedClass: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Course cannot be null' })
  public courseUrl: string;
}
