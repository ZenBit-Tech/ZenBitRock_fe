import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useUpdateUserMutation, useSetAvatarMutation } from 'store/api/userApi';
import { useRouter } from 'routes/hooks';
import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';
import { IUserUpdateProfile } from 'types/user';
import { fData } from 'utils/format-number';
import { countries } from 'assets/data';
import Iconify from 'components/iconify';
import { useSnackbar } from 'components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar, RHFAutocomplete } from 'components/hook-form';
import RHFTextArea from 'components/hook-form/rhf-text-area';
import {
  findCountryCodeByLabel,
  findCountryLabelByCode,
} from 'sections/verification-view/drop-box-data';
import { UserProfileResponse } from 'store/auth/lib/types';
import { formatRole, revertFormatRole } from './service';

type Props = {
  user: UserProfileResponse;
};

function getRoles(): string[] {
  const roles = ['Agent', 'Agency', ''];

  return roles;
}

export default function UserNewEditForm({ user }: Props): JSX.Element {
  const router = useRouter();
  const [updateUser] = useUpdateUserMutation();
  const [setAvatar] = useSetAvatarMutation();
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations('editProfilePage');

  const [selectedValue, setSelectedValue] = useState<string>('');
  const shouldRenderAgency = selectedValue === getRoles()[1];

  const {
    agencyName: stateAgency,
    email: stateEmail,
    role: stateRole,
    country: stateCountry,
    city: stateCity,
    phone: statePhone,
    description: stateDescription,
  } = user;

  const userId = user.id;

  useEffect(() => {
    if (stateRole) {
      setSelectedValue(revertFormatRole(stateRole));
    }
  }, [stateRole]);

  const handleRoleChange = (event: React.SyntheticEvent, newValue: string | string[] | null) => {
    setSelectedValue(newValue as string);
    setValue('role', newValue as string, { shouldValidate: true });
  };

  const EditUserSchema = Yup.object().shape({
    phone: Yup.string().required(t('phoneMessageReq')).matches(patterns.phone, t('phoneMessage')),
    country: Yup.string().required(t('countryMessageReq')),
    agency: Yup.string(),
    role: Yup.string().required(t('roleMessage')),
    about: Yup.string().required(t('aboutMessage')),
    avatar: Yup.mixed().nullable(),
    city: Yup.string().required(t('aboutMessage')),
  });

  const defaultValues = useMemo(
    () => ({
      phone: statePhone || '',
      email: stateEmail || '',
      role: revertFormatRole(stateRole) || '',
      country: findCountryLabelByCode(stateCountry) || '',
      city: stateCity || '',
      agency: stateAgency || '',
      avatar: null,
      about: stateDescription || '',
    }),
    [statePhone, stateEmail, stateRole, stateCountry, stateCity, stateAgency, stateDescription]
  );

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    const { phone, role, country, city, agency, about, avatar } = data;

    const countryCode = findCountryCodeByLabel(country);

    const updatedUser: IUserUpdateProfile = {};

    updatedUser.userId = userId;
    updatedUser.country = countryCode ?? stateCountry;
    updatedUser.role = formatRole(role) ?? stateRole;
    updatedUser.phone = phone ? phone : statePhone;
    updatedUser.city = city ? city : stateCity;
    updatedUser.agencyName = agency ?? stateAgency;
    updatedUser.description = about ? about : stateDescription;

    const formData = new FormData();

    if (avatar && avatar instanceof Blob) {
      formData.append('file', avatar);
      formData.append('userId', userId);
    }

    try {
      const successMessage = t('updateText');

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await updateUser(updatedUser).unwrap();

      if (avatar) await setAvatar(formData).unwrap();

      enqueueSnackbar(successMessage, { variant: 'success' });
    } catch (error) {
      const errorMessage = t('errorText');

      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatar', newFile, { shouldValidate: true });
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
                name="avatar"
                onDrop={handleDrop}
                maxSize={3145728}
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
              <RHFTextField name="phone" label={t('phoneNumLabel')} />
              <RHFAutocomplete
                name="role"
                label={t('rolePlaceholder')}
                options={getRoles()}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) =>
                  option.trim().toLowerCase() === value.trim().toLowerCase()
                }
                onChange={handleRoleChange}
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
              {shouldRenderAgency && <RHFTextField name="agency" label={t('companyLabel')} />}

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
              <Button
                type="reset"
                variant="contained"
                color="primary"
                onClick={() => router.push(AppRoute.PROFILE_PAGE)}
              >
                {t('cancelBtnTxt')}
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {t('saveBtnTxt')}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
