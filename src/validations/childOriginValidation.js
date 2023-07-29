const Joi = require("joi");

const createChildOriginValidation = Joi.object({
  studentId: Joi.number()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Student ID must be a number";
            break;
          case "any.required":
            err.message = "Student ID is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  enterAs: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
            err.message = "Enter As must be a string";
            break;
          case "string.empty":
            err.message = "Enter As is not allowed to be empty";
            break;
          case "any.required":
            err.message = "Enter As is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  nameSchool: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
            err.message = "Name school must be a string";
            break;
          case "string.empty":
            err.message = "Name school is not allowed to be empty";
            break;
          case "any.required":
            err.message = "Name school is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  certificateYear: Joi.string()
    .pattern(/^[0-9]+$/)
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
            err.message = "Certificate year must be a string";
            break;
          case "string.pattern.base":
            err.message = "Certificate year only contain number";
            break;
          case "string.empty":
            err.message = "Certificate year is not allowed to be empty";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  longStudy: Joi.number()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Long study must be a number";
            break;
          case "any.required":
            err.message = "Long study is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const updateChildOriginValidation = Joi.object({
  studentId: Joi.number()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Student ID must be a number";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  enterAs: Joi.string()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
            err.message = "Enter As must be a string";
            break;
          case "string.empty":
            err.message = "Enter As is not allowed to be empty";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  nameSchool: Joi.string()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
            err.message = "Name school must be a string";
            break;
          case "string.empty":
            err.message = "Name school is not allowed to be empty";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  certificateYear: Joi.string()
    .pattern(/^[0-9]+$/)
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
            err.message = "Certificate year must be a string";
            break;
          case "string.pattern.base":
            err.message = "Certificate year only contain number";
            break;
          case "string.empty":
            err.message = "Certificate year is not allowed to be empty";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  longStudy: Joi.number()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Long study must be a number";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = {
  createChildOriginValidation,
  updateChildOriginValidation,
};
