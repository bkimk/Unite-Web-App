const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceAccountKey = require('../unite-393400-ca2cb94c8afb.json'); // Replace with your json info path
const storage = new Storage({
  projectId: serviceAccountKey.project_id,
  credentials: {
    client_email: serviceAccountKey.client_email,
    private_key: serviceAccountKey.private_key,
  },
});

const bucketName = 'unite-storage-bucket'; // Replace with your bucket name

const uploadImageToStorage = async (file) => {
  
  try {
    // the folowing code store the image in the backend repo

    // const fileName = Date.now() + '-' + file.name;
    // const filePath = path.join(__dirname, '../uploads/', fileName);
    // await file.mv(filePath);

    await storage.bucket(bucketName).upload(filePath, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    return imageUrl;
  } catch (error) {
    throw new Error('Error uploading image');
  }
};

const deleteImageFromStorage = async (imageUrl) => {
  try {
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    await storage.bucket(bucketName).file(fileName).delete();
  } catch (error) {
    throw new Error('Error deleting image');
  }
};

module.exports = {
  uploadImageToStorage,
  deleteImageFromStorage,
};