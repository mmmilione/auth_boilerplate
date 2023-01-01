import { website } from "../config.js";

const welcomeText = {
    ITA: {
        subject: "Benvenuto!",
        welcome: "Benvenuto in " + website + "!",
        action: "Clicca sul link qui sotto per attivare il tuo account:",
        bye: "Cordialmente,"
    },
    ES: {
        subject: "Bienvenido!",
        welcome: "Bienvenido en " + website + "!",
        action: "Haz click en el link abajo para activar tu cuenta:",
        bye: "Atentamente,"
    },
    ENG: {
        subject: "Welcome!",
        welcome: "Welcome to " + website + "!",
        action: "Click on the link below to activate your account:",
        bye: "Best Regards"
    }
};

export default welcomeText;