import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import Iconify from 'components/iconify';
import { useCallback } from 'hooks';
import CustomPopover, { usePopover } from 'components/custom-popover';
import { FilterList } from '../filter-list/filter-list';

type Props = {
  setFilter: (filter: string) => void;
};
const PropertyFilter = ({ setFilter }: Props) => {
  const popover = usePopover();

  const handleApplyFilters = useCallback(
    (filter: string) => {
      setFilter(filter);
      popover.onClose();
    },
    [setFilter, popover]
  );

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
        <FilterList applyFilters={handleApplyFilters} />
      </CustomPopover>
    </Box>
  );
};

export { PropertyFilter };
