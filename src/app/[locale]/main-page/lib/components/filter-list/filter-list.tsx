import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, MenuItem, Stack } from '@mui/material';
import { useEffect, useForm, useState, useTranslations } from 'hooks';
import FormProvider, {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFSelect,
  RHFSlider,
} from 'components/hook-form';
import { Block } from 'components/custom';
import { useGetPropertyTypesQuery, useSearchLocationsQuery } from 'store/api/qobrixApi';
import { LoadingScreen } from 'components/loading-screen';
import { getLocationOptions, getMainPagePropertyFilter } from 'utils';
import { LocationSelectOption } from 'types';
import { BEDROOMS, getPropertyStatus, getRentOrSaleOption, FilterSchema } from './lib';

const defaultValues = {
  location: null,
  propertyType: '',
  status: '',
  priceRangeSell: null,
  priceRangeRent: null,
  bedrooms: '',
  rentOrSale: 'for_sale',
};

type Props = {
  applyFilters: (filter: string) => void;
};

const FilterList = ({ applyFilters }: Props): JSX.Element => {
  const [locationsInputValue, setLocationsInputValue] = useState<string>('');
  const [isTypeRent, setIsTypeRent] = useState<boolean>(false);

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
    if (isTypeRent) {
      setValue('priceRangeSell', null);
      setValue('priceRangeRent', [100, 50000]);
    } else {
      setValue('priceRangeRent', null);
      setValue('priceRangeSell', [100000, 10000000]);
    }
  }, [isTypeRent, setValue]);

  if (!data) {
    return <LoadingScreen />;
  }

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const filter = getMainPagePropertyFilter(formData);

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
          <Block label={t('priceRange')}>
            {isTypeRent ? (
              <RHFSlider
                name="priceRangeRent"
                sx={{ width: '92%', margin: '0 auto', height: 4 }}
                min={100}
                max={50000}
                step={1000}
              />
            ) : (
              <RHFSlider
                name="priceRangeSell"
                sx={{ width: '92%', margin: '0 auto', height: 4 }}
                min={10000}
                max={10000000}
                step={1000}
              />
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
