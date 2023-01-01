import bcrypt from 'bcryptjs';
import makeRandom from '../helpers/random.js';
import { User } from '../models/models.js';

const salt = bcrypt.genSaltSync(10);

const changePW = async (req, res) => {
    try {
        //Make sure new PW is longer than 8 chars
        if(req.body.newPW.length < 8) return res.sendStatus(400);
        //Make sure user exists 
        console.log(req.user);
        const query = { email: req.user.email };
        const user = await User.findOne(query);
        if(!user) return res.sendStatus(500);
        //Compare Old PW with PW stored in the DB
        if(bcrypt.compareSync(req.body.oldPW, req.user.pw) == false) return res.sendStatus(401);
        //Update PW in DB
        const changes = { pw: bcrypt.hashSync(req.body.newPW, salt)};
        await User.findByIdAndUpdate(user._id, changes);
        //Send Response
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default changePW;