import { User } from "../models/models.js";
import { checkToken } from "../auth/jwt.js";

const isLogged = async (req, res, next) => {
    try {
        //Make sure that token exists and decode it
        if(!req.cookies.auth) return res.sendStatus(401);
        const decodedToken = await checkToken(req.cookies.auth);
        //Use decoded token, to get user's data
        const user = await User.findById(decodedToken.id);
        if(!user) return res.sendStatus(401);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
    
}

const isAdmin = (req, res, next) => {
    next();
}

export { isLogged, isAdmin };