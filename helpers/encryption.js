import crypto from 'crypto';
import { encryption } from '../secrets.js';

const algorithm = "aes-256-cbc"; 

const encrypt = (message) => {
    // secret key generate 32 bytes of random data
    const Securitykey = Buffer.from(encryption.secretDB);
    const initVector = Buffer.from(encryption.initVector);
    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

const decrypt = (encryptedData) => {
    // secret key generate 32 bytes of random data
    const Securitykey = Buffer.from(encryption.secretDB);
    const initVector = Buffer.from(encryption.initVector);
    // the decipher function
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

export { encrypt, decrypt };