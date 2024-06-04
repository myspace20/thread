import path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
  override: true,
});

const accessTokenSigningOptions = {
  issuer: 'mychats',
  expiresIn: '5m',
  algorithm: 'RS256',
};

const accessTokenVerifyOptions = {
  issuer: 'mychats',
  algorithms: ['RS256'],
};

const refreshTokenSigningOptions = {
  issuer: 'mychats',
  expiresIn: '4h',
  algorithm: 'RS256',
};

const refreshTokenVerifyOptions = {
  issuer: 'mychats',
  algorithms: ['RS256'],
};

const keys = {
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,

  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
};

const salt = process.env.SALT;

const port = Number(process.env.PORT);

const host = String(process.env.HOST);

const redis = {
  url: process.env.REDIS_HOST_URL,
  port: process.env.REDIS_PORT,
  password: `${process.env.REDIS_PASSWORD}`,
};

const database = {
  test_url: process.env.TEST_DATABASE_URL,
};

const mail = {
  smtp: process.env.SMTP,
  registrationMail: process.env.REG_EMAIL as string,
  reg_email_pass: process.env.EMAIL_PASS,
  supportMail: process.env.REG_EMAIL as string,
};

const supabaseConnString = process.env.SUPA_BASE_CONN_STRING as string;

const supabaseKey = process.env.SUPA_BASE_KEY as string;

export default {
  accessTokenSigningOptions,
  accessTokenVerifyOptions,
  refreshTokenSigningOptions,
  refreshTokenVerifyOptions,
  redis,
  keys,
  host,
  salt,
  port,
  database,
  mail,
  supabaseKey,
  supabaseConnString,
};
