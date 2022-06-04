const {check} = require("express-validator");
const ObjectId = require('mongoose').Types.ObjectId;
const {
    notEmpty,
    isAlpha,
    lengthMsg,
    incorrectObjectId
} = require('../constants').validations;
const {changeString} = require("../helpers/helper");


module.exports = {
    createValidator: [
        check("name").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'name'})).isAlpha().withMessage(changeString(isAlpha, {item: 'name'})).isLength({
            min: 2,
            max: 30
        }).withMessage(changeString(lengthMsg, {item: 'name', min: '2', max: '30'})),
        check("workspaceId").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'workspaceId'})).custom((value) => {
            if (!ObjectId.isValid(value)) return Promise.reject()
            return Promise.resolve();
        }).withMessage(changeString(incorrectObjectId, {item: 'workspaceId'})),
    ],
    updateValidator: [
        check("name").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'name'})).isAlpha().withMessage(changeString(isAlpha, {item: 'name'})).isLength({
            min: 2,
            max: 30
        }).withMessage(changeString(lengthMsg, {item: 'name', min: '2', max: '30'})),
        check("id").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'id'})).custom((value) => {
            if (!ObjectId.isValid(value)) return Promise.reject()
            return Promise.resolve();
        }).withMessage(changeString(incorrectObjectId, {item: 'id'})),
        check("workspaceId").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'workspaceId'})).custom((value) => {
            if (!ObjectId.isValid(value)) return Promise.reject()
            return Promise.resolve();
        }).withMessage(changeString(incorrectObjectId, {item: 'workspaceId'})),
    ],
    idRequired: [
        check("id").trim().notEmpty().withMessage(changeString(notEmpty, {item: 'id'})).custom((value) => {
            if (!ObjectId.isValid(value)) return Promise.reject()
            return Promise.resolve();
        }).withMessage(changeString(incorrectObjectId, {item: 'id'}))
    ],
};
