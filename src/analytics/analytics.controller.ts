import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/authentication/auth-guard/role.decorator';
import { RoleGuard } from 'src/authentication/auth-guard/role.guard';
import { AnalyticsService } from './analytics.service';
import { User } from 'src/authentication/auth-guard/current-user.decorator';

@Controller('analytics')
@ApiTags('Analytics')
@UseGuards(AuthGuard(), RoleGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/all')
  @Roles('admin')
  public async getTotalCourses(@Res() res: Response, @User() user: any) {
    const response = await this.analyticsService.totalNumberCourses(user.id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Total Number of Courses', data: response });
  }
}
