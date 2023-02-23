const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
 
const storageUser = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tindPetUser'
  },
});

const storagePet = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tindPetPets'
  },
});
 
module.exports.user = multer({ storage: storageUser });
module.exports.pet = multer({ storage: storagePet });