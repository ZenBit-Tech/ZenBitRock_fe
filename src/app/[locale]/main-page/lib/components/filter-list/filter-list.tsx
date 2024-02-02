import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack } from '@mui/material';
import { useEffect, useForm, useLocalStorage, useState, useTranslations } from 'hooks';
import { removeStorage, setStorage } from 'hooks/use-local-storage';
import FormProvider, {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFNumFormattedField,
} from 'components/hook-form';
import { Block } from 'components/custom';
import { useGetPropertyTypesQuery, useSearchLocationsQuery } from 'store/api/qobrixApi';
import { getLocationOptions, getMainPagePropertyFilter } from 'utils';
import { getStorageKeyWithUserId } from 'services';
import { getFilterString } from 'utils/property-filters';
import { LocationSelectOption, type PropertyFilterFormData } from 'types';
import { StorageKey } from 'enums';
import { BEDROOMS, getPropertyStatus, getRentOrSaleOption, FilterSchema } from './lib';

const defaultValues: PropertyFilterFormData = {
  location: null,
  propertyType: null,
  status: null,
  priceRangeSaleFrom: 10000,
  priceRangeSaleTo: 10000000,
  priceRangeRentFrom: 100,
  priceRangeRentTo: 10000,
  bedrooms: null,
  rentOrSale: 'for_sale',
};

type Props = {
  applyFilters: (filter: string) => void;
  setFilterString: (filter: string) => void;
  userId: string;
};

const FilterList = ({ applyFilters, setFilterString, userId }: Props): JSX.Element => {
  const [locationsInputValue, setLocationsInputValue] = useState<string>('');
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);

  const propertyFilterWithUserId: string = getStorageKeyWithUserId(
    StorageKey.PROPERTY_FILTER,
    userId
  );
  const propertyStringWithUserId: string = getStorageKeyWithUserId(
    StorageKey.FILTER_STRING,
    userId
  );

  const { state, replace } = useLocalStorage<PropertyFilterFormData>(
    propertyFilterWithUserId,
    defaultValues
  );

  const { data: searchLocationData, isLoading: isSearchLocationLoading } = useSearchLocationsQuery({
    find: locationsInputValue,
    page: 1,
  });

  const { data, isLoading: isPropertyTypeLoading } = useGetPropertyTypesQuery(undefined);

  const options = searchLocationData ? getLocationOptions(searchLocationData) : [];
  const porpertyTypeOptions = data
    ? data.data.map((option) => ({ label: option.name, value: option.code }))
    : [];

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setLocationsInputValue(value);
  };

  const t = useTranslations('mainPage.filters');
  const propertyStatus = useTranslations('mainPage.filters.filterOptions.propertyStatus');
  const rentOrSale = useTranslations('mainPage.filters.filterOptions.rentOrSale');

  const methods = useForm<PropertyFilterFormData>({
    mode: 'onChange',
    resolver: yupResolver(FilterSchema),
    defaultValues: state,
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
    const hasFilters =
      watchAllFields.location ||
      watchAllFields.propertyType ||
      watchAllFields.status ||
      watchAllFields.priceRangeRentFrom !== defaultValues.priceRangeRentFrom ||
      watchAllFields.priceRangeRentTo !== defaultValues.priceRangeRentTo ||
      watchAllFields.priceRangeSaleFrom !== defaultValues.priceRangeSaleFrom ||
      watchAllFields.priceRangeSaleTo !== defaultValues.priceRangeSaleTo ||
      watchAllFields.rentOrSale !== defaultValues.rentOrSale ||
      watchAllFields.bedrooms;

    if (hasFilters) {
      setHasActiveFilters(true);
    } else {
      setHasActiveFilters(false);
    }
  }, [watchAllFields]);

  useEffect(() => {
    if (isValid) methods.clearErrors();
  }, [
    methods,
    watchAllFields.priceRangeRentFrom,
    watchAllFields.priceRangeRentTo,
    watchAllFields.priceRangeSaleFrom,
    watchAllFields.priceRangeSaleTo,
    isValid,
  ]);

  useEffect(() => {
    setValue('priceRangeRentFrom', state.priceRangeRentFrom || 100);
    setValue('priceRangeRentTo', state.priceRangeRentTo || 10000);
    setValue('priceRangeSaleFrom', state.priceRangeSaleFrom || 10000);
    setValue('priceRangeSaleTo', state.priceRangeSaleTo || 10000000);
  }, [watchAllFields.rentOrSale, setValue, state]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const filter = getMainPagePropertyFilter(formData);

      replace(formData);
      applyFilters(filter);
      setFilterString(getFilterString(formData));
      setStorage(propertyStringWithUserId, getFilterString(formData));
    } catch (error) {
      reset();
    }
  });

  const handleRemoveFilters = (): void => {
    replace(defaultValues);
    setHasActiveFilters(false);
    setFilterString('');
    removeStorage(propertyStringWithUserId);
    reset(defaultValues);

    const filter = getMainPagePropertyFilter(defaultValues);

    applyFilters(filter);
  };

  return (
    <Box sx={{ p: 1 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={1} alignItems="center">
          <RHFRadioGroup
            row
            name="rentOrSale"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            options={getRentOrSaleOption(rentOrSale)}
          />

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
            <RHFAutocomplete
              name="propertyType"
              size="small"
              options={porpertyTypeOptions}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              renderOption={(props, option) => (
                <li {...props} key={option.label}>
                  {option.label}
                </li>
              )}
              loading={isPropertyTypeLoading}
            />
          </Block>

          <Block label={t('propertyStatus')}>
            <RHFAutocomplete
              name="status"
              size="small"
              options={getPropertyStatus(propertyStatus)}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              renderOption={(props, option) => (
                <li {...props} key={option.label}>
                  {option.label}
                </li>
              )}
            />
          </Block>

          <Block label={t('priceRange')} key={watchAllFields.rentOrSale}>
            {watchAllFields.rentOrSale === 'for_rent' ? (
              <Block sx={{ display: 'flex', flexDirection: 'row' }}>
                <RHFNumFormattedField
                  name="priceRangeRentFrom"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeRentFromPlaceholder')}
                  sx={{ height: '60px', mr: '50px' }}
                />

                <RHFNumFormattedField
                  name="priceRangeRentTo"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeRentToPlaceholder')}
                  sx={{ height: '60px' }}
                />
              </Block>
            ) : (
              <Block sx={{ display: 'flex', flexDirection: 'row', gap: '0' }}>
                <RHFNumFormattedField
                  name="priceRangeSaleFrom"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeSaleFromPlaceholder')}
                  sx={{ height: '60px', mr: '50px' }}
                />

                <RHFNumFormattedField
                  name="priceRangeSaleTo"
                  type="number"
                  size="small"
                  placeholder={t('priceRangeSaleToPlaceholder')}
                  sx={{ height: '60px' }}
                />
              </Block>
            )}
          </Block>
          <Block label={t('bedrooms')}>
            <RHFAutocomplete
              name="bedrooms"
              size="small"
              options={BEDROOMS}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              renderOption={(props, option) => (
                <li {...props} key={option.label}>
                  {option.label}
                </li>
              )}
            />
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
              {t('clearFilter')}
            </LoadingButton>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid}
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
