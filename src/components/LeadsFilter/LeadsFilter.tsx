'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import Iconify from 'components/iconify/iconify';
import { leadStatuses } from 'constants/leadStatuses';
import { errMessages } from 'constants/errMessages';
import { useFilterLeadsMutation, useFilterLeadsByPropertyMutation } from 'store/api/qobrixApi';

type Props = {
  selectedPropertyId?: string;
};

type FormValues = {
  status: string;
  leadName: string;
};

const DEFAULT_VALUES = {
  status: '',
  leadName: '',
};

export default function LeadsFilter({ selectedPropertyId = '' }: Props): JSX.Element {
  const t = useTranslations('leads');

  const [filterLeads] = useFilterLeadsMutation();
  const [filterLeadsByProperty] = useFilterLeadsByPropertyMutation();

  const form = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });
  const { register, control, handleSubmit } = form;

  const onSubmit = async (data: FormValues): Promise<void> => {
    const { status, leadName } = data;
    const searchString = `ContactNameContacts.name contains '${leadName}' and Opportunities.conversion_status matches '${status}'`;
    try {
      if (selectedPropertyId) {
        const res = await filterLeadsByProperty({
          search: searchString,
          propertyId: selectedPropertyId,
        });

        if ('data' in res) {
          const mappedData = res.data.data.map((item) => ({
            contact_name: item.contact_name,
            status: item.status,
            name: item.contact_name_contact ? item.contact_name_contact.name : null,
          }));
          console.log('res with property id', mappedData);
        }
      } else {
        const res = await filterLeads({ conversion_status: status, search: searchString });
        if ('data' in res) {
          const mappedData = res.data.data.map((item) => ({
            contact_name: item.contact_name,
            status: item.status,
            name: item.contact_name_contact ? item.contact_name_contact.name : null,
          }));
          console.log('res without property id', mappedData);
        }
      }
    } catch (error) {
      enqueueSnackbar(errMessages.FILTER_ERR_MSG, { variant: 'error' });
    }
  };

  return (
    <div>
      <Box component="form" sx={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            margin: '24px',
          }}
        >
          <InputLabel id="demo-dialog-select-label">{t('status')}</InputLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="demo-dialog-select-label"
                input={<OutlinedInput label={t('status')} />}
                variant="filled"
                sx={{ minWidth: 120, borderRadius: ' 8px 0 0 8px' }}
              >
                <MenuItem value="">
                  <em>{t('none')}</em>
                </MenuItem>
                {Object.entries(leadStatuses).map(([statusName, statusValue]) => (
                  <MenuItem key={statusName} value={statusValue.id}>
                    {statusValue.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <TextField
            placeholder={t('inputPlaceholder')}
            type="search"
            {...register('leadName')}
            sx={{
              display: 'flex',
              width: '85%',
              '& fieldset': {
                borderRadius: '0 8px 8px 0',
                height: '60px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end" type="submit">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
    </div>
  );
}
