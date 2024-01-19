import { Box, Button, MenuItem } from '@mui/material';
import Iconify from 'components/iconify';
import CustomPopover, { usePopover } from 'components/custom-popover';
import { Values } from './helpers/drop-box-data';

type Props = {
  t: Function;
  sort: Values;
  onSort: (newValue: Values) => void;
  sortOptions: Values[];
};

export function SortComponent({ t, sort, sortOptions, onSort }: Props): JSX.Element {
  const popover = usePopover();

  return (
    <Box textAlign="left">
      <Button
        disableRipple
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        }
        sx={{ fontWeight: 'fontWeightSemiBold', textTransform: 'capitalize' }}
      >
        {t('sortBy')}

        <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
          {sort.label}
        </Box>
      </Button>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={sort.value === option.value}
            onClick={() => {
              popover.onClose();
              onSort(option);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </Box>
  );
}
