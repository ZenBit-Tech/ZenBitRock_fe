import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
  RHFCheckbox,
} from 'components/hook-form';
import { useCreateVerificationMutation } from 'store/api/verificationApi';
import { datesFormats } from 'constants/dates-formats';
import { AppRoute } from 'enums';
import { VerificationData } from 'types/verification-data';
import { selectCurrentUser } from 'store/auth/authReducer';
import { getRoles, getGenders, getIdentities, getStatuses, getCountries } from './drop-box-data';
import { FormSchema } from './schema';

type IOptions = {
  value: string;
  label: string;
};

export const defaultValues = {
  firstName: '',
  lastName: '',
  rolesAutocomplete: null,
  genderRadioGroup: '',
  dateOfBirth: null,
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
  confirmationCheckbox: false,
  confirmationFirstName: '',
  confirmationLastName: '',
};

const STATUS_CODE_SUCCESS = 202;

function formatDate(inputDate: Date): string {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function Form(): JSX.Element {
  const t = useTranslations('VerificationPage');

  const [createVerification, { isLoading }] = useCreateVerificationMutation();
  const [formFilled, setFormFilled] = useState<boolean>(true);

  const { replace } = useRouter();

  const authState = useSelector(selectCurrentUser);
  const userId = authState.id;

  const methods = useForm<VerificationData>({
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

  const watchAllFields = watch();

  useEffect(() => {
    const fieldsToExclude = ['state'];
    const isFormFilled = Object.entries(watchAllFields).every(
      ([key, value]) => fieldsToExclude.includes(key) || Boolean(value)
    );

    setFormFilled(isFormFilled);
  }, [watchAllFields]);

  const onSubmit = handleSubmit(async (data: VerificationData): Promise<void> => {
    const {
      firstName,
      lastName,
      rolesAutocomplete,
      genderRadioGroup,
      dateOfBirth,
      nationalityAutocomplete,
      identityRadioGroup,
      statusRadioGroup,
      street,
      city,
      state,
      countryAutocomplete,
      zip,
      phone,
      singleUpload,
    } = data;
    const formData = new FormData();

    if (singleUpload) formData.append('file', singleUpload);
    if (userId) formData.append('userId', userId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    if (rolesAutocomplete) formData.append('role', rolesAutocomplete.value);
    formData.append('gender', genderRadioGroup);
    if (dateOfBirth) formData.append('dateOfBirth', formatDate(dateOfBirth));

    if (nationalityAutocomplete) formData.append('nationality', nationalityAutocomplete.value);
    formData.append('identity', identityRadioGroup);
    formData.append('status', statusRadioGroup);
    formData.append('street', street);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zip', zip);
    if (countryAutocomplete) formData.append('country', countryAutocomplete.value);
    formData.append('phone', phone);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      const response = await createVerification(formData).unwrap();

      if (response.statusCode === STATUS_CODE_SUCCESS) {
        replace(AppRoute.VERIFICATION_DONE_PAGE);
      }

      return undefined;
    } catch (error) {
      toast.error('Something went wrong, please try again');

      return error;
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
      {(isSubmitting || isLoading) && (
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
                options={getRoles(t)}
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
              <RHFRadioGroup row name="genderRadioGroup" spacing={32} options={getGenders(t)} />
            </Block>

            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <Block label={t('dateOfBirth')}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={t('dateOfBirthPlaceholder')}
                      maxDate={new Date()}
                      format={datesFormats.verificationDatePicker}
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

            <Block label={t('proofOfIdentity')}>
              <RHFRadioGroup name="identityRadioGroup" options={getIdentities(t)} />
            </Block>

            <Block label={t('status')}>
              <RHFRadioGroup name="statusRadioGroup" options={getStatuses(t)} />
            </Block>

            <Typography align="center" variant="body1" fontSize={38}>
              {t('adressSectionTitle')}
            </Typography>

            <Block label={t('correspondenceAdress')}>
              <RHFTextField name="street" label={t('street')} style={{ height: '80px' }} />

              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Block>
                  <RHFTextField
                    name="city"
                    label={t('cityPlaceholder')}
                    style={{ height: '80px' }}
                  />
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

            <RHFCheckbox
              name="confirmationCheckbox"
              checked={false}
              label={t('declarationText')}
              style={{
                textAlign: 'justify',
                display: 'flex',
                alignItems: 'start',
              }}
            />
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
              disabled={!formFilled}
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
