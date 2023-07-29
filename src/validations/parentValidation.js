const Joi = require("joi");

const createParentValidation = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "First name type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `First name type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `First name type cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "First name type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Last name type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `Last name type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Last name type cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "Last name type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(11)
    .max(12)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.pattern.base":
            err.message = "Phone number only contain number";
            break;
          case "string.min":
            err.message = `Phone number must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Phone number cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "Phone number is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  type: Joi.string()
    .valid("ayah", "ibu")
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Type is not allowed to be empty";
            break;
          case "any.only":
            err.message = "Type must be one of ayah or ibu";
            break;
          case "any.required":
            err.message = "Type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  address: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Address type is not allowed to be empty";
            break;
          case "any.required":
            err.message = "Address type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const updateParentValidation = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "First name type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `First name type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `First name type cannot exceed ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Last name type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `Last name type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Last name type cannot exceed ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(11)
    .max(12)
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.pattern.base":
            err.message = "Phone number only contain number";
            break;
          case "string.min":
            err.message = `Phone number must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Phone number cannot exceed ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  type: Joi.string()
    .valid("ayah", "ibu")
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Type is not allowed to be empty";
            break;
          case "any.only":
            err.message = "Type must be one of ayah or ibu";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  address: Joi.string()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Address type is not allowed to be empty";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = {
  createParentValidation,
  updateParentValidation,
};
