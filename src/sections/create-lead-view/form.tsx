/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState, useRouter, useTranslations } from 'hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash';
import { useSnackbar } from 'notistack';
import FormProvider, { RHFAutocomplete, RHFRadioGroup, RHFTextField } from 'components/hook-form';
import { AppRoute } from 'enums';
import { LocationSelectOption, QobrixCreateLead } from 'types';
import { getLocationOptions } from 'utils';
import { leadStatuses } from 'constants/leadStatuses';
import { UserProfileResponse } from 'types/user-backend/user-profile-response.type';
import { useCreateLeadMutation, useSearchLocationsQuery } from 'store/api/qobrixApi';
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
  offeringType: 'to_buy',
  leadSource: '',
  description: '',
  enquiryType: null,
  countOfBedrooms: null,
  totalAreaFrom: 0,
  totalAreaTo: 0,
  priceRangeBuyFrom: 10000,
  priceRangeBuyTo: 10000000,
  priceRangeRentFrom: 100,
  priceRangeRentTo: 10000,
  locations: null,
};

const DEBOUNCE_DELAY: number = 1000;

export default function Form({ user }: Props): JSX.Element {
  const t = useTranslations('CreateLeadPage');

  const [activeRequestsCount, setActiveRequestsCount] = useState<number>(0);
  const [formFilled, setFormFilled] = useState<boolean>(false);
  const [locationsInputValue, setLocationsInputValue] = useState<string>('');

  const [createLead] = useCreateLeadMutation();
  const { data: searchLocationData, isLoading: isSearchLocationLoading } = useSearchLocationsQuery({
    find: locationsInputValue,
    page: 1,
  });

  const options = searchLocationData ? getLocationOptions(searchLocationData) : [];

  const handleInputChange = debounce((event: React.ChangeEvent<{}>, value: string) => {
    setLocationsInputValue(value);
  }, DEBOUNCE_DELAY);

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { qobrixAgentId, qobrixContactId } = user;

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: 'onChange',
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
    setValue('priceRangeRentFrom', 100);
    setValue('priceRangeRentTo', 10000);
    setValue('priceRangeBuyFrom', 10000);
    setValue('priceRangeBuyTo', 10000000);
  }, [watchAllFields.offeringType, setValue]);

  useEffect(() => {
    const fieldsToInclude =
      watchAllFields.offeringType === 'to_rent'
        ? ['offeringType', 'enquiryType', 'priceRangeRentFrom', 'priceRangeRentTo']
        : ['offeringType', 'enquiryType', 'priceRangeBuyFrom', 'priceRangeBuyTo'];

    const isFormFilled = fieldsToInclude.every((key) =>
      Boolean(watchAllFields[key as keyof typeof watchAllFields])
    );

    setFormFilled(isFormFilled);
  }, [watchAllFields]);

  useEffect(() => {
    methods.clearErrors();
  }, [
    methods,
    watchAllFields.priceRangeRentFrom,
    watchAllFields.priceRangeRentTo,
    watchAllFields.priceRangeBuyFrom,
    watchAllFields.priceRangeBuyTo,
    isValid,
  ]);

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
      priceRangeRentFrom,
      priceRangeRentTo,
      priceRangeBuyFrom,
      priceRangeBuyTo,
      locations,
    } = data;

    const requestData: QobrixCreateLead = {
      conversion_status: leadStatuses.NEW.id,
      agent: qobrixAgentId,
      contact_name: qobrixContactId,
      buy_rent: offeringType || null,
      description: description || null,
      source_description: leadSource || null,
      enquiry_type: enquiryType?.value,
      bedrooms_from: countOfBedrooms?.value,
      total_area_from_amount: totalAreaFrom || null,
      total_area_to_amount: totalAreaTo || null,
      locations: locations?.value,
    };

    if (watchAllFields.offeringType === 'to_buy') {
      requestData.list_selling_price_from = priceRangeBuyFrom;
      requestData.list_selling_price_to = priceRangeBuyTo;
    } else {
      requestData.list_rental_price_from = priceRangeRentFrom;
      requestData.list_rental_price_to = priceRangeRentTo;
    }

    try {
      await createLead(requestData).unwrap();
      push(AppRoute.LEADS_PAGE);
      reset(defaultValues);

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
            <Typography variant="h3" sx={{ mb: '20px' }}>
              {t('mainTitle')}
            </Typography>

            <Block label={t('offeringTypeLabel')}>
              <RHFRadioGroup
                row
                name="offeringType"
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                options={getOfferTypes(t)}
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

            <Block label={t('priceRangeLabel')} key={watchAllFields.offeringType}>
              {watchAllFields.offeringType === 'to_rent' ? (
                <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                  <RHFTextField
                    name="priceRangeRentFrom"
                    type="number"
                    placeholder={t('priceRangeRentFromPlaceholder')}
                    sx={{ height: '80px', mr: '50px' }}
                  />

                  <RHFTextField
                    name="priceRangeRentTo"
                    type="number"
                    placeholder={t('priceRangeRentToPlaceholder')}
                    sx={{ height: '80px' }}
                  />
                </Block>
              ) : (
                <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                  <RHFTextField
                    name="priceRangeBuyFrom"
                    type="number"
                    placeholder={t('priceRangeBuyFromPlaceholder')}
                    sx={{ height: '80px', mr: '50px' }}
                  />

                  <RHFTextField
                    name="priceRangeBuyTo"
                    type="number"
                    placeholder={t('priceRangeBuyToPlaceholder')}
                    sx={{ height: '80px' }}
                  />
                </Block>
              )}
            </Block>

            <Block label={t('locationsLabel')}>
              <RHFAutocomplete
                name="locations"
                placeholder={t('locationsPlaceholder')}
                options={options}
                getOptionLabel={(option: LocationSelectOption | string) =>
                  (option as LocationSelectOption).label
                }
                isOptionEqualToValue={(option, value) => option.label === value.label}
                onInputChange={handleInputChange}
                renderOption={(props, option) => (
                  <li {...props} key={option.key}>
                    {option.label}
                  </li>
                )}
                loading={isSearchLocationLoading}
                sx={{ height: '80px' }}
              />
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
