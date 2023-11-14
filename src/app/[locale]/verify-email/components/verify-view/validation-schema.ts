import * as Yup from 'yup';

const CODE_LENGTH = 6;

const VerifySchema = Yup.object().shape({
  code: Yup.string()
    .min(CODE_LENGTH, `Code must be at least ${CODE_LENGTH} characters`)
    .required('Code is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});

export { VerifySchema };
