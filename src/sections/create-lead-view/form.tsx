/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { AppRoute } from 'enums';
import { leadStatuses } from 'constants/leadStatuses';
import { UserProfileResponse } from 'store/auth/lib/types';
import { useCreateLeadMutation } from 'store/api/qobrixApi';
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
  priceRahgeRentFrom: 0,
  priceRahgeRentTo: 0,
  priceRahgeSellFrom: 0,
  priceRahgeSellTo: 0,
};

export default function Form({ user }: Props): JSX.Element {
  const t = useTranslations('CreateLeadPage');

  const [activeRequestsCount, setActiveRequestsCount] = useState<number>(0);
  const [formFilled, setFormFilled] = useState<boolean>(true);
  const [isEnquiryTypeRent, setIsEnquiryTypeRent] = useState<boolean>(false);
  const [isEnquiryTypeSell, setIsEnquiryTypeSell] = useState<boolean>(false);

  const [createLead] = useCreateLeadMutation();

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { qobrixAgentId, qobrixContactId } = user;

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods;

  const watchAllFields = watch();

  useEffect(() => {
    setIsEnquiryTypeRent(watchAllFields.offeringType?.value === 'to_rent');
    setIsEnquiryTypeSell(watchAllFields.offeringType?.value === 'to_sell');
  }, [watchAllFields.offeringType?.value]);

  useEffect(() => {
    if (!isEnquiryTypeRent) {
      setValue('priceRahgeRentFrom', 0);
      setValue('priceRahgeRentTo', 0);
    }
    if (!isEnquiryTypeSell) {
      setValue('priceRahgeSellFrom', 0);
      setValue('priceRahgeSellTo', 0);
    }
  }, [isEnquiryTypeRent, isEnquiryTypeSell, setValue]);

  useEffect(() => {
    let fieldsToInclude = [];

    if (isEnquiryTypeRent) {
      fieldsToInclude = ['offeringType', 'enquiryType', 'priceRahgeRentFrom', 'priceRahgeRentTo'];
    } else if (isEnquiryTypeSell) {
      fieldsToInclude = ['offeringType', 'enquiryType', 'priceRahgeSellFrom', 'priceRahgeSellTo'];
    } else {
      fieldsToInclude = ['offeringType', 'enquiryType'];
    }
    const isFormFilled = fieldsToInclude.every((key) =>
      Boolean(watchAllFields[key as keyof typeof watchAllFields])
    );

    setFormFilled(isFormFilled);
  }, [isEnquiryTypeRent, isEnquiryTypeSell, watchAllFields]);

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
      priceRahgeRentFrom,
      priceRahgeRentTo,
      priceRahgeSellFrom,
      priceRahgeSellTo,
    } = data;

    const requestData = {
      conversion_status: leadStatuses.NEW.id,
      agent: qobrixAgentId,
      contact_name: qobrixContactId,
      buy_rent: offeringType.value,
      description,
      source_description: leadSource,
      enquiry_type: enquiryType.value,
      bedrooms_from: countOfBedrooms?.value || null,
      total_area_from_amount: totalAreaFrom || null,
      total_area_to_amount: totalAreaTo || null,
      list_selling_price_from: priceRahgeSellFrom || null,
      list_selling_price_to: priceRahgeSellTo || null,
      list_rental_price_from: priceRahgeRentFrom || null,
      list_rental_price_to: priceRahgeRentTo || null,
    };

    try {
      await createLead(requestData).unwrap();
      push(AppRoute.LEADS_PAGE);
      reset();

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
              <RHFTextField
                name="leadSource"
                placeholder={t('leadSourcePlaceholder')}
                multiline
                rows={3}
                sx={{ height: '125px' }}
              />
            </Block>

            <Block label={t('descriptionLabel')}>
              <RHFTextField
                name="description"
                multiline
                rows={3}
                placeholder={t('descriptionPlaceholder')}
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
                    min: watchAllFields.totalAreaFrom || 0,
                    max: 10000,
                  }}
                  placeholder={t('totalAreaToPlaceHolder')}
                  sx={{ height: '80px' }}
                />
              </Block>
            </Block>

            {isEnquiryTypeRent ? (
              <Block label={t('priceRahgeRentLabel')}>
                <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                  <RHFTextField
                    name="priceRahgeRentFrom"
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 10000000,
                    }}
                    placeholder={t('priceRahgeRentFromPlaceholder')}
                    sx={{ height: '80px', mr: '50px' }}
                  />

                  <RHFTextField
                    name="priceRahgeRentTo"
                    type="number"
                    inputProps={{
                      min: watchAllFields.priceRahgeRentFrom || 0,
                      max: 10000000,
                    }}
                    placeholder={t('priceRahgeRentToPlaceholder')}
                    sx={{ height: '80px' }}
                  />
                </Block>
              </Block>
            ) : null}

            {isEnquiryTypeSell ? (
              <Block label={t('priceRahgeSellLabel')}>
                <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                  <RHFTextField
                    name="priceRahgeSellFrom"
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 10000000,
                    }}
                    placeholder={t('priceRahgeSellFromPlaceholder')}
                    sx={{ height: '80px', mr: '50px' }}
                  />

                  <RHFTextField
                    name="priceRahgeSellTo"
                    type="number"
                    inputProps={{
                      min: watchAllFields.priceRahgeSellFrom || 0,
                      max: 10000000,
                    }}
                    placeholder={t('priceRahgeSellToPlaceholder')}
                    sx={{ height: '80px' }}
                  />
                </Block>
              </Block>
            ) : null}

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
