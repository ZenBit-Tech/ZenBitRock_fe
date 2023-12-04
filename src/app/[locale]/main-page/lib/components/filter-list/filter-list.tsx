import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, MenuItem, Stack } from '@mui/material';
import { useForm, useTranslations } from 'hooks';
import FormProvider, {
  RHFRadioGroup,
  RHFSelect,
  RHFSlider,
  RHFTextField,
} from 'components/hook-form';
import { Block } from 'components/custom';
import { BEDROOMS, PROPERTY_STATUS, PROPERTY_TYPES, RENT_OR_SALE, FilterSchema } from './lib';

const defaultValues = {
  location: '',
  propertyType: '',
  status: '',
  priceRange: null,
  bedrooms: null,
  rentOrSale: null,
};

const FilterList = () => {
  const t = useTranslations('mainPage.filters');

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Todo
    } catch (error) {
      reset();
    }
  });

  return (
    <Box sx={{ p: 1 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={1} alignItems="center">
          <Block label={t('location')}>
            <RHFTextField name="location" size="small" />
          </Block>
          <Block label={t('propertyType')}>
            <RHFSelect name="propertyType" size="small">
              {PROPERTY_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Block>
          <Block label={t('propertyStatus')}>
            <RHFSelect name="status" size="small">
              {PROPERTY_STATUS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Block>
          <Block label={t('priceRange')}>
            <RHFSlider name="priceRange" sx={{ width: '92%', margin: '0 auto', height: 4 }} />
          </Block>
          <Block label={t('bedrooms')}>
            <RHFSelect name="status" size="small">
              {BEDROOMS.map((option) => (
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
            options={RENT_OR_SALE}
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
