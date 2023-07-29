const Joi = require("joi");

const createStudentValidation = Joi.object({
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

  nik: Joi.string()
    .min(10)
    .max(16)
    .pattern(/^[0-9]+$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "NIK type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `NIK type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `NIK type cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "NIK type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  birthDate: Joi.date()
    .max(Date.now())
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        console.log(err);
        switch (err.code) {
          case "string.empty":
            err.message = "Birth date type is not allowed to be empty";
            break;
          case "string.max":
            err.message = `Birth date type cannot exceed ${err.local.limit} characters`;
            break;
          case "date.max":
            err.message = `Birth date must be less than or equal to ${err.local.limit}`;
            break;
          case "any.required":
            err.message = "Birth date type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  gradeLevel: Joi.number()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Grade level must be a number";
            break;
          case "any.required":
            err.message = "Birth date is required";
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
});

const updateStudentValidation = Joi.object({
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
          case "any.required":
            err.message = "Last name type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  nik: Joi.string()
    .min(10)
    .max(16)
    .pattern(/^[0-9]+$/)
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "NIK type is not allowed to be empty";
            break;
          case "string.min":
            err.message = `NIK type must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `NIK type cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "NIK type is required";
            break;
          default:
            break;
        }
      });
    }),

  birthDate: Joi.date()
    .max(Date.now())
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        console.log(err);
        switch (err.code) {
          case "string.empty":
            err.message = "Birth date type is not allowed to be empty";
            break;
          case "string.max":
            err.message = `Birth date type cannot exceed ${err.local.limit} characters`;
            break;
          case "date.max":
            err.message = `Birth date must be less than or equal to ${err.local.limit}`;
            break;
          case "any.required":
            err.message = "Birth date type is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  gradeLevel: Joi.number()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Grade level must be a number";
            break;
          case "any.required":
            err.message = "Birth date is required";
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
          case "any.required":
            err.message = "Phone number is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = {
  createStudentValidation,
  updateStudentValidation,
};
