import { memo } from 'react';
import Stack from '@mui/material/Stack';
import { hideScroll } from 'theme/css';
import { NavSectionProps, NavListProps, NavConfigProps } from '../types';
import { navHorizontalConfig } from '../config';
import NavList from './nav-list';

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
      {items.map((list, idx) => {
        let className;
        switch (idx) {
          case 3:
            className = 'onboarding-step-5';
            break;
          case 1:
            className = 'onboarding-step-8';
            break;
          case 4:
            className = 'onboarding-step-15';
            break;
          default:
            className = '';
        }
        return (
          <div className={className} key={list.title + list.path}>
            <NavList data={list} depth={1} hasChild={!!list.children} config={config} />
          </div>
        );
      })}
    </>
  );
}
