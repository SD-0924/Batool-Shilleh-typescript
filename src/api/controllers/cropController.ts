import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { uploadImageToCloudinary } from '../../utils/cloudinaryService'; 
import { ErrorMessages } from '../../utils/constants';

export const cropImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { width, height, left, top } = req.body;

        if (!req.file) {
            return next(new Error(ErrorMessages.NO_FILE_UPLOADED));
        }

        if (width === undefined || height === undefined || left === undefined || top === undefined) {
            return next(new Error(ErrorMessages.REQUIRED_FIELDS));
        }

        const croppedImageBuffer = await sharp(req.file.buffer)
            .extract({
                width: Number(width),
                height: Number(height),
                left: Number(left),
                top: Number(top),
            })
            .toBuffer(); 

        const imageUrl = await uploadImageToCloudinary(croppedImageBuffer);

        res.status(200).json({ message: ErrorMessages.CROP_SUCCESS, url: imageUrl });
    } catch (error) {
        next(error);
    }
};
