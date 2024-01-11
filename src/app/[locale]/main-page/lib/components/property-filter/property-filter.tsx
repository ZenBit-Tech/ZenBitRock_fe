import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import Iconify from 'components/iconify';
import { useCallback } from 'hooks';
import { useRef } from 'react';
import CustomPopover, { usePopover } from 'components/custom-popover';
import { getNameFilter } from 'utils';
import { FilterList } from '../filter-list/filter-list';

type Props = {
  setFilter: (filter: string) => void;
  setPropertyNameFilter: (filter: string) => void;
};
const PropertyFilter = ({ setFilter, setPropertyNameFilter }: Props) => {
  const popover = usePopover();
  const inputRef = useRef<HTMLInputElement>();

  const handleApplyFilters = useCallback(
    (filter: string) => {
      setFilter(filter);
      popover.onClose();
    },
    [setFilter, popover]
  );

  const handleApplyPropetyNameFilter = useCallback(() => {
    setPropertyNameFilter(getNameFilter(inputRef.current?.value ?? ''));
  }, [setPropertyNameFilter]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) handleApplyPropetyNameFilter();
  };

  return (
    <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
      <TextField
        placeholder="Search by property name"
        type="search"
        sx={{ width: '85%' }}
        inputRef={inputRef}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ m: 0, p: 0 }} onClick={handleApplyPropetyNameFilter}>
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </IconButton>
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
