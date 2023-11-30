import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useRouter } from 'routes/hooks';
import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';
import { IUserEditItem } from 'types/user';
import { fData } from 'utils/format-number';
import { countries } from 'assets/data';
import Iconify from 'components/iconify';
import { useSnackbar } from 'components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar, RHFAutocomplete } from 'components/hook-form';
import RHFTextArea from 'components/hook-form/rhf-text-area';

type Props = {
  currentUser?: IUserEditItem;
};

function getRoles(): string[] {
  const roles = ['Agent', 'Agency'];

  return roles;
}

export default function UserNewEditForm({ currentUser }: Props): JSX.Element {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations('editProfilePage');

  const EditUserSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required(t('phoneMessageReq'))
      .matches(patterns.phone, t('phoneMessage')),
    country: Yup.string().required(t('countryMessageReq')),
    agency: Yup.string(),
    role: Yup.string().required(t('roleMessage')),
    about: Yup.string().required(t('aboutMessage')),
    avatarUrl: Yup.mixed().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      phoneNumber: currentUser?.phoneNumber || '',
      email: currentUser?.email || '',
      role: currentUser?.role || '',
      country: currentUser?.country || '',
      city: currentUser?.city || '',
      agency: currentUser?.agency || '',
      avatarUrl: currentUser?.avatarUrl || null,
      about: currentUser?.about || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (): Promise<void> => {
    try {
      const message = t('updateText');

      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 5, pb: 5, px: 3, height: '100%' }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    {t('helperText')}
                    <br />
                    {t('helperSubText')}
                    {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="email" label={t('emailLabel')} disabled />
              <RHFTextField name="phoneNumber" label={t('phoneNumLabel')} />
              <RHFAutocomplete
                name="role"
                label={t('rolePlaceholder')}
                options={getRoles()}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const label = getRoles().filter((role) => role === option)[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
              />
              <RHFTextField name="agency" label={t('companyLabel')} />

              <RHFAutocomplete
                name="country"
                label={t('countryPlaceholder')}
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />
              <RHFTextField name="city" label={t('city')} />
              <RHFTextArea name="about" label={t('aboutLabel')} />
            </Box>

            <Stack sx={{ mt: 3, flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
              <LoadingButton
                type="reset"
                variant="contained"
                onClick={() => router.push(AppRoute.PROFILE_PAGE)}
              >
                {t('cancelBtnTxt')}
              </LoadingButton>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {t('saveBtnTxt')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
