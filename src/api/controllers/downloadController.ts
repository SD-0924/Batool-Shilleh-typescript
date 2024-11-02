import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { ErrorMessages } from '../../utils/constants'

export const downloadImage = (req: Request, res: Response, next: NextFunction): void => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../uploads', filename)

  if (fs.existsSync(filePath)) {
    res.download(filePath)
  } else {
    return next(new Error(ErrorMessages.FILE_NOT_FOUND))
  }
};
