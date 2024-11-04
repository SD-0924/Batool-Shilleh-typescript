import { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from '../../utils/constants';
import { v2 as cloudinary } from 'cloudinary';

export const downloadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { filename } = req.params;

  try {
    const imageUrl = cloudinary.url(`uploads/${filename}`, {
      secure: true,
    });

    res.redirect(imageUrl);
  } catch (error) {
    console.error('Error downloading from Cloudinary:', error);
    return next(new Error(ErrorMessages.FILE_NOT_FOUND));
  }
};
