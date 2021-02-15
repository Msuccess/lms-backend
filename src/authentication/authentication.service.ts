import { StudentService } from './../student/student.service';
import { UserRole } from './../shared/enums/role.enum';
import { InstitutionService } from './../institution/institution.service';
import { TeacherService } from './../teacher/teacher.service';
import { ResultException } from './../shared/result';
import { EXPIRESIN } from './../config/config';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordEncrypterService } from './auth-configuration/password-encrypter.service';
import { RegisterDto } from './dto/register.dto';
import { IdentityUserService } from './identityUser/identity-user.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
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

      const harshedPassword = (
        await this.passwordEncryptedService.encrypt(data.password)
      ).toString();

      const user = { ...data, password: harshedPassword };

      const userObject = await this.removeUnusedFields(
        [
          'email',
          'fullName',
          'phoneNumber',
          'dateOfBirth',
          'userClass',
          'gender',
          'userId',
        ],
        user,
      );

      switch (data.role.toLowerCase()) {
        case 'teacher':
          const teacherDetails = { ...userObject, role: UserRole.TEACHER };

          const createNewUserTeacher = await this.identityUserService.createUser(
            teacherDetails,
          );

          if (
            typeof createNewUserTeacher === 'object' &&
            createNewUserTeacher !== null
          ) {
            const getUserDetails = await this.getUserData(data);

            const teacherObject = await this.removeUnusedFields(
              ['username', 'password', 'role', 'userClass'],
              getUserDetails,
            );

            teacherObject.userId = createNewUserTeacher.id;

            const createNewTeacher = this.teacherService.createTeacher(
              teacherObject,
            );
            if (
              typeof createNewTeacher === 'object' &&
              createNewTeacher === null
            ) {
              return this.identityUserService.deleteUser(
                createNewUserTeacher.id,
              );
            }

            return createNewTeacher;
          }

        case 'institution':
          const institutionDetails = {
            ...userObject,
            role: UserRole.TEACHER,
          };
          const createNewUserInstitution = await this.identityUserService.createUser(
            institutionDetails,
          );

          Logger.log('This is the insitution userObject');
          Logger.log(userObject);

          if (
            typeof createNewUserInstitution === 'object' &&
            createNewUserInstitution !== null
          ) {
            const getUserDetails = await this.getUserData(data);

            Logger.log('This is the getUser Data');
            Logger.log(getUserDetails);

            const institutionObject = await this.removeUnusedFields(
              [
                'username',
                'password',
                'role',
                'userClass',
                'dateOfBirth',
                'gender',
              ],
              getUserDetails,
            );
            institutionObject.userId = createNewUserInstitution.id;

            Logger.log(
              'This is the insitution userObject after removing others',
            );
            Logger.log(institutionObject);

            const createNewTeacher = this.institutionService.createInstitution(
              institutionObject,
            );
            if (
              typeof createNewTeacher === 'object' &&
              createNewTeacher === null
            ) {
              return this.identityUserService.deleteUser(
                createNewUserInstitution.id,
              );
            }

            return createNewTeacher;
          }

        case 'student':
          const studentDetails = {
            ...userObject,
            role: UserRole.STUDENT,
          };
          const createNewUserStudent = await this.identityUserService.createUser(
            studentDetails,
          );

          if (
            typeof createNewUserStudent === 'object' &&
            createNewUserStudent !== null
          ) {
            const getUserDetails = await this.getUserData(data);

            const studentObject = await this.removeUnusedFields(
              ['username', 'password', 'role'],
              getUserDetails,
            );

            studentObject.userId = createNewUserStudent.id;

            const createNewStudent = this.studentService.createStudent(
              studentObject,
            );
            if (
              typeof createNewStudent === 'object' &&
              createNewStudent === null
            ) {
              return this.identityUserService.deleteUser(
                createNewUserStudent.id,
              );
            }

            return createNewStudent;
          }

        case 'admin':
        // return await this.registerUser(user, UserRole.ADMIN);
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

  public async removeUnusedFields(
    deleteParameters: string[],
    data: RegisterDto,
  ) {
    deleteParameters.forEach(function (i) {
      delete data[i];
    });

    return data;
  }

  public async getUserData(data: RegisterDto) {
    const userData = data;
    return userData;
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
}
