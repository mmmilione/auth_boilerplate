import { website } from "../config.js";
import { mailer } from "../secrets.js";
import transporter from "./transporter.js";
import recoverText from '../localization/recover.js';

const recoverEmail = (user, pw) => {
    const subject = recoverText[user.lang].subject;
    const html = `
<p>${recoverText[user.lang].welcome}</p>
<p>${recoverText[user.lang].action}</p>
<p><b>${pw}</b></p>
<p>${recoverText[user.lang].warning}</p>
<p>${recoverText[user.lang].bye}</p>
<p>${website} Team</p>`;

    let text = recoverText[user.lang].welcome + "\n\n";
    text += recoverText[user.lang].action+"\n\n";
    text += pw;
    text += "\n\n";
    text += recoverText[user.lang].warning;
    text += recoverText[user.lang].bye;
    text += website + " Team";

    transporter.sendMail({
        from: '"'+ website +'" <' + mailer.user +'>', // sender address
        to: user.email, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
        replayTo: mailer.user, //Reply to the user email
    });

}

export default recoverEmail;