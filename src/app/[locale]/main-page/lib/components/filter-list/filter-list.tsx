import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, MenuItem, Stack } from '@mui/material';
import { useEffect, useForm, useState, useTranslations } from 'hooks';
import FormProvider, {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'components/hook-form';
import { Block } from 'components/custom';
import { useGetPropertyTypesQuery, useSearchLocationsQuery } from 'store/api/qobrixApi';
import { LoadingScreen } from 'components/loading-screen';
import { getLocationOptions, getMainPagePropertyFilter } from 'utils';
import { LocationSelectOption } from 'types';
import {
  BEDROOMS,
  getPropertyStatus,
  getRentOrSaleOption,
  FilterSchema,
  removeDataFromLocalStorage,
} from './lib';

const defaultValues = {
  location: null,
  propertyType: '',
  status: '',
  priceRangeSaleFrom: 10000,
  priceRangeSaleTo: 10000000,
  priceRangeRentFrom: 100,
  priceRangeRentTo: 10000,
  bedrooms: '',
  rentOrSale: 'for_sale',
};

type Props = {
  applyFilters: (filter: string) => void;
};

const FilterList = ({ applyFilters }: Props): JSX.Element => {
  const [locationsInputValue, setLocationsInputValue] = useState<string>('');
  const [isTypeRent, setIsTypeRent] = useState<boolean>(false);
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);

  const { data: searchLocationData, isLoading: isSearchLocationLoading } = useSearchLocationsQuery({
    find: locationsInputValue,
    page: 1,
  });

  const options = searchLocationData ? getLocationOptions(searchLocationData) : [];

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setLocationsInputValue(value);
  };

  const { data } = useGetPropertyTypesQuery(undefined);
  const t = useTranslations('mainPage.filters');
  const propertyStatus = useTranslations('mainPage.filters.filterOptions.propertyStatus');
  const rentOrSale = useTranslations('mainPage.filters.filterOptions.rentOrSale');

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, isValid },
    reset,
  } = methods;

  const watchAllFields = watch();

  useEffect(() => {
    setIsTypeRent(watchAllFields.rentOrSale === 'for_rent');
  }, [watchAllFields.rentOrSale]);

  useEffect(() => {
    const hasFilters =
      watchAllFields.location ||
      watchAllFields.propertyType ||
      watchAllFields.status ||
      watchAllFields.priceRangeRentFrom ||
      watchAllFields.priceRangeRentTo ||
      watchAllFields.priceRangeSaleFrom ||
      watchAllFields.priceRangeSaleTo ||
      watchAllFields.bedrooms;

    if (hasFilters) setHasActiveFilters(true);
  }, [watchAllFields]);

  useEffect(() => {
    methods.clearErrors();
  }, [methods, watchAllFields.rentOrSale]);

  useEffect(() => {
    if (isTypeRent) {
      setValue('priceRangeRentFrom', 100);
      setValue('priceRangeRentTo', 10000);
    } else {
      setValue('priceRangeSaleFrom', 10000);
      setValue('priceRangeSaleTo', 10000000);
    }
  }, [isTypeRent, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const filter = getMainPagePropertyFilter(formData);

      applyFilters(filter);
    } catch (error) {
      reset();
    }
  });

  const handleRemoveFilters = (): void => {
    reset();
    setHasActiveFilters(false);
    removeDataFromLocalStorage(defaultValues);
  };

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ p: 1 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={1} alignItems="center">
          <Block label={t('location')}>
            <RHFAutocomplete
              name="location"
              size="small"
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
            />
          </Block>

          <Block label={t('propertyType')}>
            <RHFSelect name="propertyType" size="small">
              {data &&
                data.data.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
            </RHFSelect>
          </Block>

          <Block label={t('propertyStatus')}>
            <RHFSelect name="status" size="small">
              {getPropertyStatus(propertyStatus).map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Block>

          <RHFRadioGroup
            row
            name="rentOrSale"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            options={getRentOrSaleOption(rentOrSale)}
          />

          <Block label={t('priceRange')} key={watchAllFields.rentOrSale}>
            {isTypeRent ? (
              <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                <RHFTextField
                  name="priceRangeRentFrom"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeRentFromPlaceholder')}
                  sx={{ height: '80px', mr: '50px' }}
                />

                <RHFTextField
                  name="priceRangeRentTo"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeRentToPlaceholder')}
                  sx={{ height: '80px' }}
                />
              </Block>
            ) : (
              <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                <RHFTextField
                  name="priceRangeSaleFrom"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeSaleFromPlaceholder')}
                  sx={{ height: '80px', mr: '50px' }}
                />

                <RHFTextField
                  name="priceRangeSaleTo"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeSaleToPlaceholder')}
                  sx={{ height: '80px' }}
                />
              </Block>
            )}
          </Block>
          <Block label={t('bedrooms')}>
            <RHFSelect name="bedrooms" size="small">
              {BEDROOMS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Block>
          <Block sx={{ display: 'flex', flexDirection: 'row' }}>
            <LoadingButton
              fullWidth
              size="large"
              onClick={handleRemoveFilters}
              variant="outlined"
              disabled={!hasActiveFilters}
              loading={isSubmitting}
              sx={{ width: '70%', mr: '15px' }}
            >
              {t('removeFilters')}
            </LoadingButton>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid || !hasActiveFilters}
              sx={{ width: '70%' }}
            >
              {t('apply')}
            </LoadingButton>
          </Block>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export { FilterList };
