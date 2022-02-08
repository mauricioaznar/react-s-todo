const validate = (
  validationsRules: {
    required?: string;
    email?: string;
  },
  value: string,
) => {
  if (typeof validationsRules !== 'object' || validationsRules === null) {
    throw new Error('Validation rules is not an object');
  }
  const errors = [];
  for (const validationRule in validationsRules) {
    if (validationsRules.hasOwnProperty(validationRule)) {
      switch (validationRule) {
        case 'required':
          if (!isRequired(value)) {
            errors.push('Obligario');
          }
          break;
        case 'email':
          if (!isEmail(value)) {
            errors.push('Email');
          }
          break;
        default:
          break;
      }
    }
  }
  return errors;
};

const isEmail = (value: string) => {
  const regexExpression = new RegExp('^\\S+@\\S+$');
  return regexExpression.test(value);
};

const isRequired = (value: string) => {
  return value !== '';
};

export default validate;
