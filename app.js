const express = require('express');
const multer = require('multer');
const { ImageAnnotatorClient } = require('@google-cloud/vision');

const app = express();
const upload = multer({ dest: 'uploads/' });

const client = new ImageAnnotatorClient({
  keyFilename: 'credentials.json'
});

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { path } = req.file;

    // OCR using Google Cloud Vision
    const [result] = await client.textDetection(path);
    const text = result.fullTextAnnotation.text;

    const tokens = text.split(/\W+/);

    res.json({ text, tokens });
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).send('OCR failed');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
