import Iconify from 'components/iconify';

const defaultConfig = {
  itemGap: 4,
  iconSize: 24,
  currentRole: 'admin',
  itemRootHeight: 44,
  itemSubHeight: 36,
  itemPadding: '4px 8px 4px 12px',
  responsiveItemPadding: '2px 4px 2px 6px',
  itemRadius: 8,
  hiddenLabel: false,
};

const NAV_ITEMS = [
  {
    subheader: 'Main page',
    items: [
      {
        title: 'Main',
        path: '#',
        icon: <Iconify icon="ion:home" width={1} color={(theme) => theme.palette.primary.main} />,
      },
      {
        title: 'Agents',
        path: '#',
        icon: <Iconify icon="mingcute:suitcase-fill" width={1} />,
      },
      {
        title: 'Calendar',
        path: '#',
        icon: <Iconify icon="bxs:calendar" width={1} />,
      },
      {
        title: 'Leads',
        path: '#',
        icon: <Iconify icon="healthicons:people" width={1} />,
      },
      {
        title: 'Content',
        path: '#',
        icon: (
          <Iconify icon="game-icons:read" width={1} color={(theme) => theme.palette.primary.main} />
        ),
      },
    ],
  },
];

export { defaultConfig, NAV_ITEMS };
