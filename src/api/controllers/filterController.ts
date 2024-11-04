import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { ErrorMessages } from '../../utils/constants';
import { v2 as cloudinary } from 'cloudinary';

export const applyGrayscale = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED));
    }

    const processedImageBuffer = await sharp(req.file.buffer)
      .grayscale()
      .toBuffer();

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${processedImageBuffer.toString('base64')}`, {
      folder: 'uploads',
    });

    res.status(200).json({ message: 'Grayscale image uploaded successfully!', url: result.secure_url });
  } catch (error) {
    console.error('Error in applyGrayscale:', error);
    next(error);
  }
};

export const applyBlur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { intensity } = req.body;

    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED));
    }

    const processedImageBuffer = await sharp(req.file.buffer)
      .blur(intensity || 1) 
      .toBuffer();

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${processedImageBuffer.toString('base64')}`, {
      folder: 'uploads',
    });

    res.status(200).json({ message: 'Blurred image uploaded successfully!', url: result.secure_url });
  } catch (error) {
    console.error('Error in applyBlur:', error);
    next(error);
  }
};
