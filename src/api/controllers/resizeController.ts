import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { ErrorMessages } from '../../utils/constants'

const uploadDir = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

export const resizeImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { width, height } = req.body

    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED))
    }

    if (!width || !height) {
      return next(new Error(ErrorMessages.REQUIRED_FIELDS)) 
    }

    const fileName = `resized_${Date.now()}.jpg`
    const filePath = path.join(uploadDir, fileName)

    await sharp(req.file.buffer)
      .resize(Number(width), Number(height)) 
      .toFile(filePath)

    res.status(200).json({ message: 'Image resized successfully!', path: filePath })
  } catch (error) {
    next(error)
  }
}
