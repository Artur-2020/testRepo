const {ValidationError, SendError} = require("../errors/error");
const {validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UsersRepository');
const {verifyPassword} = require('../helpers/helper');
const {incorrectDataForLogin} = require('../constants').services;
module.exports = {
    /**
     * user signup process
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    signUp: async (req) => {
        console.log('userService ---> signUp');
        const body = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors['errors'][0].msg);
        }
        const {name, surname, email, password} = body;
        await userRepository.createUser({name, surname, email, password});
    },

    /**
     * user login process
     * @param req
     * @param res
     */
    login: async (req) => {
        console.log('userService ---> login');
        const {email, password} = req.body;
        const user = await userRepository.findUserByQuery({email: email.toLowerCase()});
        if (!user) throw new SendError(incorrectDataForLogin);

        const match = await verifyPassword(password, user.password);
        if (!match) throw new SendError(incorrectDataForLogin);

        const token = jwt.sign({_id: user._id.toString(), email: user.email}, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;


    }
}