import CryptoJS from 'crypto-js';

export function encryptData(data: object, key: string): string {
    const dataString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(dataString, key).toString();
    return encrypted;
}

export function decryptData<T>(encryptedData: string, key:string): T | null {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) {
            return null;
        }

        return JSON.parse(decryptedString) as T;
    } catch (error) {
        console.error("Ошибка дешифрования:", error);
        return null;
    }
}

export function hashMasterPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}