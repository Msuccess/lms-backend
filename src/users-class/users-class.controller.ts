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
import { UsersClassService } from './users-class.service';
import { Response } from 'express';
import { UserClassDto } from './dto/user-class.dto';

@Controller('users-class')
export class UsersClassController {
  constructor(private userClassService: UsersClassService) {}

  @Post()
  @Roles('admin', 'institution')
  public async addClass(
    @Body() classInfo: UserClassDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.userClassService.createClass(classInfo);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Class Added successfully', data: response });
  }

  @Get()
  @Roles('admin', 'institution')
  public async getClass(
    @Query() query: QueryModel,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.userClassService.getClasses(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Classs data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'institution')
  public async getClassById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.userClassService.getClass(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Class data', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'institution')
  public async updateClass(
    @Param('id') id: string,
    @Body() ClassDetails: UserClassDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.userClassService.updateClass(id, ClassDetails);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Class Updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'institution')
  public async deleteClass(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.userClassService.deleteClass(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Class Deleted', data: response });
  }
}
