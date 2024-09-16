import multer, { Multer } from 'multer';
import { createClient } from '@supabase/supabase-js';
import config from '../../../config/default';
import { decode } from 'base64-arraybuffer';
import fs from 'fs';

const supabase = createClient(config.supabaseConnString, config.supabaseKey);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/public/uploads'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file to include the timestamp
  },
});

const upload = multer({ storage });

async function uploadToSupabase(file: any) {
  const bitmap = fs.readFileSync(file.path).toString('base64');
  const fileBase64 = decode(bitmap);
  const { data, error } = await supabase.storage
    .from('disease-classifier')
    .upload(file.filename, fileBase64, {
      contentType: 'image/png',
    });
  if (error) {
    throw error;
  }
  const { data: url, error: err } = await supabase.storage
    .from('disease-classifier')
    .createSignedUrl(data.path, 1000);

  if (err) {
    throw err;
  }
  return url.signedUrl;
}

export default {
  uploadToSupabase,
  upload,
};
