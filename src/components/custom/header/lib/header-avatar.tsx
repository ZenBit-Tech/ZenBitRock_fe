import Avatar from '@mui/material/Avatar';
import { AvatarShape } from 'assets/illustrations';
import { colors } from 'constants/colors';
import { useTranslations } from 'hooks';

type Props = {
  avatar: string;
};

const HeaderAvatar = ({ avatar }: Props): JSX.Element => {
  const t = useTranslations('Home.Header');

  return (
    <Avatar
      src={avatar}
      alt={t('avatar')}
      sx={{
        mx: 'auto',
        width: '3rem',
        height: '3rem',
        zIndex: 10,
        transition: 'all 200ms ease-out',
        '&:hover': {
          backgroundColor: colors.BUTTON_SECOND_COLOR,
          transition: 'all 200ms ease-out',
        },
      }}
    >
      <AvatarShape
        sx={{
          width: 36,
          height: 36,
        }}
      />
    </Avatar>
  );
};

export { HeaderAvatar };
