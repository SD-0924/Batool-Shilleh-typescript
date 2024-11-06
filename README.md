# Image Processing API

An API that provides image processing capabilities, including grayscale, blur, resizing, cropping, filtering, and watermarking functionalities. The API is built with Node.js, Express, and TypeScript, leveraging Sharp for efficient image processing.

## Features
- **Grayscale Filter**: Convert images to grayscale.
- **Blur Filter**: Apply a blur effect with adjustable intensity.
- **Resizing**: Resize images to specified dimensions.
- **Cropping**: Crop images to specific regions.
- **Watermarking**: Add watermarks to images.
- **File Management**: Upload, download, and manage images using Cloudinary for cloud storage.
- **Deployment**: Deployed on Render for easy access and scalability.

## Technologies Used
- **Node.js** and **Express.js** for backend development.
- **TypeScript** for type safety and maintainability.
- **Sharp** for advanced image processing.
- **Multer** for handling file uploads.
- **Cloudinary** for image storage and management.
- **Jest** and **Supertest** for testing.
-
## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/image-processing-api.git
   cd image-processing-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install express multer sharp cloudinary
   npm install typescript ts-node-dev @types/express @types/multer @types/node --save-dev
   npm install --save-dev jest supertest @types/jest @types/supertest ts-jest
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add any necessary environment variables:
   ```plaintext
   PORT=3000
   CLOUDINARY_URL=https://batool-shilleh-typescript.onrender.com
   ```

4. **Run the server**
   ```bash
   npm run dev
   ```

5. **Testing**
   Run unit and integration tests:
   ```bash
   npm test
   ```

## Directory Structure
```
.
├── api
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   └── utils
├── tests
├── uploads
├── .github
│   └── workflows
│       └── nodejs.yml
├── .env
└── README.md
```

## Contributing
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch and open a pull request.

## License
This project is licensed under the MIT License.

