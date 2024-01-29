import { useRef, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import CustomPopover, { usePopover } from 'components/custom-popover';
import { useCallback } from 'hooks';
import { getStorage } from 'hooks/use-local-storage';
import { getNameFilter } from 'utils';
import { StorageKey } from 'enums';
import { colors } from 'constants/colors';
import { FilterList } from '../filter-list/filter-list';

type Props = {
  setFilter: (filter: string) => void;

  setPropertyNameFilter: (filter: string) => void;
};
const PropertyFilter = ({ setFilter, setPropertyNameFilter }: Props) => {
  const popover = usePopover();

  const inputRef = useRef<HTMLInputElement>();

  const [filterString, setFilterString] = useState<string>(
    getStorage(StorageKey.FILTER_STRING) ? getStorage(StorageKey.FILTER_STRING) : ''
  );

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
    <>
      {filterString ? <Typography variant="body1">{filterString}</Typography> : null}

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
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ ml: 1 }}
                    color={colors.BUTTON_PRIMARY_COLOR}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <IconButton sx={{ ml: 2 }} onClick={popover.onOpen}>
          <Iconify
            icon="mdi:filter"
            width="35px"
            height="35px"
            color={colors.BUTTON_PRIMARY_COLOR}
          />
        </IconButton>

        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          arrow="top-left"
          sx={{ width: '100%', mt: 1, overflow: 'scroll' }}
        >
          <FilterList applyFilters={handleApplyFilters} setFilterString={setFilterString} />
        </CustomPopover>
      </Box>
    </>
  );
};

export { PropertyFilter };
