const SERVER_PORT = 3000;

// related to data format standerdization
const OTP_LENGTH = 6;
const CACHE_TTL = 1000000;
const PASSWORD_LENGTH = {
    min: 6,
    max: 20,
};
const NAME_LENGTH = {
    min: 3,
    max: 30,
};
const PHONE_LENGTH = {
    min: 10,
    max: 15,
};
const ADDRESS_LENGTH = {
    min: 10,
    max: 200,
};
const USER_TYPES = ["customer", "seller", "admin"];

// related to login and signup purposes
const REQUIRED_FIELDS_SIGNUP = [
    "firstName",
    "lastName",
    "password",
    "address",
    "phone",
    "email",
    "dob",
    "userType",
];
const REQUIRED_FIELDS_LOGIN = ["email", "password"];
const REQUIRED_FIELDS_CHANGE_PASSWORD = ["password", "newPassword"];

// related to shop adding and editing purposes
const REQUIRED_FIELDS_ADD_SHOP = [
    "shopLogo",
    "shopName",
    "shopPhone",
    "shopEmail",
    "shopBanner",
    "shopAddress",
    "shopWebsite",
    "shopDescription",
];
const SHOP_NAME_LENGTH = {
    min: 3,
    max: 50,
};


module.exports = {
    CACHE_TTL,
    OTP_LENGTH,
    USER_TYPES,
    NAME_LENGTH,
    SERVER_PORT,
    PHONE_LENGTH,
    ADDRESS_LENGTH,
    PASSWORD_LENGTH,
    SHOP_NAME_LENGTH,
    REQUIRED_FIELDS_LOGIN,
    REQUIRED_FIELDS_SIGNUP,
    REQUIRED_FIELDS_ADD_SHOP,
    REQUIRED_FIELDS_CHANGE_PASSWORD,
};
