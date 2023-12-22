import Iconify from 'components/iconify';
import { TranslationKey } from './translation-keys.enum';

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
        title: TranslationKey.MAIN,
        path: '#',
        icon: <Iconify icon="ion:home" width={1} color={(theme) => theme.palette.primary.main} />,
      },
      {
        title: TranslationKey.AGENTS,
        path: '/agents',
        icon: <Iconify icon="mingcute:suitcase-fill" width={1} />,
      },
      {
        title: TranslationKey.CALENDAR,
        path: '#',
        icon: <Iconify icon="bxs:calendar" width={1} />,
      },
      {
        title: TranslationKey.LEADS,
        path: '/leads',
        icon: <Iconify icon="healthicons:people" width={1} />,
      },
      {
        title: TranslationKey.CONTENT,
        path: '#',
        icon: (
          <Iconify icon="game-icons:read" width={1} color={(theme) => theme.palette.primary.main} />
        ),
      },
    ],
  },
];

export { defaultConfig, NAV_ITEMS };
