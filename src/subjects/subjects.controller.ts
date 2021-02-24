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
} from '@nestjs/common';
import { Roles } from 'src/authentication/auth-guard/role.decorator';
import { QueryModel } from 'src/shared/model/query.model';
import { SubjectsService } from './subjects.service';
import { Response } from 'express';
import { SubjectsDto } from './dto/subjects.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectService: SubjectsService) {}

  @Post()
  @Roles('admin', 'institution')
  public async createSubjects(
    @Body() SubjectsInfo: SubjectsDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.subjectService.createSubject(SubjectsInfo);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Subjects Added Successfully', data: response });
  }

  @Get()
  @Roles('admin', 'institution')
  public async getSubjects(
    @Query() query: QueryModel,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.subjectService.getSubjects(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Subjects data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'institution')
  public async getSubjectsById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.subjectService.getSubject(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Subject data', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'institution')
  public async updateSubjects(
    @Param('id') id: string,
    @Body() SubjectsDetails: SubjectsDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.subjectService.updateSubject(
      id,
      SubjectsDetails,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Subjects Updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'institution')
  public async deleteSubjects(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.subjectService.deleteSubject(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Subjects Deleted', data: response });
  }
}
