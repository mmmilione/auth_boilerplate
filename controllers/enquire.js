import { checkEmail, checkMessage } from "../helpers/sanitize.js";
import transporter from '../mailer/transporter.js';
import { mailer } from '../secrets.js';

const enquire = async (req, res) => {
    try {
        //Check email and Message
        if(checkEmail(req.body.email) == false) return res.sendStatus(401);
        if(checkMessage(req.body.msg) == false) return res.sendStatus(409);
        const mailHTML = `
<p>L' utente ${req.body.email} ha inviato questo messaggio:</p>
<p>${req.body.msg}</p>`;
        transporter.sendMail({
            from: mailer.user, // sender address
            to: mailer.user, // list of receivers
            subject: "New Enquiry", // Subject line
            html: mailHTML, // plain text body
            replyTo: req.body.email, //Reply to the user email
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default enquire;