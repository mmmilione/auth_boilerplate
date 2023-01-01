import jwt from 'jsonwebtoken';
import  {jwtSecret} from '../secrets.js';

const createToken = id => {
    const payLoad = {id};
    const maxAge = 60 * 60;
    const jwtOptions = {expiresIn: maxAge};
    const token = jwt.sign(payLoad, jwtSecret, jwtOptions);
    return token;
}

const checkToken = async (token) => {
    const decodedToken = await jwt.verify(token, jwtSecret);
    return decodedToken;
}

export { checkToken, createToken };
