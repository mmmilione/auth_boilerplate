import { User } from '../models/models.js';
import { checkEmail } from '../helpers/sanitize.js';
import { encrypt } from '../helpers/encryption.js';

const register = async (req, res) => {
    try {
        if(checkEmail(req.body.email) == false) return res.sendStatus(400);
        if(req.body.pw.length < 8) return res.sendStatus(404);
        if(req.body.pw != req.body.pwRep) return res.sendStatus(409);
        //Save new user adding isActive prop
        req.body.isActive = false;
        await User(req.body).save();
        //Respond
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        //Catch repeated email error
        if (error.code === 11000 || error.code === 11001) {
            if(error.message.includes('key')) return res.sendStatus(401);
        }
        res.sendStatus(500);
    }
}

export default register;