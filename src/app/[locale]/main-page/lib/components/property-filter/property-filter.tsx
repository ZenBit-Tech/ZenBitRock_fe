import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

import CustomPopover, { usePopover } from 'components/custom-popover';
import Iconify from 'components/iconify';

import { FilterList } from '../filter-list/filter-list';

const PropertyFilter = () => {
  const popover = usePopover();

  return (
    <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
      <TextField
        placeholder="Search..."
        type="search"
        sx={{ width: '85%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <IconButton sx={{ ml: 2 }} onClick={popover.onOpen}>
        <Iconify icon="mdi:filter" width="35px" height="35px" />
      </IconButton>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-left"
        sx={{ width: '100%', mt: 1 }}
      >
        <FilterList />
      </CustomPopover>
    </Box>
  );
};

export { PropertyFilter };
