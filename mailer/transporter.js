import nodemailer from 'nodemailer';
import { mailer } from '../secrets.js';

const transporter = nodemailer.createTransport({
    host: mailer.host,
    port: mailer.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailer.user, // generated ethereal user
      pass: mailer.pw, // generated ethereal password
    },
});

export default transporter;