import * as Yup from 'yup';

const latinRegExp = /^([a-za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\s]*)$/gi;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const zipCodeRegExp = /^\d{5,10}(?:[-\s]\d{4})?$/;
const LEGAL_AGE = 18;

export const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Name is required')
    .min(2, 'Mininum 2 characters')
    .max(50, 'Maximum 50 characters')
    .matches(latinRegExp, 'Name can only contain latin letters.'),
  lastName: Yup.string()
    .required('Surname name is required')
    .min(2, 'Mininum 2 characters')
    .max(50, 'Maximum 50 characters')
    .matches(latinRegExp, 'Surname can only contain latin letters.'),
  rolesAutocomplete: Yup.mixed<any>().nullable().required('Role is required'),
  genderRadioGroup: Yup.string().required('Choose one option'),
  dateOfBirth: Yup.date<any>()
    .nullable()
    .required('Date of birth is required')
    .max(new Date(), "You can't be born in the future!")
    .test('dob', 'Should be greater than 18', function (value, ctx) {
      const dob = new Date(value);
      const validDate = new Date();
      const valid = validDate.getFullYear() - dob.getFullYear() >= LEGAL_AGE;
      return !valid ? ctx.createError() : valid;
    }),
  nationalityAutocomplete: Yup.mixed<any>().nullable().required('Nationality is required'),
  identityRadioGroup: Yup.string().required('Choose one option'),
  statusRadioGroup: Yup.string().required('Choose one option'),
  street: Yup.string()
    .required('Street is required')
    .min(5, 'Mininum 5 characters')
    .max(100, 'Maximum 100 characters')
    .matches(latinRegExp, 'Street can only contain latin letters.'),
  city: Yup.string()
    .required('Street is required')
    .min(2, 'Mininum 2 characters')
    .max(32, 'Maximum 32 characters')
    .matches(latinRegExp, 'City can only contain latin letters.'),
  state: Yup.string()
    .max(32, 'Maximum 32 characters')
    .matches(latinRegExp, 'Street can only contain latin letters.'),
  zip: Yup.string()
    .required('Zip code is required')
    .min(4, 'Mininum 4 characters')
    .max(32, 'Maximum 32 characters')
    .matches(zipCodeRegExp, 'Zip code is not valid'),
  countryAutocomplete: Yup.mixed<any>().nullable().required('Nationality is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .max(15, 'Maximum 15 characters')
    .matches(phoneRegExp, 'Phone number is not valid'),
  singleUpload: Yup.mixed<any>().nullable().required('File is required'),
  confirmationCheckbox: Yup.boolean().oneOf([true], 'Your agree is required'),
  confirmationFirstName: Yup.string()
    .required('Confirm Name is required')
    .oneOf([Yup.ref('firstName')], "Name's not match")
    .matches(latinRegExp, 'Name can only contain latin letters.'),
  confirmationLastName: Yup.string()
    .required('Confirm Surname is required')
    .oneOf([Yup.ref('lastName')], "Surname's not match")
    .matches(latinRegExp, 'Name can only contain latin letters.'),
});
