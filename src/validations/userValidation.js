const Joi = require("joi");

const createUserValidation = Joi.object({
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

  username: Joi.string()
    .min(2)
    .max(50)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Username type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `Username type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Username type cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "Username type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  email: Joi.string()
    .email()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Email type is not allowed to be empty";
            break;
          case "string.email":
            err.message = "Email must be a valid email";
            break;
          case "any.required":
            err.message = "Email type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  password: Joi.string()
    .min(2)
    .max(50)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Password type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `Password type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Password type cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "Password type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  role: Joi.string()
    .valid("admin", "teacher", "student", "public")
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        console.log(err);
        switch (err.code) {
          case "string.empty":
            err.message = "Role type is not allowed to be empty";
            break;
          case "any.only":
            err.message = `Role must be one of ${err.local?.valids}`;
            break;
          case "any.required":
            err.message = "Role type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const updateUserValidation = Joi.object({
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

  username: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Username type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `Username type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Username type cannot exceed ${err.local.limit} characters`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  email: Joi.string()
    .email()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Email type is not allowed to be empty";
            break;
          case "string.email":
            err.message = "Email must be a valid email";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  role: Joi.string()
    .valid("admin", "teacher", "student", "public")
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        console.log(err);
        switch (err.code) {
          case "string.empty":
            err.message = "Role type is not allowed to be empty";
            break;
          case "any.only":
            err.message = `Role must be one of ${err.local?.valids}`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = {
  createUserValidation,
  updateUserValidation,
};
