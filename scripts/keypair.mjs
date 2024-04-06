import * as crypto from 'crypto';

// Generate a key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

console.log('Public Key:\n', publicKey);
console.log('Private Key:\n', privateKey);
