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
import { TeacherService } from './teacher.service';
import { Response } from 'express';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Controller('teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private authService: AuthenticationService,
  ) {}

  @Post()
  @Roles('admin', 'institution')
  public async createTeacher(
    @Body() teacherInfo: CreateTeacherDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.authService.register(teacherInfo);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Teacher Added Successfully', data: response });
  }

  @Get()
  @Roles('admin', 'institution')
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
  @Roles('admin', 'institution')
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
  @Roles('admin', 'institution')
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
  @Roles('admin', 'institution')
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
