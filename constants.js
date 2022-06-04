module.exports = {
    permissionDenied: 'Permission Denied',
    notAuthorized: 'Not Authorized',
    somethingWrong: 'permissionDenied',
    validations: {
        notEmpty: 'fill in the {item} field it is required',
        isAlpha: "The {item} field should only contain a letter",
        lengthMsg: "The  {item} field  must contain at least {min} symbols and a maximum of {max}",
        passwordMsg: "The password field must contain one symbol and one capital letter",
        passwordDoesNotMatch: "The password does not match",
        incorrectEmail: "The email form is incorrect",
        incorrectObjectId: "The {item} is incorrect Object Id",
    },
    repositories: {
        userExistsByEmail: 'User with the email {email} already exists'
    },
    services: {
        incorrectDataForLogin: 'The data is incorrectly filled in',
        NotFound: '{item} is not found',
        deleteFailed: '{item}`s delete process was failed',
        notOwner: 'You are not the {item} owner'

    }
}