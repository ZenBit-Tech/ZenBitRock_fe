/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { useSnackbar } from 'notistack';
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
import { selectCurrentUser } from 'store/auth/authReducer';
import { VerificationData } from 'types/verification-data';
import { useCreateAgentMutation, useCreateContactMutation } from 'store/api/qobrixApi';
import { useGetUserByIdMutation, useUpdateUserMutation } from 'store/api/userApi';
import { getRoles, getGenders, getIdentities, getStatuses, getCountries } from './drop-box-data';
import { FormSchema } from './schema';

type IOptions = {
  value: string;
  label: string;
};

const defaultValues = {
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
};

const FIVE_MEGABYTES: number = 5000000;

function formatDate(inputDate: Date): string {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function VerificationForm(): JSX.Element {
  const t = useTranslations('VerificationPage');

  const [createVerification] = useCreateVerificationMutation();
  const [createContact] = useCreateContactMutation();
  const [createAgent] = useCreateAgentMutation();
  const [getUserById] = useGetUserByIdMutation();
  const [updateUser] = useUpdateUserMutation();

  const [formFilled, setFormFilled] = useState<boolean>(true);
  const [activeRequestsCount, setActiveRequestsCount] = useState<number>(0);

  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const authState = useSelector(selectCurrentUser);
  const userId = authState.user ? authState.user.id : null;

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: 'onTouched',
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

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setActiveRequestsCount((prevCount) => prevCount + 1);

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

    formData.append('file', singleUpload);
    if (userId) formData.append('userId', userId);
    formData.append('firstName', firstName as VerificationData['firstName']);
    formData.append('lastName', lastName as VerificationData['lastName']);
    formData.append('role', rolesAutocomplete.value);
    formData.append('gender', genderRadioGroup as VerificationData['genderRadioGroup']);
    formData.append('dateOfBirth', formatDate(dateOfBirth));
    formData.append('nationality', nationalityAutocomplete.value);
    formData.append('identity', identityRadioGroup as VerificationData['identityRadioGroup']);
    formData.append('status', statusRadioGroup as VerificationData['statusRadioGroup']);
    formData.append('street', street as VerificationData['street']);
    formData.append('city', city as VerificationData['city']);
    formData.append('state', state as VerificationData['state']);
    formData.append('zip', zip as VerificationData['zip']);
    formData.append('country', countryAutocomplete.value);
    formData.append('phone', phone as VerificationData['phone']);

    try {
      await createVerification(formData).unwrap();

      const user = await getUserById({ id: userId }).unwrap();

      const {
        city,
        country,
        dateOfBirth,
        email,
        firstName,
        id,
        lastName,
        nationality,
        phone,
        role,
        state,
        street,
        zip,
      } = user;

      const contactData = {
        first_name: firstName,
        last_name: lastName,
        role,
        birthdate: dateOfBirth,
        nationality,
        street,
        country,
        state,
        city,
        post_code: zip,
        email,
        phone,
        legacy_id: id,
      };

      const contact = await createContact(contactData).unwrap();
      const { role: agentRole, legacy_id, id: qobrixContactId } = contact.data;

      const agentData = {
        agent_type: agentRole,
        legacy_id,
        primary_contact: qobrixContactId,
      };

      const agent = await createAgent(agentData).unwrap();
      const { id: qobrixAgentId } = agent.data;

      const newQobrixData = { userId, qobrixContactId, qobrixAgentId };

      await updateUser(newQobrixData).unwrap();

      reset();
      replace(AppRoute.VERIFICATION_DONE_PAGE);

      return undefined;
    } catch (error) {
      enqueueSnackbar('Something went wrong, please try again', { variant: 'error' });

      return error;
    } finally {
      setActiveRequestsCount((prevCount) => prevCount - 1);
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
      {activeRequestsCount > 0 && (
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
            <Typography align="center" variant="h1" sx={{ mb: '15px' }}>
              {t('mainTitle')}
            </Typography>

            <Typography align="center" variant="h3" mt={-3}>
              {t('identitySectionTitle')}
            </Typography>

            <Block label={t('nameOfTheApplicant')}>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <RHFTextField
                  name="firstName"
                  label={t('nameLabel')}
                  placeholder={t('namePlaceholder')}
                  sx={{ height: '80px' }}
                />

                <RHFTextField
                  name="lastName"
                  label={t('surnameLabel')}
                  placeholder={t('surnamePlaceholder')}
                  sx={{ height: '80px' }}
                />
              </Stack>
            </Block>

            <Block label={t('role')}>
              <RHFAutocomplete
                name="rolesAutocomplete"
                label={t('roleLabel')}
                placeholder={t('rolePlaceholder')}
                options={getRoles(t)}
                getOptionLabel={(option: IOptions | string) => (option as IOptions).label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                sx={{
                  '@media (min-width: 650px)': {
                    width: '290px',
                  },
                  height: '70px',
                }}
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
                          onBlur: () => field.onBlur(),
                        },
                      }}
                      sx={{ height: '70px' }}
                    />
                  )}
                />
              </Block>

              <Block label={t('nationality')}>
                <RHFAutocomplete
                  name="nationalityAutocomplete"
                  label={t('nationalityLabel')}
                  placeholder={t('nationalityPlaceholder')}
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
                  sx={{ height: '70px' }}
                />
              </Block>
            </Stack>

            <Block label={t('proofOfIdentity')}>
              <RHFRadioGroup name="identityRadioGroup" options={getIdentities(t)} />
            </Block>

            <Block label={t('status')}>
              <RHFRadioGroup name="statusRadioGroup" options={getStatuses(t)} />
            </Block>

            <Typography align="center" variant="h3">
              {t('adressSectionTitle')}
            </Typography>

            <Block label={t('correspondenceAdress')}>
              <RHFTextField
                name="street"
                label={t('streetLabel')}
                placeholder={t('streetPlaceholder')}
                sx={{ height: '90px' }}
              />

              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Block>
                  <RHFTextField
                    name="city"
                    label={t('cityLabel')}
                    placeholder={t('cityPlaceholder')}
                    sx={{ height: '90px' }}
                  />
                </Block>

                <Block>
                  <RHFTextField
                    name="state"
                    label={t('stateLabel')}
                    placeholder={t('statePlaceholder')}
                    sx={{ height: '90px' }}
                  />
                </Block>
              </Stack>

              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Block>
                  <RHFTextField
                    name="zip"
                    label={t('zipLabel')}
                    placeholder={t('zipPlaceholder')}
                    sx={{ height: '90px' }}
                  />
                </Block>

                <Block>
                  <RHFAutocomplete
                    name="countryAutocomplete"
                    label={t('countryLabel')}
                    placeholder={t('countryPlaceholder')}
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
                    style={{ height: '70px' }}
                  />
                </Block>
              </Stack>
            </Block>

            <Block label={t('phoneNumber')}>
              <RHFTextField
                name="phone"
                label={t('phoneNumberLabel')}
                placeholder={t('phoneNumberPlaceholder')}
                type="tel"
                inputProps={{
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                sx={{
                  '@media (min-width: 650px)': {
                    width: '290px',
                  },
                  height: '70px',
                }}
              />
            </Block>

            <Typography align="center" variant="h3">
              {t('fileSectionTitle')}
            </Typography>

            <Block label={t('drag&DropTitle')}>
              <RHFUpload
                name="singleUpload"
                maxSize={FIVE_MEGABYTES}
                onDrop={handleDropSingleFile}
                onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
                helperText={t('fileHelperText')}
                sx={{ height: '400px' }}
              />
            </Block>

            <Typography align="center" variant="h3">
              {t('declarationSectionTitle')}
            </Typography>

            <Block
              sx={{
                '@media (min-width: 500px)': {
                  height: '130px',
                },
                height: '180px',
              }}
            >
              <RHFCheckbox
                name="confirmationCheckbox"
                checked={false}
                label={t('declarationText')}
                sx={{
                  textAlign: 'justify',
                  display: 'flex',
                  alignItems: 'start',
                }}
              />
            </Block>

            <LoadingButton
              fullWidth
              color="info"
              size="large"
              type="submit"
              variant="outlined"
              loading={isSubmitting}
              disabled={!formFilled}
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

export interface BlockProps extends StackProps {
  label?: string;
  children: React.ReactNode;
}

export function Block({ label = '', sx, children }: BlockProps) {
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
