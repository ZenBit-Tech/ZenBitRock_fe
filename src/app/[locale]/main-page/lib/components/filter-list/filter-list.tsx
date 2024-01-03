import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack } from '@mui/material';
import { useForm, useLocalStorage, useState, useTranslations } from 'hooks';
import FormProvider, { RHFAutocomplete, RHFRadioGroup, RHFSlider } from 'components/hook-form';
import { Block } from 'components/custom';
import { useGetPropertyTypesQuery, useSearchLocationsQuery } from 'store/api/qobrixApi';
import { LoadingScreen } from 'components/loading-screen';
import { getLocationOptions, getMainPagePropertyFilter } from 'utils';
import { LocationSelectOption, type PropertyFilterFormData } from 'types';
import { StorageKey } from 'enums';
import { BEDROOMS, getPropertyStatus, getRentOrSaleOption, FilterSchema } from './lib';

const defaultValues: PropertyFilterFormData = {
  location: null,
  propertyType: null,
  status: null,
  priceRange: [100000, 5000000],
  bedrooms: null,
  rentOrSale: null,
};

type Props = {
  applyFilters: (filter: string) => void;
};

const FilterList = ({ applyFilters }: Props): JSX.Element => {
  const [locationsInputValue, setLocationsInputValue] = useState<string>('');
  const { state, replace } = useLocalStorage<PropertyFilterFormData>(
    StorageKey.PROPERTY_FILTER,
    defaultValues
  );

  const { data: searchLocationData, isLoading: isSearchLocationLoading } = useSearchLocationsQuery({
    find: locationsInputValue,
    page: 1,
  });

  const options = searchLocationData ? getLocationOptions(searchLocationData) : [];

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setLocationsInputValue(value);
  };

  const { data, isLoading: isPropertyTypeLoading } = useGetPropertyTypesQuery(undefined);
  const t = useTranslations('mainPage.filters');
  const propertyStatus = useTranslations('mainPage.filters.filterOptions.propertyStatus');
  const rentOrSale = useTranslations('mainPage.filters.filterOptions.rentOrSale');

  const methods = useForm<PropertyFilterFormData>({
    mode: 'onChange',
    resolver: yupResolver(FilterSchema),
    defaultValues: state,
  });

  if (!data) {
    return <LoadingScreen />;
  }

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const filter = getMainPagePropertyFilter(formData);
      replace(formData);
      applyFilters(filter);
    } catch (error) {
      reset();
    }
  });

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
            <RHFAutocomplete
              name="propertyType"
              size="small"
              options={
                data && data.data.map((option) => ({ label: option.name, value: option.code }))
              }
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
          <Block label={t('priceRange')}>
            <RHFSlider
              name="priceRange"
              sx={{ width: '92%', margin: '0 auto', height: 4 }}
              min={10000}
              max={5000000}
              step={1000}
            />
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
          <RHFRadioGroup
            row
            name="rentOrSale"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            options={getRentOrSaleOption(rentOrSale)}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isValid}
            sx={{ width: '70%', margin: '0 auto' }}
          >
            {t('apply')}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export { FilterList };
