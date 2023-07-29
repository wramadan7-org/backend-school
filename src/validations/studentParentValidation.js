const Joi = require("joi");

const createStudentParentValidation = Joi.object({
  studentId: Joi.number()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Student ID must be number";
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

  parentId: Joi.number()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Parent ID must be number";
            break;
          case "any.required":
            err.message = "Parent ID is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const updateStudentParentValidation = Joi.object({
  studentId: Joi.number()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Student ID must be number";
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  parentId: Joi.number()
    .optional()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "number.base":
            err.message = "Parent ID must be number";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = {
  createStudentParentValidation,
  updateStudentParentValidation,
};
