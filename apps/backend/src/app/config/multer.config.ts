import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExt}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
  },
};
