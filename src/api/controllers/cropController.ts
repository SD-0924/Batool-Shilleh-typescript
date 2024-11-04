import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { ErrorMessages } from '../../utils/constants'
const uploadDir = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

export const cropImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { width, height, left, top } = req.body

    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED)) 
    }

    if (width === undefined || height === undefined || left === undefined || top === undefined) {
      return next(new Error(ErrorMessages.REQUIRED_FIELDS))
    }

    const fileName = `cropped_${Date.now()}.jpg`
    const filePath = path.join(process.cwd(), fileName)

    await sharp(req.file.buffer)
      .extract({
        width: Number(width),
        height: Number(height),
        left: Number(left),
        top: Number(top),
      })
      .toFile(filePath)

      res.status(200).json({ message: ErrorMessages.CROP_SUCCESS, path: filePath })
  } catch (error) {
    next(error)
  }
};
