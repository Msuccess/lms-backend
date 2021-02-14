import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Roles } from 'src/authentication/auth-guard/role.decorator';
import { QueryModel } from 'src/shared/model/query.model';
import { TeacherService } from './teacher.service';
import { Response } from 'express';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  @Roles('admin')
  public async getTeacher(
    @Query() query: QueryModel,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.teacherService.getTeachers(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Teachers data', data: response });
  }

  @Get('/:id')
  @Roles('admin')
  public async getTeacherById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.teacherService.getTeacher(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Teacher data', data: response });
  }

  @Put('/:id')
  // @Roles('admin')
  public async updateTeacher(
    @Param('id') id: string,
    @Body() TeacherDetails: CreateTeacherDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.teacherService.updateTeacher(
      id,
      TeacherDetails,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Teacher Updated', data: response });
  }

  @Delete('/:id')
  // @Roles('admin')
  public async deleteTeacher(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.teacherService.deleteTeacher(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Teacher Deleted', data: response });
  }
}
