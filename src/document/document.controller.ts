import { Roles } from 'src/authentication/auth-guard/role.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryModel } from 'src/shared/model/query.model';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  @Roles('admin', 'teacher', 'institution', 'student')
  public async createDocuments(
    @Res() res: Response,
    @Body() documentInfo: DocumentDto,
  ): Promise<any> {
    const response = await this.documentService.addDocument(documentInfo);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Document Added Successfully', data: response });
  }

  @Get()
  @Roles('admin', 'teacher', 'institution', 'student')
  public async getDocuments(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const response = await this.documentService.getDocuments(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All documents data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher', 'institution', 'student')
  public async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.documentService.getDocument(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'document Data', data: response });
  }

  @Post()
  @Roles('admin', 'teacher', 'institution')
  @UsePipes(ValidationPipe)
  public async createDocument(
    @Body() document: DocumentDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.documentService.addDocument(document);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'document Created', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'teacher', 'institution')
  public async updateDocument(
    @Param('id') id: string,
    @Body() document: DocumentDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.documentService.updateDocument(id, document);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'document updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'teacher', 'institution')
  public async deleteDocument(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.documentService.deleteDocument(id);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'document deleted', data: response });
  }
}
