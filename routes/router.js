import express from "express";
import cors from 'cors';
import register from "../auth/register.js";
import login from "../auth/login.js";
import recoverPW from "../auth/recoverPW.js";
import changePW from "../auth/changePW.js";
import activate from "../auth/activate.js";
import { isLogged } from "../mw/auth.js";

const router = express.Router();
router.use(cors());

router.get('/auth/activate/:id/:lang', activate)
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/recoverPW', recoverPW);
router.post('/auth/changePW', isLogged, changePW);

router.get('/api/friends', isLogged, async (req, res) => {
    const friends = [
        {id: 1, name: "Mario"},
        {id: 2, name: "Diego"},
        {id: 3, name: "Carlos"},
        {id: 4, name: "Joe"},
    ];
    res.status(200).json(friends);
})

router.use('/', express.static('dist'));

export default router;