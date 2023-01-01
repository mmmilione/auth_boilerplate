import bcrypt from 'bcryptjs';
import makeRandom from '../helpers/random.js';
import { checkEmail } from '../helpers/sanitize.js';
import { User } from '../models/models.js';
import recoverEmail from '../mailer/recover.js';

const salt = bcrypt.genSaltSync(10);

const recoverPW = async (req, res) => {
    try {
        //Make sure User Exists
        const query = { email: req.body.email };
        const user = await User.findOne(query);
        if(!user) return res.sendStatus(404);
        //Make up a new PW
        const newPW = makeRandom(12);
        //Hash new PW and save it
        const changes = { pw: bcrypt.hashSync(newPW, salt)};
        await User.findByIdAndUpdate(user._id, changes);
        //Send new PW to the user
        recoverEmail(user, newPW);
        //Send response
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default recoverPW;