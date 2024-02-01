import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { colors } from 'constants/colors';
import { useState } from 'hooks';
import { useSetLikeMutation } from 'store/chat';

export default function Like({
  icons,
  messageId,
}: {
  icons: OverridableComponent<SvgIconTypeMap>[];
  messageId: string;
}) {
  const [likeNumber, setLikeNumber] = useState<number>(0);
  const [likes, setLikes] = useState<string>('');
  const [selectedLike, setSelectedLike] = useState<string>('');

  const [trigger] = useSetLikeMutation();

  return (
    <>
      <Box
        className={likes}
        sx={{
          opacity: '0',
          position: 'absolute',
          top: '50%',
          right: '0',
          zIndex: 100,
          height: '1.75rem',
        }}
      >
        {icons.map(
          (icon, idx) =>
            icon !== icons[0] && (
              <Box
                key={idx}
                onClick={() => {
                  setLikes('slide-out-right');
                  setSelectedLike('scale-in-center');
                  if (idx === likeNumber) {
                    setLikeNumber(0);
                    trigger({ messageId, like: 0 });
                  } else {
                    setLikeNumber(idx);
                    trigger({ messageId, like: idx });
                  }
                }}
                component={icon}
                sx={{
                  color: idx === likeNumber ? colors.BUTTON_PRIMARY_COLOR : colors.ARROW_SECONDARY,
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: colors.BUTTON_PRIMARY_COLOR_ALPHA,
                  borderRadius: '50%',
                  padding: '0.25rem',
                  marginLeft: '0.25rem',
                  '&:hover, &:focus': { transform: 'scale(1.05)' },
                  cursor: 'pointer',
                }}
              />
            )
        )}
        <CloseRoundedIcon
          onClick={() => {
            setLikes('slide-out-right');
            setSelectedLike('scale-in-center');
          }}
          sx={{
            color: colors.BUTTON_PRIMARY_COLOR,
            width: '1.75rem',
            height: '1.75rem',
            padding: '0.5rem',
            '&:hover, &:focus': { transform: 'scale(1.05)' },
            cursor: 'pointer',
          }}
        />
      </Box>
      <Box
        className={selectedLike}
        onClick={() => {
          setSelectedLike('scale-out-center');
          setLikes('slide-in-right');
        }}
        component={icons[likeNumber]}
        sx={{
          color: likeNumber === 0 ? colors.ARROW_SECONDARY : colors.BUTTON_PRIMARY_COLOR,
          width: '1.75rem',
          height: '1.75rem',
          backgroundColor: colors.BUTTON_PRIMARY_COLOR_ALPHA,
          borderRadius: '50%',
          padding: '0.25rem',
          marginLeft: '0.25rem',
          '&:hover, &:focus': { transform: 'scale(1.05)' },
          cursor: 'pointer',
          //   opacity: '1',
        }}
      />
    </>
  );
}
