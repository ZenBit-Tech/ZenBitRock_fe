import Stack from '@mui/material/Stack';
import { memo } from 'react';
//
import NavList from './nav-list';
import { navMiniConfig } from '../config';
import { NavSectionProps, NavListProps, NavConfigProps } from '../types';

// ----------------------------------------------------------------------

function NavSectionMini({ data, config, sx, ...other }: NavSectionProps) {
  return (
    <Stack sx={sx} {...other}>
      {data.map((group, index) => (
        <Group key={group.subheader || index} items={group.items} config={navMiniConfig(config)} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

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
