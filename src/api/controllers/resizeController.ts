import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { ErrorMessages } from '../../utils/constants';
import { v2 as cloudinary } from 'cloudinary';

export const resizeImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { width, height } = req.body;

    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED));
    }

    if (!width || !height) {
      return next(new Error(ErrorMessages.REQUIRED_FIELDS));
    }

    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(Number(width), Number(height))
      .toBuffer();

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${resizedImageBuffer.toString('base64')}`, {
      folder: 'uploads',
    });

    res.status(200).json({ message: 'Image resized and uploaded successfully!', url: result.secure_url });
  } catch (error) {
    console.error('Error in resizeImage:', error);
    next(error);
  }
};
