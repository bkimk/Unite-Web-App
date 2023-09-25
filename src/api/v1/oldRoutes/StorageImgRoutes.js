// THIS FILE NEEDS TO BE REFACTORED

const express = require('express');
const router = express.Router();
const storage = require('../models/StorageImg');

router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image has been uploaded' });
    }
  
    // const file = req.files.image;

    // const imageUrl = await storage.uploadImageToStorage(file);

    const dummyImageUrl = "https://imgix.ranker.com/user_node_img/50024/1000474921/original/we-all-know-what-he-s-thinking-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375"

    res.json({ imageUrl: dummyImageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl; // Image URL to be deleted

    if (!imageUrl) {
      return res.status(400).json({ error: 'Missing imageUrl parameter' });
    }

    // await storage.deleteImageFromStorage(imageUrl);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting image' });
  }
});
console.log()

module.exports = router;