import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DocumentDto {
  public readonly documentID: string;

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
  public relatedClass: [];

  @ApiProperty()
  @IsNotEmpty({ message: 'Document cannot be null' })
  public doucmentUrl: string;
}
