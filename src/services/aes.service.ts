import * as AesJS from 'aes-js';

const keyText = 'E57CEF25535C819E929BA1C560A9853A';

const parseKey = (key: string) => {
  return key.split('').map((el) => el.charCodeAt(0));
};

const hexToBase64 = (hexStr: string) => {
  let base64 = '';
  for (let i = 0; i < hexStr.length; i++) {
    base64 += !((i - 1) & 1) ? String.fromCharCode(parseInt(hexStr.substring(i - 1, i + 1), 16)) : '';
  }
  return btoa(base64);
};

const base64ToHex = (base64Str: string) => {
  const raw = atob(base64Str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result.toUpperCase();
};

export const encryptData = (text: string) => {
  const textBytes = AesJS.utils.utf8.toBytes(text);
  const aesCbc = new AesJS.ModeOfOperation.cbc(parseKey(keyText), parseKey(keyText.substr(0, 16)));
  const encryptedBytes = aesCbc.encrypt(AesJS.padding.pkcs7.pad(textBytes));
  const encryptedHex = AesJS.utils.hex.fromBytes(encryptedBytes);
  return hexToBase64(encryptedHex);
};

export const decryptData = (base64Text: string) => {
  const encryptedHex = base64ToHex(base64Text);
  const encryptedBytes = AesJS.utils.hex.toBytes(encryptedHex);
  const aesCbc = new AesJS.ModeOfOperation.cbc(parseKey(keyText), parseKey(keyText.substr(0, 16)));
  const decryptedBytes = aesCbc.decrypt(encryptedBytes);
  return AesJS.utils.utf8.fromBytes(AesJS.padding.pkcs7.strip(decryptedBytes));
};
