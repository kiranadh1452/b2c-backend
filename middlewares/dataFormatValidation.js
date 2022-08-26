// Using express-validator to validate the data sent in the request body.
const { check, validationResult } = require("express-validator");
const {
    USER_TYPES,
    OTP_LENGTH,
    NAME_LENGTH,
    PHONE_LENGTH,
    ADDRESS_LENGTH,
    PASSWORD_LENGTH,
    SHOP_NAME_LENGTH,
} = require("../constants");

/**
 * Function to validate that the data is non-empty
 * Usecase: When all the data sent in request are required to be non-empty
 * @param {Array} dataArray - Array of data fields to be validated
 * @returns {Array} - Array of validation result
 */
const nonEmptyDataValidation = (dataArray) => {
    try {
        const validations = [];
        dataArray.forEach((data) => {
            validations.push(check(data).not().isEmpty());
        });
        return validations;
    } catch (error) {
        return [new Error(error)];
    }
};

/**
 * Function to validate the format of data sent in the request body.
 * Usecase: When all the data sent in request are required to be of valid format
 * @param {Array} dataArray - Array of data fields to be validated
 * @returns {Array} - Array of validation result
 */
const dataFormatValidation = (dataArray) => {
    try {
        const validations = [];
        dataArray.forEach((data) => {
            switch (data) {
                case "email" || "shopEmail":
                    validations.push(
                        check(data)
                            .isEmail()
                            .withMessage("The provided email is invalid")
                    );
                    break;
                case "password" || "newPassword":
                    validations.push(
                        check(data)
                            .isLength({
                                min: PASSWORD_LENGTH.min,
                                max: PASSWORD_LENGTH.max,
                            })
                            .withMessage(
                                `Password must be between ${PASSWORD_LENGTH.min} to ${PASSWORD_LENGTH.max} characters`
                            )
                    );
                    break;
                case "firstName" || "lastName" || "middleName":
                    validations.push(
                        check(data)
                            .optional()
                            .isLength({
                                min: NAME_LENGTH.min,
                                max: NAME_LENGTH.max,
                            })
                            .withMessage(
                                `Name must be between ${NAME_LENGTH.min} to ${NAME_LENGTH.max} characters`
                            )
                    );
                    break;
                case "phone" || "shopPhone":
                    validations.push(
                        check(data)
                            .isLength({
                                min: PHONE_LENGTH.min,
                                max: PHONE_LENGTH.max,
                            })
                            .withMessage(
                                `Length of contact number must be between ${PHONE_LENGTH.min} to ${PHONE_LENGTH.max} characters`
                            )
                    );
                    break;
                case "address" || "shopAddress":
                    validations.push(
                        check(data)
                            .isLength({
                                min: ADDRESS_LENGTH.min,
                                max: ADDRESS_LENGTH.max,
                            })
                            .withMessage(
                                `Address must be between ${ADDRESS_LENGTH.min} to ${ADDRESS_LENGTH.max} characters`
                            )
                    );
                    break;
                case "userType":
                    validations.push(
                        check(data)
                            .isIn(USER_TYPES)
                            .withMessage("Invalid user type")
                    );
                    break;
                case "otp":
                    validations.push(
                        check(data)
                            .isLength({ min: OTP_LENGTH, max: OTP_LENGTH })
                            .withMessage("Wrong OTP format")
                    );
                    break;
                case "shopName":
                    validations.push(
                        check(data)
                            .isLength({
                                min: SHOP_NAME_LENGTH.min,
                                max: SHOP_NAME_LENGTH.max,
                            })
                            .withMessage(
                                `Shop name must be between ${SHOP_NAME_LENGTH.min} to ${SHOP_NAME_LENGTH.max} characters`
                            )
                    );
                    break;
            }
        });
        return validations;
    } catch (error) {
        return [new Error(error)];
    }
};

/**
 * Function to perform non-empty plus data format validation
 * Usecase: When all the data sent in request are required to be non-empty and valid format
 * @param {Array} dataArray - Array of data fields to be validated
 * @returns {Array} - Array of validation result
 */
const nonEmptyPlusDataFormatValidation = (dataArray) => {
    const nonEmptyValidationArray = nonEmptyDataValidation(dataArray);
    const dataFormatValidationArray = dataFormatValidation(dataArray);
    return nonEmptyValidationArray.concat(dataFormatValidationArray);
};

/**
 * Function to handle the validation result
 * @returns {Object} - response object
 */
const validationResultHandler = (req, res, next) => {
    try {
        let errorLists = validationResult(req);
        if (errorLists.isEmpty()) {
            return next();
        }
        return res.status(422).send({
            message: "Validation failed",
            error: errorLists.array()[0],
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
        });
    }
};

module.exports = {
    dataFormatValidation,
    nonEmptyDataValidation,
    validationResultHandler,
    nonEmptyPlusDataFormatValidation,
};
