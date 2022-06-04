const userService = require('../services/UsersService');
const {CatchError} = require('../errors/error');

module.exports = {
    /**
     * create user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    signUp: async (req, res) => {
        console.log('auth controller - user signup ----->');
        try {
            await userService.signUp(req);
            res.status(200).send({success: true});
        } catch (e) {
            CatchError(e, res);
        }

    },

    /**
     * user login with JWT
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    login: async (req, res) => {
        console.log('auth controller - user login ----->');
        try {
            const token = await userService.login(req);
            res.status(200).send({success: true, token});
        } catch (e) {
            CatchError(e, res)
        }
    }
};