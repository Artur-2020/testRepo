const User = require('../models/users');
const {SendError} = require('../errors/error');
const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT;
const {userExistsByEmail} = require('../constants').repositories;
const {changeString} = require('../helpers/helper');


module.exports = {
    /**
     * find workspace by query
     * @param query
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    findUserByQuery: async (query) => {
        console.log("Users Repo ==> findUserByQuery");
        return User.findOne(query);

    },
    /**
     * create user
     * @param userData
     * @returns {Promise<unknown>}
     */
    createUser: async (userData) => {
        console.log("Users Repo ==> create user");

        return new Promise(async (resolve, reject) => {
            try {
                const existsUser = await User.findOne({email: userData.email}).lean();
                if (existsUser) return reject(new SendError(changeString(userExistsByEmail, {email: existsUser.email})));
                userData.password = await bcrypt.hash(userData.password, saltRounds);
                const user = await User.create(userData);
                resolve(user);
            } catch (e) {
                reject(e);
            }
        });
    },
    /**
     * getting all users
     * @returns {Promise<void>}
     */
    getAllUsers: () => {
        return User.find({});
    }
};