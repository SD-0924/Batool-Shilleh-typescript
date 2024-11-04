import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import { ErrorMessages } from '../../utils/constants';

export const addWatermark = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED));
    }

    const watermark = req.body.watermark;

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

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${processedImage.toString('base64')}`, {
      folder: 'uploads',
    });

    res.status(200).json({ message: 'Watermarked image created and uploaded!', url: result.secure_url });
  } catch (error) {
    console.error('Error in addWatermark:', error);
    next(error);
  }
};
