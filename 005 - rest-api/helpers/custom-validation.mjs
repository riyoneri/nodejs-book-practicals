import { validationResult } from "express-validator";

const defaultValidationResults = validationResult.withDefaults({
  formatter: (error) => ({
    [error.path]: { location: error.location, message: error.msg },
  }),
});
const customValidationResult = (request) => {
  return defaultValidationResults(request).array({ onlyFirstError: true });
};
export default customValidationResult;
