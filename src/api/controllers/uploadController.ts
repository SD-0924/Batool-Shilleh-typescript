import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { uploadImageToCloudinary } from '../../utils/cloudinaryService'; 
import { ErrorMessages } from '../../utils/constants';

export const uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.file) {
            return next(new Error(ErrorMessages.NO_FILE_UPLOADED));
        }

        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(800, 800, {
                fit: sharp.fit.cover, 
                position: 'center' 
            })
            .toBuffer();
        const imageUrl = await uploadImageToCloudinary(processedImageBuffer);
        res.status(200).json({ message: 'Image uploaded successfully!', url: imageUrl });
    } catch (error) {
        next(error);
    }
};
