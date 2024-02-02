import { useRef, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import CustomPopover, { usePopover } from 'components/custom-popover';
import { useCallback } from 'hooks';
import { getStorage, removeStorage, setStorage } from 'hooks/use-local-storage';
import { getStorageKeyWithUserId } from 'services';
import { getNameFilter } from 'utils';
import { StorageKey } from 'enums';
import { colors } from 'constants/colors';
import { FilterList } from '../filter-list/filter-list';

type Props = {
  setFilter: (filter: string) => void;
  setPropertyNameFilter: (filter: string) => void;
  searchParamWithUserId: string;
  userId: string;
};

const PropertyFilter = ({
  setFilter,
  setPropertyNameFilter,
  searchParamWithUserId,
  userId,
}: Props) => {
  const popover = usePopover();

  const inputRef = useRef<HTMLInputElement>();

  const propertyStringWithUserId: string = getStorageKeyWithUserId(
    StorageKey.FILTER_STRING,
    userId
  );

  const [inputValue, setInputValue] = useState<string>(getStorage(searchParamWithUserId) || '');
  const [filterString, setFilterString] = useState<string>(
    getStorage(propertyStringWithUserId) ? getStorage(propertyStringWithUserId) : ''
  );

  const handleApplyFilters = useCallback(
    (filter: string) => {
      setFilter(filter);
      popover.onClose();
    },
    [setFilter, popover]
  );

  const handleApplyPropetyNameFilter = useCallback(() => {
    const searchParam = inputRef.current?.value ?? '';

    setPropertyNameFilter(getNameFilter(searchParam));
    setStorage(searchParamWithUserId, searchParam);
  }, [searchParamWithUserId, setPropertyNameFilter]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      handleApplyPropetyNameFilter();
      removeStorage(searchParamWithUserId);
    }
    setInputValue(event.target.value);
  };

  return (
    <>
      <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          placeholder="Search by property name"
          type="search"
          value={inputValue}
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
          <FilterList
            userId={userId}
            applyFilters={handleApplyFilters}
            setFilterString={setFilterString}
          />
        </CustomPopover>
      </Box>
      {filterString ? (
        <Typography variant="body1" sx={{ mt: 1, p: 0.5 }}>
          {filterString}
        </Typography>
      ) : null}
    </>
  );
};

export { PropertyFilter };
