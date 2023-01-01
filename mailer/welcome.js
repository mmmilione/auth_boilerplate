import { baseUrl, website } from "../config.js";
import { mailer } from "../secrets.js";
import transporter from "./transporter.js";
import welcomeText from '../localization/welcome.js';

const welcomeEmail = (user) => {
    const subject = welcomeText[user.lang].subject;
    const html = `
<p>${welcomeText[user.lang].welcome}</p>
<p>${welcomeText[user.lang].action}</p>
<p><a href="${baseUrl}auth/activate/${user.id}/${user.lang}" target="_blank">${baseUrl}auth/activate/${user.id}/${user.lang}</a></p>
<p>${welcomeText[user.lang].bye}</p>
<p>${website} Team</p>`;

    let text = welcomeText[user.lang].welcome + "\n\n";
    text += welcomeText[user.lang].action+"\n\n";
    text += baseUrl + "auth/activate/" + user.id + "/" + user.lang;
    text += "\n\n";
    text += welcomeText[user.lang].bye;
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

export default welcomeEmail;