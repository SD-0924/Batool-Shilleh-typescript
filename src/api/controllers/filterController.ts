import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { ErrorMessages } from '../../utils/constants'

const uploadDir = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

export const applyGrayscale = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED))
    }

    const processedImage = await sharp(req.file.buffer)
      .grayscale()
      .toBuffer()

    const fileName = `grayscale_${Date.now()}.jpg`
    const filePath = path.join(uploadDir, fileName)

    await sharp(processedImage).toFile(filePath)

    res.status(200).contentType(req.file.mimetype) 
    .send(processedImage)
  } catch (error) {
    next(error)
  }
}

export const applyBlur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { intensity } = req.body;

    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED))
    }

    const processedImage = await sharp(req.file.buffer)
      .blur(intensity)
      .toBuffer()

    const fileName = `blurred_${Date.now()}.jpg`
    const filePath = path.join(uploadDir, fileName)

    await sharp(processedImage).toFile(filePath)

    res.status(200).contentType(req.file.mimetype) 
    .send(processedImage)
  } catch (error) {
    next(error)
  }
};
