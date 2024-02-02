import Iconify from 'components/iconify';
import { usePathname } from 'next/navigation';
import { AppRoute } from 'enums';
import { TranslationKey } from './translation-keys.enum';

const UseNavItems = () => {
  const pathname = usePathname();

  const NAV_ITEMS = [
    {
      subheader: 'Main page',
      items: [
        {
          title: TranslationKey.MAIN,
          path: AppRoute.MAIN_PAGE,
          icon: (
            <Iconify
              icon="ion:home"
              width={1}
              color={
                AppRoute.MAIN_PAGE === pathname ? (theme) => theme.palette.primary.main : 'inherit'
              }
            />
          ),
        },
        {
          title: TranslationKey.AGENTS,
          path: AppRoute.AGENTS_PAGE,
          icon: (
            <Iconify
              icon="mingcute:suitcase-fill"
              width={1}
              color={
                AppRoute.AGENTS_PAGE === pathname
                  ? (theme) => theme.palette.primary.main
                  : 'inherit'
              }
            />
          ),
        },
        {
          title: TranslationKey.LEADS,
          path: AppRoute.LEADS_PAGE,
          icon: (
            <Iconify
              icon="healthicons:people"
              width={1}
              color={
                AppRoute.LEADS_PAGE === pathname ? (theme) => theme.palette.primary.main : 'inherit'
              }
            />
          ),
        },
        {
          title: TranslationKey.CONTENT,
          path: AppRoute.CONTENT_PAGE,
          icon: (
            <Iconify
              icon="game-icons:read"
              width={1}
              color={
                AppRoute.CONTENT_PAGE === pathname
                  ? (theme) => theme.palette.primary.main
                  : 'inherit'
              }
            />
          ),
        },
      ],
    },
  ];

  return NAV_ITEMS;
};

export { UseNavItems };
