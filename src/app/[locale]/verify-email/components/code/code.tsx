import { Box, Button } from '@mui/material';
import {
  CodeWrapper,
  ExpireWrapper,
  FormWrapper,
  StyledParagraphCode,
  StyledRHFTextField,
  StyledSendAgain,
} from './styles';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import FormProvider from 'components/hook-form/form-provider';
import { useCode } from '../../hooks/use-code.hook';

const Code = () => {
  const t = useTranslations('VerifyEmail');

  const form = useForm();

  const { code, handleCodeChange } = useCode(6);

  const handleFormSubmit = () => {
    //TODO
  };
  return (
    <FormProvider methods={form} onSubmit={handleFormSubmit}>
      <FormWrapper>
        <StyledParagraphCode> {t('code')}</StyledParagraphCode>
        <CodeWrapper>
          {code.map((_, index) => (
            <StyledRHFTextField
              name=""
              type="number"
              key={index}
              value={code[index]}
              inputProps={{
                'data-value': index,
              }}
              onChange={handleCodeChange}
            />
          ))}
        </CodeWrapper>
        <ExpireWrapper>
          <Box component="p">{t('expire')}</Box>
          <StyledSendAgain> {t('sendAgain')}</StyledSendAgain>
        </ExpireWrapper>
        <Button type="submit" variant="contained" sx={{ my: '35px', height: 40 }} fullWidth>
          {t('verify')}
        </Button>
      </FormWrapper>
    </FormProvider>
  );
};

export { Code };
