import FormHelperText from '@mui/material/FormHelperText';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
};

export default function RHFCode({ name, ...other }: RHFCodesProps) {
  const { control } = useFormContext();
  const t = useTranslations('yup');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
            }}
            {...other}
          />

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {t(error.message)}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
