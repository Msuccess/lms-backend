import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DocumentDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title cannot be null' })
  public title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Subject cannot be null' })
  public subject: any;

  @ApiProperty()
  @IsNotEmpty({ message: 'Related Class cannot be null' })
  public userClass: any;

  @ApiProperty()
  @IsNotEmpty({ message: 'Document cannot be null' })
  public documentUrl: string;
}
