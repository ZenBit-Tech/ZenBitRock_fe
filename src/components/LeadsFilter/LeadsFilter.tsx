'use client';

import * as React from 'react';
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
import { useFilterLeadsMutation, useFilterLeadsByPropertyMutation } from 'store/api/qobrixApi';

type Props = {
  selectedPropertyId?: string;
};

type FormValues = {
  status: string;
  leadName: string;
};

export default function LeadsFilter({
  // selectedPropertyId = '006251f6-39d4-4944-bb2f-c411e0b8d98b',
  selectedPropertyId = '',
}: Props): JSX.Element {
  const [filterLeads] = useFilterLeadsMutation();
  const [filterLeadsByProperty] = useFilterLeadsByPropertyMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      status: '',
      leadName: '',
    },
    mode: 'onTouched',
  });
  const { register, control, handleSubmit } = form;

  const onSubmit = async (data: FormValues): Promise<void> => {
    const { status, leadName } = data;
    const searchString = `ContactNameContacts.name contains '${leadName}' and Opportunities.conversion_status matches '${status}'`;
    if (selectedPropertyId) {
      const res = await filterLeadsByProperty({
        search: searchString,
        propertyId: selectedPropertyId,
      });

      if ('data' in res) {
        console.log('res with property id', res.data);
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
          <InputLabel id="demo-dialog-select-label">Status</InputLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="demo-dialog-select-label"
                input={<OutlinedInput label="Status" />}
                variant="filled"
                sx={{ minWidth: 120, borderRadius: ' 8px 0 0 8px' }}
              >
                <MenuItem value="">
                  <em>None</em>
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
            placeholder="Enter lead name..."
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
