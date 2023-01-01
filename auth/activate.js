import { User } from '../models/models.js';
import activationText from '../localization/activation.js';

const activate = async (req, res) => {
    try {
        //Make user active
        const changes = { isActive: true };
        const user = await User.findByIdAndUpdate(req.params.id, changes);
        //Make sure that user was found
        if(!user) throw Error("User Doesn 't Exist");
        //Send response
        res.render('ActivationSuccess', {text:activationText[req.params.lang].success});
    } catch (error) {
        console.log(error);
        res.render('ActivationFailed', {text:activationText[req.params.lang].fail});
    }
}

export default activate;