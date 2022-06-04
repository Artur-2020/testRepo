const {check} = require("express-validator");
const {
    notEmpty,
    isAlpha,
    lengthMsg,
    passwordMsg,
    passwordDoesNotMatch,
    incorrectEmail
} = require('../constants').validations;
const {changeString} = require("../helpers/helper");


module.exports = [
    check("name").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'name'})).isAlpha().withMessage(changeString(isAlpha, {item: 'name'})).isLength({
        min: 2,
        max: 30
    }).withMessage(changeString(lengthMsg, {item: 'name', min: '2', max: '30'})),
    check("surname").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'surname'})).isAlpha().withMessage(changeString(isAlpha, {item: 'surname'})).isLength({
        min: 2,
        max: 30
    }).withMessage(changeString(lengthMsg, {item: 'surname', min: '2', max: '30'})),
    check("email").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'email'})).isEmail().withMessage(incorrectEmail).isLength({
        min: 2,
        max: 30
    }).withMessage(changeString(lengthMsg, {item: 'email', min: '2', max: '30'})),
    check("password").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'password'})).isLength({
        min: 6,
        max: 16
    }).withMessage(changeString(lengthMsg, {item: 'password', min: '6', max: '16'})).custom((value) => {
        const checkSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (!/[A-Z]/.test(value) || !checkSymbols.test(value)) {
            return Promise.reject();
        }
        return Promise.resolve();
    }).withMessage(passwordMsg),

    check("confirm_password").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'confirm password'})).custom((value, {req}) => (value === req.body.password)).withMessage(passwordDoesNotMatch),
];
