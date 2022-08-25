// Using express-validator to validate the data sent in the request body.
const { check, validationResult } = require("express-validator");

const nonEmptyDataValidation = (dataArray) => {
    const validations = [];
    dataArray.forEach((data) => {
        validations.push(check(data).not().isEmpty());
    });
    return validations;
};
