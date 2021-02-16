import { StudentService } from './../student/student.service';
import { UserRole } from './../shared/enums/role.enum';
import { CreateInstitutionDto } from './../institution/dto/create-institution.dto';
import { InstitutionService } from './../institution/institution.service';
import { TeacherService } from './../teacher/teacher.service';
import { CreateTeacherDto } from './../teacher/dto/create-teacher.dto';
import { ResultException } from './../shared/result';
import { EXPIRESIN } from './../config/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordEncrypterService } from './auth-configuration/password-encrypter.service';
import { RegisterDto } from './dto/register.dto';
import { IdentityUserDto } from './dto/identity-user.dto';
import { IdentityUserService } from './identityUser/identity-user.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly passwordEncryptedService: PasswordEncrypterService,
    private readonly jwtService: JwtService,
    private readonly teacherService: TeacherService,
    private readonly institutionService: InstitutionService,
    private readonly studentService: StudentService,
    private readonly identityUserService: IdentityUserService,
  ) {}

  public async register(data: RegisterDto): Promise<any> {
    try {
      const dbUser = await this.validateUser(data.username);

      if (typeof dbUser === 'object' && dbUser !== null) {
        throw new HttpException(
          { message: 'Username already exit' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = (
        await this.passwordEncryptedService.encrypt(data.password)
      ).toString();

      const user = { ...data, password: hashedPassword };

      switch (data.role.toLowerCase()) {
        case 'teacher':
          const userTeacherDb = await this.registerUser(user, UserRole.TEACHER);

          if (typeof userTeacherDb === 'object' && userTeacherDb !== null) {
            return this.registerTeacher(data, userTeacherDb);
          }
          return userTeacherDb;

        case 'institution':
          const userInstitutionDb = await this.registerUser(
            user,
            UserRole.INSTITUTION,
          );

          if (
            typeof userInstitutionDb === 'object' &&
            userInstitutionDb !== null
          ) {
            return this.registerInstitution(data, userInstitutionDb);
          }
          return userInstitutionDb;

        case 'student':
          const userStudentDb = await this.registerUser(user, UserRole.STUDENT);

          if (typeof userStudentDb === 'object' && userStudentDb !== null) {
            return this.registerStudent(data, userStudentDb);
          }
          return userStudentDb;

        case 'admin':
          return await this.registerUser(user, UserRole.ADMIN);
        default:
          return new ResultException(
            'Role not allowed',
            HttpStatus.BAD_REQUEST,
          );
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async signIn(user: LogInDto): Promise<any> {
    try {
      const dbUser = await this.identityUserService.getUserByUsername(
        user.username,
      );

      if (!dbUser || Object.keys(dbUser).length === 0) {
        return new ResultException('Wrong credentials', HttpStatus.BAD_REQUEST);
      }

      const verifyPassword = await this.passwordEncryptedService.decrypt(
        user.password,
        dbUser.password,
      );

      if (verifyPassword) {
        const token = await this.createToken(
          dbUser.id,
          dbUser.username,
          dbUser.role,
        );
        delete dbUser.password;
        return { token, dbUser };
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async validateUser(username: string): Promise<any> {
    try {
      return await this.identityUserService.getUserByUsername(username);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private async createToken(id: string, email: string, role: UserRole) {
    const expiresIn = EXPIRESIN;
    const user = { id: id, email: email, role: role };
    const token = this.jwtService.sign(user);
    return { expiresIn: expiresIn, token };
  }

  private verifyToken(token: string): any {
    this.jwtService.verify(token);
  }

  private async registerUser(user: IdentityUserDto, role: UserRole) {
    user.role = role;
    const userDb = await this.identityUserService.createUser(user);
    return userDb;
  }

  private registerTeacher(data: RegisterDto, userDb: IdentityUserDto) {
    const teacher: CreateTeacherDto = {
      dateOfBirth: data.dateOfBirth,
      username: data.username,
      fullName: data.fullName,
      password: userDb.password,
      phoneNumber: data.phoneNumber,
      email: data.email,
      gender: data.gender,
      role: UserRole.TEACHER,
      userClass: data.userClass,
      userId: userDb.id,
    };

    const teacherDb = this.teacherService.createTeacher(teacher);
    if (typeof teacherDb === 'object' && teacherDb === null) {
      return this.identityUserService.deleteUser(userDb.id);
    }
    return teacherDb;
  }

  private registerInstitution(data: RegisterDto, userDb: IdentityUserDto): any {
    const institution: CreateInstitutionDto = {
      username: data.username,
      fullName: data.fullName,
      password: userDb.password,
      phoneNumber: data.phoneNumber,
      email: data.email,
      role: UserRole.INSTITUTION,
      userId: userDb.id,
    };

    const institutionDb = this.institutionService.createInstitution(
      institution,
    );
    if (typeof institutionDb === 'object' && institutionDb === null) {
      return this.identityUserService.deleteUser(userDb.id);
    }
    return institutionDb;
  }

  private registerStudent(data: RegisterDto, userDb: IdentityUserDto): any {
    const student: CreateStudentDto = {
      username: data.username,
      fullName: data.fullName,
      password: userDb.password,
      phoneNumber: data.phoneNumber,
      role: UserRole.STUDENT,
      userId: userDb.id,
      userClass: data.userClass,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      gender: data.gender,
    };

    const studentDb = this.studentService.createStudent(student);
    if (typeof studentDb === 'object' && studentDb === null) {
      return this.identityUserService.deleteUser(userDb.id);
    }
    return studentDb;
  }
}
