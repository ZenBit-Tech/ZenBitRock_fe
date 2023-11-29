import Avatar from '@mui/material/Avatar';
import { AvatarShape } from 'assets/illustrations';
import { useTranslations } from 'hooks';

type Props = {
  avatar: string;
};

const HeaderAvatar = ({ avatar }: Props) => {
  const t = useTranslations('Home.Header');
  return (
    <Avatar
      src={avatar}
      alt={t('avatar')}
      sx={{
        mx: 'auto',
        width: { xs: 48, md: 64 },
        height: { xs: 48, md: 64 },
        zIndex: 10,
      }}
    >
      <AvatarShape
        sx={{
          width: { xs: 48, md: 64 },
          height: { xs: 48, md: 64 },
        }}
      />
    </Avatar>
  );
};
export { HeaderAvatar };
