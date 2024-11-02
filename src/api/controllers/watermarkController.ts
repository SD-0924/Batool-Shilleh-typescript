import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { ErrorMessages } from '../../utils/constants'

const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

export const addWatermark = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED))
      return 
    }

    const watermark = req.body.watermark 

    const processedImage = await sharp(req.file.buffer)
      .composite([{
        input: Buffer.from(`
          <svg width="500" height="100">
            <text x="10" y="40" font-size="40" fill="white">${watermark}</text>
          </svg>
        `),
        gravity: 'southeast' 
      }])
      .toBuffer();

    const fileName = `watermarked_${Date.now()}.jpg`
    const filePath = path.join(uploadDir, fileName)

    await sharp(processedImage).toFile(filePath)

    res.status(200).json({ message: 'Watermarked image created!', path: filePath })
  } catch (error) {
    next(error)
  }
}
