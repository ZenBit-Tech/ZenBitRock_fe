import * as Yup from 'yup';

const CODE_LENGTH = 6;

const VerifySchema = Yup.object().shape({
  code: Yup.string().min(CODE_LENGTH, 'code_too_short').required('code_is_required'),
  email: Yup.string().required('email_is_required').email('valid_email'),
});

export { VerifySchema };
