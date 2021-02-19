import { CourseDto } from './dto/course.dto';
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
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @Roles('admin', 'teacher', 'institution', 'student')
  public async getCourses(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const response = await this.courseService.getCourses(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Courses data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher', 'institution', 'student')
  public async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.courseService.getCourse(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Course Data', data: response });
  }

  @Post()
  @Roles('admin', 'teacher', 'institution')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() course: CourseDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.courseService.addCourse(course);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Course Created', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'teacher', 'institution')
  public async update(
    @Param('id') id: string,
    @Body() course: CourseDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.courseService.updateCourse(id, course);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Course updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'teacher', 'institution')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.courseService.deleteCourse(id);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Course deleted', data: response });
  }
}
