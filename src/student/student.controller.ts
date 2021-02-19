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
import { StudentService } from './student.service';
import { Response } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  @Roles('admin', 'teacher', 'institution')
  public async getStudent(
    @Query() query: QueryModel,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.studentService.getStudents(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Students data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher', 'institution')
  public async getStudentById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.studentService.getStudent(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Student data', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'institution', 'student')
  public async updateStudent(
    @Param('id') id: string,
    @Body() studentDetails: CreateStudentDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.studentService.updateStudent(
      id,
      studentDetails,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Student Updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'institution')
  public async deleteStudent(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.studentService.deleteStudent(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Student Deleted', data: response });
  }
}
