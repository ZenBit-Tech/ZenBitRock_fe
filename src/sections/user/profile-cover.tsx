import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { Link, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, alpha } from '@mui/material/styles';
import { IUserProfileCover } from 'types/user';
import { bgGradient } from 'theme/css';
import AvatarShape from 'assets/illustrations/avatar-shape';
import Iconify from 'components/iconify';
import { AppRoute, StorageKey } from 'enums';
import { AppDispatch } from 'store';
import { logoutUser } from 'store/auth/authReducer';

export default function ProfileCover({ name, avatarUrl }: IUserProfileCover) {
  const t = useTranslations('profilePage');
  const theme = useTheme();

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = (): void => {
    localStorage.removeItem(StorageKey.TOKEN);
    localStorage.removeItem(StorageKey.FILTER_STRING);
    dispatch(logoutUser());
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
        }),
        height: 1,
        color: 'common.white',
        display: 'flex',
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          left: 24,
          right: 24,
          bottom: { xs: 78, md: 68 },
          position: 'absolute',
          maxWidth: '-webkit-fill-available',
        }}
      >
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 3px ${theme.palette.common.white}`,
            zIndex: 10,
          }}
        >
          <AvatarShape
            sx={{
              width: { xs: 48, md: 96 },
              height: { xs: 48, md: 96 },
            }}
          />
        </Avatar>

        <ListItemText
          sx={{
            ml: { xs: 2, md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          primaryTypographyProps={{
            typography: 'h4',
            noWrap: true,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        />
      </Stack>
      <Stack direction="row" sx={{ position: 'absolute', top: 14, right: 16 }}>
        <Tooltip title={t('logoutLink')} placement="top">
          <Iconify
            onClick={handleLogout}
            icon="lucide:log-out"
            width={32}
            sx={{ color: 'background.paper', cursor: 'pointer' }}
          />
        </Tooltip>
      </Stack>
      <Stack direction="row" sx={{ position: 'absolute', bottom: 56, right: 16 }}>
        <Tooltip title={t('editLink')} placement="top">
          <Link href={AppRoute.EDIT_PROFILE_PAGE}>
            <Iconify icon="fa:edit" width={32} sx={{ color: 'background.paper' }} />
          </Link>
        </Tooltip>
      </Stack>
    </Box>
  );
}
