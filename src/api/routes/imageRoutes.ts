import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';
import { resizeImage } from '../controllers/resizeController';
import { cropImage } from '../controllers/cropController';
import { downloadImage } from '../controllers/downloadController';
import { applyGrayscale, applyBlur } from '../controllers/filterController';
import { addWatermark } from '../controllers/watermarkController';


const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('image'), uploadImage);
router.post('/resize', upload.single('image'), resizeImage);
router.post('/crop', upload.single('image'), cropImage);
router.get('/download/:filename', downloadImage);
router.post('/filter/grayscale', upload.single('image'), applyGrayscale);
router.post('/filter/blur', upload.single('image'), applyBlur);
router.post('/watermark', upload.single('image'), addWatermark);

export default router;
