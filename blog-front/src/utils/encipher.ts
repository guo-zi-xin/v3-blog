import CryptoJS from 'crypto-js'

// 十六位的十六位进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('1992059868971119')

// 十六位的十六位进制数作为偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('1992059868971119')

/**
 * @title 加密方法
 * @param data { T }
 * @returns { string }
 */

export const _encrypt = (data: any): string => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data)
    } catch (error) {
      console.log('encrypt error', error)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * @title 解密方法
 * @param data { any }
 * @returns { string }
 */

export const _decrypt = (data: any): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}