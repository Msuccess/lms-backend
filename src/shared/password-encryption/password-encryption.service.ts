import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncryptionService {
  async harshPassword(
    plainPassword: String,
    callback?: Function,
  ): Promise<string> {
    try {
      const generatedSalt = await bcrypt.genSalt(12);
      const generatedHash = await bcrypt.hash(plainPassword, generatedSalt);
      return generatedHash;
    } catch (error) {
      Logger.log(`Hashed password Error ${error}`);
      throw new InternalServerErrorException('Sorry, Unable to Hash Password');
    }
  }

  async compare(
    plainPassword: string,
    encryptedPassword: string,
    callback?: Function,
  ) {
    try {
      return await bcrypt.compare(plainPassword, encryptedPassword, callback);
    } catch (error) {
      Logger.log(`Hashed password Error ${error}`);
      throw new InternalServerErrorException('Sorry, Password Incorrect');
    }
  }
}
