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
import { randomValues } from 'constants/randomValues';

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
    mode: 'onSubmit',
  });
  const { register, control, handleSubmit } = form;

  const onSubmit = (data: FormValues): void => {
    const modifiedData = {
      ...data,
      status: data.status === randomValues.ALL ? '' : data.status,
    };

    const searchString =
      modifiedData.status === '' && modifiedData.leadName === ''
        ? 'update'
        : `ContactNameContacts.name contains '${modifiedData.leadName}' and Opportunities.conversion_status matches '${modifiedData.status}'`;

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
          }}
          fullWidth
        >
          <InputLabel id="demo-dialog-select-label" sx={{ fontSize: '0.841rem' }}>
            {t('status')}
          </InputLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="demo-dialog-select-label"
                input={<OutlinedInput label={t('status')} />}
                renderValue={(selected) => {
                  if (selected === randomValues.ALL) {
                    return t('all');
                  }

                  const foundStatus = Object.values(leadStatuses).find(
                    (status) => status.id === selected
                  );

                  return foundStatus ? foundStatus.label : t('all');
                }}
                variant="filled"
                sx={{
                  minWidth: 120,
                  maxWidth: 190,
                  borderRadius: ' 8px 0 0 8px',
                  flex: 2,
                }}
              >
                <MenuItem value={randomValues.ALL}>{t('all')}</MenuItem>
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
              flex: 3,

              '& fieldset': {
                borderRadius: '0 8px 8px 0',
                height: '60px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end" type="submit">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: 'primary.main', width: '23px', height: '23px' }}
                    />
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
