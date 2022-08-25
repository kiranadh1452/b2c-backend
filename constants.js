const OTP_LENGTH = 6;
const USER_TYPES = ["customer", "seller"];
const REQUIRED_FIELDS_SIGNUP = [
    "firstName",
    "lastName",
    "address",
    "phone",
    "email",
    "dob",
    "userType",
];
const REQUIRED_FIELDS_LOGIN = ["email", "password"];

module.exports = {
    OTP_LENGTH,
    USER_TYPES,
    REQUIRED_FIELDS_LOGIN,
    REQUIRED_FIELDS_SIGNUP,
};
