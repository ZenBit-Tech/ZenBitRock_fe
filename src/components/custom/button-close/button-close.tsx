import { useTranslations } from 'next-intl';

import Iconify from 'components/iconify';
import { colors } from 'constants/colors';

interface ViewOnMapProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  handleClose?: () => void;
  backgroundColor?: string;
}

function ButtonClose({
  top,
  bottom,
  left,
  right,
  width,
  height,
  handleClose,
  backgroundColor,
}: ViewOnMapProps): JSX.Element {
  const t = useTranslations('property');

  return (
    <Iconify
      title={t('close')}
      color={colors.BUTTON_PRIMARY_COLOR}
      icon="carbon:close-outline"
      width={width}
      height={height}
      sx={{
        backgroundColor: { backgroundColor },
        position: 'absolute',
        top: { top },
        bottom: { bottom },
        left: { left },
        right: { right },
        zIndex: '100',
        cursor: 'pointer',
        transition: 'all 200ms ease-out',
        '&:hover': {
          color: colors.BUTTON_SECOND_COLOR,
          transition: 'all 200ms ease-out',
        },
      }}
      onClick={() => handleClose && handleClose()}
    />
  );
}

export default ButtonClose;
