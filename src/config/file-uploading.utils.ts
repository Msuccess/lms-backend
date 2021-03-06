import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';

export const imageFileFilter = (
  req: any,
  file: { originalname: string },
  callback: (arg0: HttpException, arg1: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(mp4|flv|mkv|gif|mov|avi|webm|f4v|swf)$/)) {
    return callback(
      new HttpException(
        'Only Videos files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const docFileFilter = (
  req: any,
  file: { originalname: string },
  callback: (arg0: HttpException, arg1: boolean) => void,
) => {
  if (!file.originalname.match(/\.(doc|docx|pdf|xls|xlsx|ppt|pptx|txt|odx)$/)) {
    return callback(
      new HttpException(
        'Only documents files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');
  callback(null, `${name}${randomName}${fileExtName}`);
};
