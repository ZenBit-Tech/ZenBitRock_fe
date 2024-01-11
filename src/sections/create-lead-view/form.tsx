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
import {
  useCreateLeadMutation,
  useGetPropertyTypesQuery,
  useSearchLocationsQuery,
} from 'store/api/qobrixApi';
import { ranges } from 'constants/property-price-ranges';
import { QobrixLeadBuyRent } from 'enums/qobrix';
import { GoBackPageTitile } from 'components/custom';
import { ICountOfBedroomsValues, getCountOfBedrooms, getOfferTypes } from './drop-box-data';
import { FormSchema } from './schema';

type Props = {
  user: UserProfileResponse;
};

const defaultValues = {
  offeringType: QobrixLeadBuyRent.TO_BUY,
  leadSource: '',
  description: '',
  enquiryType: null,
  countOfBedrooms: null,
  totalAreaFrom: 0,
  totalAreaTo: 0,
  priceRangeBuyFrom: ranges.PRICE_RANGE_BUY_MIN,
  priceRangeBuyTo: ranges.PRICE_RANGE_BUY_MAX,
  priceRangeRentFrom: ranges.PRICE_RANGE_RENT_MIN,
  priceRangeRentTo: ranges.PRICE_RANGE_RENT_MAX,
  locations: null,
};

const DEBOUNCE_DELAY: number = 1000;

export default function Form({ user }: Props): JSX.Element {
  const t = useTranslations('CreateLeadPage');

  const [activeRequestsCount, setActiveRequestsCount] = useState<number>(0);
  const [formFilled, setFormFilled] = useState<boolean>(false);
  const [locationsInputValue, setLocationsInputValue] = useState<string>('');

  const [createLead] = useCreateLeadMutation();
  const { data: properties, isLoading: isPropertyTypeLoading } =
    useGetPropertyTypesQuery(undefined);
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
    trigger,
    formState: { isSubmitting, isValid },
  } = methods;

  const watchAllFields = watch();

  useEffect(() => {
    setValue('priceRangeRentFrom', ranges.PRICE_RANGE_RENT_MIN);
    setValue('priceRangeRentTo', ranges.PRICE_RANGE_RENT_MAX);
    setValue('priceRangeBuyFrom', ranges.PRICE_RANGE_BUY_MIN);
    setValue('priceRangeBuyTo', ranges.PRICE_RANGE_BUY_MAX);
  }, [watchAllFields.offeringType, setValue]);

  useEffect(() => {
    const fieldsToInclude =
      watchAllFields.offeringType === QobrixLeadBuyRent.TO_RENT
        ? ['offeringType', 'enquiryType', 'priceRangeRentFrom', 'priceRangeRentTo']
        : ['offeringType', 'enquiryType', 'priceRangeBuyFrom', 'priceRangeBuyTo'];

    const isFormFilled = fieldsToInclude.every((key) =>
      Boolean(watchAllFields[key as keyof typeof watchAllFields])
    );

    setFormFilled(isFormFilled);
  }, [watchAllFields]);

  useEffect(() => {
    trigger('totalAreaFrom');
    trigger('totalAreaTo');
  }, [trigger, watchAllFields.totalAreaFrom, watchAllFields.totalAreaTo]);

  useEffect(() => {
    trigger('priceRangeRentFrom');
    trigger('priceRangeRentTo');
  }, [trigger, watchAllFields.priceRangeRentFrom, watchAllFields.priceRangeRentTo]);

  useEffect(() => {
    trigger('priceRangeBuyFrom');
    trigger('priceRangeBuyTo');
  }, [trigger, watchAllFields.priceRangeBuyFrom, watchAllFields.priceRangeBuyTo]);

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
      enquiry_type: enquiryType?.value || null,
      bedrooms_from: Number(countOfBedrooms?.value),
      covered_area_from_amount: totalAreaFrom || null,
      covered_area_to_amount: totalAreaTo || null,
      locations: locations?.value || null,
    };

    if (offeringType === QobrixLeadBuyRent.TO_BUY) {
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
      enqueueSnackbar(t('succesCreatedMessage'), { variant: 'success' });

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
            <GoBackPageTitile title={t('mainTitle')} ml="-25px" />

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
                sx={{ height: '105px' }}
                size="small"
              />
            </Block>

            <Block label={t('descriptionLabel')}>
              <RHFTextField
                name="description"
                multiline
                rows={3}
                placeholder={t('descriptionPlaceholder')}
                sx={{ height: '105px' }}
                size="small"
              />
            </Block>

            <Block label={t('enquiryTypeLabel')}>
              <RHFAutocomplete
                name="enquiryType"
                placeholder={t('enquiryTypePlaceholder')}
                options={
                  (properties &&
                    properties.data.map((option) => ({
                      label: option.name,
                      value: option.code,
                    }))) ||
                  []
                }
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                sx={{ height: '60px' }}
                size="small"
                loading={isPropertyTypeLoading}
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
                sx={{ height: '60px' }}
                size="small"
              />
            </Block>

            <Block label={t('totalAreaLabel')}>
              <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                <RHFTextField
                  name="totalAreaFrom"
                  type="number"
                  placeholder={t('totalAreaFromPlaceHolder')}
                  sx={{ height: '60px', mr: '50px' }}
                  size="small"
                />

                <RHFTextField
                  name="totalAreaTo"
                  type="number"
                  placeholder={t('totalAreaToPlaceHolder')}
                  sx={{ height: '60px' }}
                  size="small"
                />
              </Block>
            </Block>

            <Block label={t('priceRangeLabel')} key={watchAllFields.offeringType}>
              {watchAllFields.offeringType === QobrixLeadBuyRent.TO_RENT ? (
                <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                  <RHFTextField
                    name="priceRangeRentFrom"
                    type="number"
                    placeholder={t('priceRangeRentFromPlaceholder')}
                    sx={{ height: '60px', mr: '50px' }}
                    size="small"
                  />

                  <RHFTextField
                    name="priceRangeRentTo"
                    type="number"
                    placeholder={t('priceRangeRentToPlaceholder')}
                    sx={{ height: '60px' }}
                    size="small"
                  />
                </Block>
              ) : (
                <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                  <RHFTextField
                    name="priceRangeBuyFrom"
                    type="number"
                    placeholder={t('priceRangeBuyFromPlaceholder')}
                    sx={{ height: '60px', mr: '50px' }}
                    size="small"
                  />

                  <RHFTextField
                    name="priceRangeBuyTo"
                    type="number"
                    placeholder={t('priceRangeBuyToPlaceholder')}
                    sx={{ height: '60px' }}
                    size="small"
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
                sx={{ height: '60px' }}
                size="small"
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
