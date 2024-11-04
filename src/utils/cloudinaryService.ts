import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dk3flpxkk', 
    api_key: '494139329784338', 
    api_secret: 'j8MP1ECvPrFdNvMqO2XuH17CyJU' // استبدل هذا بمفتاح API الخاص بك
});

// دالة رفع الصورة إلى Cloudinary
export const uploadImageToCloudinary = async (fileBuffer: Buffer): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'uploads' },
            (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return reject(error);
                }
                resolve(result.secure_url);
            }
        );
        uploadStream.end(fileBuffer); // تمرير buffer الملف إلى stream للرفع
    });
};

