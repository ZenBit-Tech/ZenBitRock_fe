import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function AvatarShape({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="svg"
      width={128}
      height={128}
      fill="none"
      variant="circular"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        color: 'background.paper',
        ...sx,
        borderRadius: '50%',
      }}
      {...other}
    >
      <path
        fill="currentColor"
        d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
      />
    </Box>
  );
}

export default memo(AvatarShape);
