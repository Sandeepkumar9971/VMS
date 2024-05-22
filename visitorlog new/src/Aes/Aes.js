import CryptoJS from 'crypto-js';
export const Aesencryption = (string) => {
    const fkey = CryptoJS.enc.Utf8.parse('356d9abc7532ceb0945b615a622c3370');
    const fiv = CryptoJS.enc.Utf8.parse('yourivare1234567');

    const enc = CryptoJS.AES.encrypt(string, fkey, {
        iv: fiv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return enc.ciphertext.toString(CryptoJS.enc.Base64);
}

export const Aesdecryption = (data) => {
    let newdata = data.replace(/\s+/g, '')
    const fkey = CryptoJS.enc.Utf8.parse('356d9abc7532ceb0945b615a622c3370');
    const fiv = CryptoJS.enc.Utf8.parse('yourivare1234567');
    var decryptedWA = CryptoJS.AES.decrypt(newdata, fkey, {
        iv: fiv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    var decryptedUtf8 = decryptedWA.toString(CryptoJS.enc.Utf8);
    return decryptedUtf8;
}
