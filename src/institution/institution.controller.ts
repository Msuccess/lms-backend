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
import { Roles } from 'src/authentication/auth-guard/role.decorator';
import { QueryModel } from 'src/shared/model/query.model';
import { InstitutionDto } from './dto/institution.dto';
import { InstitutionService } from './institution.service';
import { Response } from 'express';

@Controller('institution')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Get()
  @Roles('admin')
  public async getInstitutions(
    @Query() query: QueryModel,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.institutionService.getInstitutions(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Institution data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'patient', 'doctor')
  public async getInstitutionById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.institutionService.getInstitution(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Institution data', data: response });
  }

  @Post()
  // @Roles('admin')
  public async create(
    @Body() institutionDetails: InstitutionDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.institutionService.addInstitution(
      institutionDetails,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Institution Created', data: response });
  }

  @Put('/:id')
  // @Roles('admin')
  public async update(
    @Param('id') id: string,
    @Body() institutionDetails: InstitutionDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.institutionService.updateInstitution(
      id,
      institutionDetails,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Institution Updated', data: response });
  }

  @Delete('/:id')
  // @Roles('admin')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.institutionService.deleteInstitution(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Institution Deleted', data: response });
  }
}
