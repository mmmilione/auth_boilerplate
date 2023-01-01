import bcrypt from 'bcryptjs';
import { checkEmail } from '../helpers/sanitize.js';
import { User } from '../models/models.js';
import { createToken } from './jwt.js';

const login = async (req, res) => {
    try {
        //Check user's inputs
        if(checkEmail(req.body.email) == false || req.body.pw.length < 8){
            return res.sendStatus(404);
        }

        //Make sure user exists and he's active
        const query = { email: req.body.email };
        const user = await User.findOne(query);
        if(!user) return res.sendStatus(404);
        if(user.isActive == false) return res.sendStatus(401);
        //Check Password
        if(!bcrypt.compareSync(req.body.pw, user.pw)) return res.sendStatus(404);
        
        //Create JWT 
        const token = createToken(user._id);

        //Put token in a cookie
        res.cookie("auth", token, { maxAge: 60 * 60 * 1000, httpOnly: true, /*secure: true, sameSite: 'Strict'*/ });

        //Send Response
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default login;