import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

// Ensure the key is exactly 32 bytes for AES-256
function getKey(): Buffer {
  const keyHex = ENCRYPTION_KEY;
  const keyBuffer = Buffer.from(keyHex, 'hex');
  
  if (keyBuffer.length !== 32) {
    console.error(`Invalid encryption key length: ${keyBuffer.length} bytes, expected 32 bytes (64 hex characters)`);
    throw new Error('Invalid key length');
  }
  
  return keyBuffer;
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, getKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string): string {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift()!, 'hex');
  const encryptedText = parts.join(':');
  const decipher = crypto.createDecipheriv(algorithm, getKey(), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function generateState(): string {
  return crypto.randomBytes(32).toString('hex');
}
