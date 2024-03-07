import appRootPath from 'app-root-path';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${appRootPath.path}/.env` });

const configs = {
    accessTokenSigningOptions: {
        issuer: 'mychats',
        expiresIn: '5m',
        algorithm: 'RS256',
    },
    accessTokenVerifyOptions: {
        issuer: 'mychats',
        expiresIn: '5m',
        algorithm: 'RS256',
    },
    refreshTokenSigningOptions: {
        issuer: 'mychats',
        expiresIn: '1y',
        algorithm: 'RS256',
    },
    refreshTokenVerifyOptions: {
        issuer: 'mychats',
        expiresIn: '1y',
        algorithm: 'RS256',
    },
    keys: {
        accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
        accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,

        refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
        refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    },

    salt: process.env.SALT,

    port: process.env.PORT,

    host: process.env.HOST,

    redis: {
        url: process.env.REDIS_HOST_URL,
        port: process.env.REDIS_PORT,
        password: `${process.env.REDIS_PASSWORD}`,
    },
    database: {
        test_url: process.env.TEST_DATABASE_URL,
    },

    mail: {
        smtp: process.env.SMTP,
        registrationMail: process.env.REG_EMAIL as string,
        reg_email_pass: process.env.EMAIL_PASS,
        supportMail: process.env.REG_EMAIL as string,
    },
};

export default configs;
