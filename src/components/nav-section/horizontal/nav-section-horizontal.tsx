import Stack from '@mui/material/Stack';
import { memo } from 'react';
import { hideScroll } from 'theme/css';
import NavList from './nav-list';
import { navHorizontalConfig } from '../config';
import { NavSectionProps, NavListProps, NavConfigProps } from '../types';

function NavSectionHorizontal({ data, config, sx, ...other }: NavSectionProps) {
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        maxWidth: '1000px',
        justifyContent: 'space-between',
        mx: 'auto',
        ...hideScroll.y,
        ...sx,
      }}
      {...other}
    >
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          items={group.items}
          config={navHorizontalConfig(config)}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

type GroupProps = {
  items: NavListProps[];
  config: NavConfigProps;
};

function Group({ items, config }: GroupProps) {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}
