import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from 'components/hook-form';
import { FormSchema } from './schema';
import { useTranslations } from 'next-intl';
import {
  getRoles,
  getGenders,
  getNationalities,
  getIdentities,
  getStatuses,
  getCountries,
} from './drop-box-data';

type IOptions = {
  value: string;
  label: string;
};

export const defaultValues = {
  firstName: '',
  lastName: '',
  rolesAutocomplete: null,
  genderRadioGroup: '',
  startDate: null,
  nationalityAutocomplete: null,
  identityRadioGroup: '',
  statusRadioGroup: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  countryAutocomplete: null,
  phone: '',
  singleUpload: null,
  confirmationFirstName: '',
  confirmationLastName: '',
};

export default function ReactHookForm() {
  const t = useTranslations('VerificationPage');

  const { replace } = useRouter();

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', data);
      replace('/verification/done');
    } catch (error) {
      throw error;
    }
  });

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('singleUpload', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      {isSubmitting && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          gap={5}
          display="grid"
          maxWidth="600px"
          margin="0 auto"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
          }}
        >
          <Stack spacing={7}>
            <Typography align="center" variant="h2">
              {t('mainTitle')}
            </Typography>

            <Typography align="center" variant="body1" mt={-3} fontSize={38}>
              {t('identitySectionTitle')}
            </Typography>

            <Block label={t('nameOfTheApplicant')}>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <RHFTextField name="firstName" label={t('namePlaceholder')} />
                <RHFTextField name="lastName" label={t('surnamePlaceholder')} />
              </Stack>
            </Block>

            <Block label={t('role')}>
              <RHFAutocomplete
                style={{ width: '290px' }}
                name="rolesAutocomplete"
                label={t('rolePlaceholder')}
                options={getRoles()}
                getOptionLabel={(option: IOptions | string) => (option as IOptions).label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
            </Block>

            <Block label={t('gender')}>
              <RHFRadioGroup row name="genderRadioGroup" spacing={32} options={getGenders()} />
            </Block>

            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <Block label={t('dateOfBirth')}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={t('dateOfBirthPlaceholder')}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Block>

              <Block label={t('nationality')}>
                <RHFAutocomplete
                  name="nationalityAutocomplete"
                  label={t('nationalityPlaceholder')}
                  options={getNationalities()}
                  getOptionLabel={(option: IOptions | string) => (option as IOptions).label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                />
              </Block>
            </Stack>

            <Block label={t('proofOfIdentity')}>
              <RHFRadioGroup name="identityRadioGroup" options={getIdentities()} />
            </Block>

            <Typography align="center" variant="body1" fontSize={38}>
              {t('adressSectionTitle')}
            </Typography>

            <Block label={t('status')}>
              <RHFRadioGroup name="statusRadioGroup" options={getStatuses()} />
            </Block>

            <Block label={t('correspondenceAdress')}>
              <RHFTextField name="street" label={t('street')} />

              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Block>
                  <RHFTextField name="city" label={t('cityPlaceholder')} />
                </Block>

                <Block>
                  <RHFTextField name="state" label={t('statePlaceholder')} />
                </Block>
              </Stack>

              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Block>
                  <RHFTextField name="zip" label={t('zipPlaceholder')} />
                </Block>

                <Block>
                  <RHFAutocomplete
                    name="countryAutocomplete"
                    label={t('countryPlaceholder')}
                    options={getCountries()}
                    getOptionLabel={(option: IOptions | string) => (option as IOptions).label}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        <img
                          key={option.value}
                          style={{ marginRight: '15px' }}
                          loading="lazy"
                          width="20"
                          srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
                          src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                          alt=""
                        />
                        {option.label}
                      </li>
                    )}
                  />
                </Block>
              </Stack>
            </Block>

            <Block label={t('phoneNumber')}>
              <RHFTextField
                style={{ width: '290px' }}
                name="phone"
                label="(000) 000-0000"
                type="number"
                inputProps={{
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            </Block>

            <Typography align="center" variant="body1" fontSize={38}>
              {t('fileSectionTitle')}
            </Typography>

            <Block label={t('drag&DropTitle')}>
              <RHFUpload
                name="singleUpload"
                maxSize={5000000}
                onDrop={handleDropSingleFile}
                onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
              />
            </Block>

            <Typography align="center" variant="body1" fontSize={38}>
              {t('declarationSectionTitle')}
            </Typography>

            <Typography align="justify" variant="body1" fontSize={16}>
              {t('declarationText')}
            </Typography>

            <Block label={t('signature')}>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <RHFTextField name="confirmationFirstName" label={t('namePlaceholder')} />

                <RHFTextField name="confirmationLastName" label={t('surnamePlaceholder')} />
              </Stack>
            </Block>

            <LoadingButton
              fullWidth
              color="info"
              size="large"
              type="submit"
              variant="outlined"
              loading={isSubmitting}
              style={{ marginBottom: '70px' }}
            >
              {t('submitButton')}
            </LoadingButton>
          </Stack>
        </Box>
      </FormProvider>
    </>
  );
}

interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

function Block({ label = '', sx, children }: BlockProps) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'left',
          fontSize: '20px',
          marginBottom: '7px',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
