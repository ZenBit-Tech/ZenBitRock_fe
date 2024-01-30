import { useCallback, useRef } from 'react';
import { Box, Card, Checkbox, IconButton, Link, Modal, Typography } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import Image from 'components/image';
import { useSnackbar } from 'components/snackbar';
import ButtonClose from 'components/custom/button-close/button-close';
import { colors } from 'constants/colors';
import { useState } from 'hooks';
import { useUpdateContentCheckedMutation } from 'store/content';
import { IContentItem } from 'types';
import { DeleteContentModal } from './del-content-modal';

interface PropsContentItem extends IContentItem {
  t: Function;
  type: string;
  isAdmin: boolean;
}

function ContentItem({
  id,
  title,
  link,
  screenshot,
  checked,
  t,
  type,
  isAdmin,
}: PropsContentItem): JSX.Element {
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(checked);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const [updateContentChecked] = useUpdateContentCheckedMutation();
  const linkRef = useRef(null);

  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (event.target === linkRef.current && id && !checkBoxValue) {
        setCheckBoxValue(true);
        updateContentChecked({
          id,
          checked: true,
        })
          .unwrap()
          .catch((error) => {
            enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
              variant: 'error',
            });
          });
      }
    },
    [id, checkBoxValue, linkRef, updateContentChecked, enqueueSnackbar, t]
  );

  return (
    <>
      <Link
        ref={linkRef}
        href={link}
        target="_blank"
        rel="noopener"
        title={title}
        onClick={handleChange}
      >
        <Card
          sx={{ p: '0.5rem', position: 'relative', mb: '1rem', '&:last-child': { mb: '1.5rem' } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <Box
              sx={{
                flex:
                  screenshot && (screenshot.includes('.png') || screenshot.includes('.jpg'))
                    ? 4
                    : 8,
                py: '0.5rem',
                pl: '1rem',
              }}
            >
              {type === 'video' && (
                <Box
                  sx={{ display: 'flex', gap: '0.375rem', alignItems: 'baseline', mb: '0.5rem' }}
                />
              )}
              <Typography variant="subtitle2">{title}</Typography>
            </Box>
            {screenshot && (screenshot.includes('.png') || screenshot.includes('.jpg')) && (
              <Box sx={{ flex: 4, py: '0.5rem' }}>
                <Image
                  src={screenshot}
                  width="100%"
                  alt={`Screenshot of ${link}`}
                  sx={{ objectFit: 'contain' }}
                />
              </Box>
            )}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Checkbox
                checked={checkBoxValue}
                onChange={(event) => {
                  setCheckBoxValue(event.target.checked);
                  if (id) {
                    updateContentChecked({
                      id,
                      checked: event.target.checked,
                    }).unwrap();
                  }
                }}
              />
              {isAdmin && (
                <IconButton
                  aria-label="delete content"
                  sx={{ color: 'error.main' }}
                  onClick={(event): void => {
                    event.preventDefault();
                    event.stopPropagation();
                    setDeleteModal(!deleteModal);
                  }}
                >
                  <Iconify icon="fluent:delete-28-regular" width="1.5rem" height="1rem" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Card>
      </Link>
      {deleteModal && (
        <Modal
          open
          sx={{
            margin: '5%',
            height: 'fit-content',
            width: '90%',
            minWidth: '90%',
            overflow: 'hidden',
            borderRadius: '1rem',
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.PRIMARY_LIGHT_COLOR,
              padding: '2rem',
              position: 'relative',
              height: '100%',
              border: `1px solid ${colors.PRIMARY_DARK_COLOR}`,
              borderRadius: '1rem',
            }}
          >
            <ButtonClose
              top="0.5rem"
              right="0.5rem"
              width="1.5rem"
              height="1.5rem"
              handleClose={() => setDeleteModal(!deleteModal)}
            />
            <DeleteContentModal
              t={t}
              closeModalUp={() => setDeleteModal(!deleteModal)}
              id={id || ''}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}

export { ContentItem };
