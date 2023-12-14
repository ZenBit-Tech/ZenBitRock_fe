/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'components/hook-form';
// import { AppRoute } from 'enums';
import RHFTextArea from 'components/hook-form/rhf-text-area';
import { UserProfileResponse } from 'store/auth/lib/types';
import {
  ICountOfBedroomsValues,
  IValues,
  getCountOfBedrooms,
  getEnquiryTypes,
  getOfferTypes,
} from './drop-box-data';
import { FormSchema } from './schema';

type Props = {
  user: UserProfileResponse;
};

const defaultValues = {
  offeringType: null,
  leadSource: '',
  description: '',
  enquiryType: null,
  countOfBedrooms: null,
  totalAreaFrom: 0,
  totalAreaTo: 0,
};

export default function Form({ user }: Props): JSX.Element {
  const t = useTranslations('CreateLeadPage');

  const [formFilled, setFormFilled] = useState<boolean>(true);
  const [activeRequestsCount, setActiveRequestsCount] = useState<number>(0);

  // const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { qobrixAgentId, qobrixContactId } = user;

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    watch,
    // reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const watchAllFields = watch();

  useEffect(() => {
    const fieldsToExclude = [
      'leadSource',
      'description',
      'countOfBedrooms',
      'totalAreaFrom',
      'totalAreaTo',
    ];
    const isFormFilled = Object.entries(watchAllFields).every(
      ([key, value]) => fieldsToExclude.includes(key) || Boolean(value)
    );

    setFormFilled(isFormFilled);
  }, [watchAllFields]);

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setActiveRequestsCount((prevCount) => prevCount + 1);

    const {
      offeringType,
      leadSource,
      description,
      enquiryType,
      countOfBedrooms,
      totalAreaFrom,
      totalAreaTo,
    } = data;

    const requestData = {
      agent: qobrixAgentId,
      contact_name: qobrixContactId,
      buy_rent: offeringType.value,
      description,
      source_description: leadSource,
      enquiry_type: enquiryType.value,
      bedrooms_from: countOfBedrooms?.value || 0,
      total_area_from_amount: totalAreaFrom,
      total_area_to_amount: totalAreaTo,
    };

    try {
      console.log(requestData);

      // reset();
      // replace(AppRoute.LEADS_PAGE);

      return undefined;
    } catch (error) {
      enqueueSnackbar(t('generalErrorMessage'), { variant: 'error' });

      return error;
    } finally {
      setActiveRequestsCount((prevCount) => prevCount - 1);
    }
  });

  return (
    <>
      {activeRequestsCount > 0 && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          gap={1}
          display="grid"
          maxWidth="600px"
          margin="0 auto"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
          }}
        >
          <Stack spacing={1}>
            <Typography align="center" variant="h2" sx={{ mb: '20px' }}>
              {t('mainTitle')}
            </Typography>

            <Block label={t('offeringTypeLabel')}>
              <RHFAutocomplete
                name="offeringType"
                placeholder={t('offeringTypePlaceholder')}
                options={getOfferTypes(t)}
                getOptionLabel={(option: IValues | string) => (option as IValues).label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                sx={{ height: '80px' }}
              />
            </Block>

            <Block label={t('leadSourceLabel')}>
              <RHFTextArea
                name="leadSource"
                placeholder={t('leadSourcePlaceholder')}
                rows={3}
                sx={{ height: '125px' }}
              />
            </Block>

            <Block label={t('descriptionLabel')}>
              <RHFTextArea
                name="description"
                placeholder={t('descriptionPlaceholder')}
                rows={3}
                sx={{ height: '125px' }}
              />
            </Block>

            <Block label={t('enquiryTypeLabel')}>
              <RHFAutocomplete
                name="enquiryType"
                placeholder={t('enquiryTypePlaceholder')}
                options={getEnquiryTypes(t)}
                getOptionLabel={(option: IValues | string) => (option as IValues).label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                sx={{ height: '80px' }}
              />
            </Block>

            <Block label={t('countOfBedroomsLabel')}>
              <RHFAutocomplete
                name="countOfBedrooms"
                placeholder={t('countOfBedroomsPlaceholder')}
                options={getCountOfBedrooms()}
                getOptionLabel={(option: ICountOfBedroomsValues | string) =>
                  (option as ICountOfBedroomsValues).label
                }
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                sx={{ height: '80px' }}
              />
            </Block>

            <Block label={t('totalAreaLabel')}>
              <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                <RHFTextField
                  name="totalAreaFrom"
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 10000,
                  }}
                  placeholder={t('totalAreaFromPlaceHolder')}
                  sx={{ height: '80px', mr: '50px' }}
                />

                <RHFTextField
                  name="totalAreaTo"
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 10000,
                  }}
                  placeholder={t('totalAreaToPlaceHolder')}
                  sx={{ height: '80px' }}
                />
              </Block>
            </Block>

            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              loading={isSubmitting}
              disabled={!formFilled || !isValid}
              sx={{ marginBottom: '90px' }}
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
