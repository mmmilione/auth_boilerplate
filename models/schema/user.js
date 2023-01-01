import { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { decrypt, encrypt } from "../../helpers/encryption.js";
import welcomeEmail from '../../mailer/welcome.js'

var salt = bcrypt.genSaltSync(10);

const User = new Schema({
    email: { type: String, require: true, unique: true },
    pw: { type: String, require: true },
    isActive: {type: Boolean, require: true },
    lang: {type: String, require: true}
});

User.pre('save', function(next, done) {
    const user = this;
    user.email = encrypt(user.email);
    user.pw = bcrypt.hashSync(user.pw, salt);
    next();
});

User.post('save', function(user) {
    user.email = decrypt(user.email);
    welcomeEmail(user);
})

User.pre('findOne', function(next, done) {
    if(this._conditions.email) {
        this._conditions.email = encrypt(this._conditions.email);
    }
    next();
});

User.post('findOne', function(user) {
    if(!user) return false;
    user.email = decrypt(user.email);
});

export default User;