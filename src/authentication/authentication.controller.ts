import { ValidatorPipe } from './../shared/pipes/validator.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { Roles } from './auth-guard/role.decorator';
import { RegisterDto } from './dto/register.dto';
import { IdentityUserService } from './identityUser/identity-user.service';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/login.dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private identityUserService: IdentityUserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidatorPipe())
  public async register(@Body() user: RegisterDto, @Res() res: Response) {
    const response = await this.authService.register(user);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Registration Successful', data: response });
  }

  @Post('login')
  @UsePipes(new ValidatorPipe())
  public async loginUser(@Body() user: LogInDto, @Res() res: Response) {
    const response = await this.authService.signIn(user);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Login Successfully', data: response });
  }

  @Get('users')
  @Roles('admin')
  public async getUsers(@Res() res: Response): Promise<any> {
    const response = await this.identityUserService.getAllUser();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Identity  Users', data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.identityUserService.deleteUser(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User deleted', data: response });
  }

  @Get('/:id')
  @Roles('admin')
  public async getUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.identityUserService.getUserById(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User', data: response });
  }
}
