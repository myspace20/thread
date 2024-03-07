import nodemailer from 'nodemailer';
import configs from './default';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configs.mail.registrationMail,
        pass: configs.mail.reg_email_pass,
    },
});

export default transport;
