import * as Yup from 'yup';

const VerifySchema = Yup.object().shape({
  code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});

export { VerifySchema };
