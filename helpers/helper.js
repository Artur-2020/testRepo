const bcrypt = require('bcrypt');

module.exports = {
    /**
     * check password
     * @param password
     * @param hash
     * @returns {Promise<void|*|NodeJS.Global.Promise>}
     */
    verifyPassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    },

    /**
     * change string
     * @param string
     * @param values
     * @returns {*}
     */
    changeString: (string, values = {}) => {
        let replaceValue = '';

        for (let value in values) {
            replaceValue = '{' + value + '}';
            string = string.replace(replaceValue, values[value]);
        }
        return string;
    }


};