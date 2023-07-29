require("dotenv").config();
const crypto = require("crypto");
const BaseError = require("../exceptions/baseError");

const { CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV, CRYPTO_ECNRYPTION_METHOD } =
  process.env;

let key;
let encryptionIV;

const encryptData = async (data) => {
  if (!CRYPTO_SECRET_KEY || !CRYPTO_SECRET_IV || !CRYPTO_ECNRYPTION_METHOD)
    throw new BaseError(
      "CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV, CRYPTO_ECNRYPTION_METHOD is required"
    );

  try {
    key = await crypto
      .createHash("sha512")
      .update(CRYPTO_SECRET_KEY)
      .digest("hex")
      .substring(0, 32);

    encryptionIV = await crypto
      .createHash("sha512")
      .update(CRYPTO_SECRET_IV)
      .digest("hex")
      .substring(0, 16);

    const chiper = await crypto.createCipheriv(
      CRYPTO_ECNRYPTION_METHOD,
      key,
      encryptionIV
    );
    const result = await Buffer.from(
      chiper.update(data, "utf8", "hex") + chiper.final("hex")
    ).toString("base64");

    return result;
  } catch (error) {
    throw new BaseError(error.message);
  }
};

const decryptData = async (encryptedData) => {
  if (!CRYPTO_SECRET_KEY || !CRYPTO_SECRET_IV || !CRYPTO_ECNRYPTION_METHOD)
    throw new BaseError(
      "CRYPTO_SECRET_KEY, CRYPTO_SECRET_IV, CRYPTO_ECNRYPTION_METHOD is required"
    );

  try {
    key = await crypto
      .createHash("sha512")
      .update(CRYPTO_SECRET_KEY)
      .digest("hex")
      .substring(0, 32);

    encryptionIV = await crypto
      .createHash("sha512")
      .update(CRYPTO_SECRET_IV)
      .digest("hex")
      .substring(0, 16);

    const buff = await Buffer.from(encryptedData, "base64");
    const dechiper = crypto.createDecipheriv(
      CRYPTO_ECNRYPTION_METHOD,
      key,
      encryptionIV
    );

    const result =
      await dechiper.update(buff.toString("utf8"), "hex", "utf8") +
      dechiper.final("utf8");

    return result;
  } catch (error) {
    throw new BaseError(error.message);
  }
};

module.exports = {
  encryptData,
  decryptData,
};
