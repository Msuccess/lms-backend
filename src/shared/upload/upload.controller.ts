import {
  editFileName,
  imageFileFilter,
  videoFileFilter,
} from './../../config/file-uploading.utils';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  // upload single file
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadedFile(@UploadedFile() file: any) {
    const response = {
      originalName: file.originalName,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @Post('/course')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/course',
        filename: editFileName,
      }),
      fileFilter: videoFileFilter,
    }),
  )
  public async uploadedCourse(@UploadedFile() file: any) {
    const response = {
      originalName: file.originalName,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @Post('/document')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/document',
        filename: editFileName,
      }),
      fileFilter: videoFileFilter,
    }),
  )
  public async uploadedDocument(@UploadedFile() file: any) {
    const response = {
      originalName: file.originalName,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }

  @Post('uploadMultipleFiles')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadMultipleFiles(@UploadedFiles() files: any) {
    const response = [];
    files.forEach((file: { originalName: any; filename: any }) => {
      const fileResponse = {
        originalName: file.originalName,
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  @Get(':filename')
  public getImage(@Param('filename') image: any, @Res() res: Response) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
