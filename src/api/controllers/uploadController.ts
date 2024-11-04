import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { uploadImageToCloudinary } from '../../utils/cloudinaryService'; // تأكد من المسار صحيح
import { ErrorMessages } from '../../utils/constants';

export const uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.file) {
            return next(new Error(ErrorMessages.NO_FILE_UPLOADED));
        }

        // استخدام Sharp لمعالجة الصورة
        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(800, 800, {
                fit: sharp.fit.cover, // تعديل الصورة لتناسب الإطار المحدد
                position: 'center' // مركز الصورة
            })
            .toBuffer(); // الحصول على Buffer للصورة المعالجة

        // رفع الصورة إلى Cloudinary
        const imageUrl = await uploadImageToCloudinary(processedImageBuffer);
        
        // إرجاع رابط الصورة
        res.status(200).json({ message: 'Image uploaded successfully!', url: imageUrl });
    } catch (error) {
        next(error);
    }
};
