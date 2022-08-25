// Using express-validator to validate the data sent in the request body.
const { check, validationResult } = require("express-validator");
const { USER_TYPES, OTP_LENGTH } = require("../constants");

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
                case "email":
                    validations.push(
                        check(data)
                            .isEmail()
                            .withMessage("The provided email is invalid")
                    );
                    break;
                case "password":
                    validations.push(
                        check(data)
                            .isLength({ min: 6, max: 20 })
                            .withMessage(
                                "Password must be between 6 and 20 characters"
                            )
                    );
                    break;
                case "firstName" || "lastName" || "middleName":
                    validations.push(
                        check(data)
                            .optional()
                            .isLength({ min: 3, max: 30 })
                            .withMessage(
                                "Name must be between 3 and 30 characters"
                            )
                    );
                    break;
                case "phone":
                    validations.push(
                        check(data)
                            .isLength({ min: 10, max: 15 })
                            .withMessage(
                                "Length of contact number must be between 10 to 15"
                            )
                    );
                    break;
                case "address":
                    validations.push(
                        check(data)
                            .isLength({ min: 10 })
                            .withMessage(
                                "Address field must be between 10 to 200 characters"
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
