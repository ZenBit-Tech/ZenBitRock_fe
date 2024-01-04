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
import Iconify from 'components/iconify/iconify';
import { leadStatuses } from 'constants/leadStatuses';

type Prop = {
  getFilter(arg: string): void;
};

type FormValues = {
  status: string;
  leadName: string;
};

function LeadsFilter({ getFilter }: Prop): JSX.Element {
  const t = useTranslations('leads');

  const form = useForm<FormValues>({
    defaultValues: {
      status: '',
      leadName: '',
    },
    mode: 'onTouched',
  });
  const { register, control, handleSubmit } = form;

  const onSubmit = (data: FormValues): void => {
    const { status, leadName } = data;

    const searchString =
      status === '' && leadName === ''
        ? 'update'
        : `ContactNameContacts.name contains '${leadName}' and Opportunities.conversion_status matches '${status}'`;

    getFilter(searchString);
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

export { LeadsFilter };
