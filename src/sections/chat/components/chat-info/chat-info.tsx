import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Link, Modal, Typography } from '@mui/material';
import ButtonClose from 'components/custom/button-close/button-close';
import { Title } from 'components/custom/property/styles';
import Iconify from 'components/iconify';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useState, useTranslations, useCloseModal, useRouter, useSelector } from 'hooks';
import { usePathname } from 'next/navigation';
import FormFirst from 'sections/chat/components/create-group-chat/form-add-group-chat';
import FormSecond from 'sections/chat/components/create-group-chat/formSecond';
import { RootState } from 'store';
import { useGetChatByIdQuery } from 'store/chat/chat-api';
import { IChatResponse, UserProfileResponse } from 'types';
import uuidv4 from 'utils/uuidv4';

type Props = {
  id: string;
  userId: string;
};

const ChatInfo = ({ members = [], id, userId }: Props): JSX.Element => {
  // const { id, owner, title, members, createdAt } = chat;

  const [nameModal, setNameModal] = useState<boolean>(false);
  const [addAgentsModal, setAddAgentsModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const {
    id: ownerId,
    firstName,
    lastName,
  }: {
    id: UserProfileResponse['id'] | null;
    firstName: UserProfileResponse['firstName'] | null;
    lastName: UserProfileResponse['lastName'] | null;
  } = authUser || {
    id: null,
  };

  const router = useRouter();
  const pathsname = usePathname();

  console.log(pathsname);
  const { room } = useGetChatByIdQuery({ id: pathsname.split('/')[2] });

  console.log(room);
  // const groupNameUp = (name: string): void => {
  //   if (name !== '') {
  //     setGroupName(name);
  //     setFirstModal(false);
  //     setSecondModal(true);
  //   }
  // };

  const handleClose = (): void => closeModal();

  useCloseModal(openModal, (): void => closeModal());

  const t = useTranslations('MessagesPage');

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginY: '1.5rem',
        }}
      >
        <Button
          title={t('back')}
          sx={{ padding: '0' }}
          onClick={(): void => router.push(`${AppRoute.CHAT_PAGE}/${room.id}`)}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
        </Button>
        <Title variant="h3">{t('title')}</Title>
      </Box>
      <Typography>{t('Chat name')}</Typography>
      {ownerId === room.owner && (
        <Link
          color="inherit"
          sx={{
            width: 'fit-content',
            cursor: 'pointer',
            mt: 4,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            transition: 'all 200ms ease-out',
            '&:hover': {
              color: colors.BUTTON_PRIMARY_COLOR,
              transition: 'all 200ms ease-out',
              textDecoration: 'underline',
            },
          }}
          onClick={(): void => setOpenModal(!openModal)}
        >
          <Iconify icon="iconoir:list" width="1.5rem" height="1.5rem" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
            {t('Edit group name')}
          </Typography>
        </Link>
      )}
      <Typography>{t('Group members')}</Typography>
      <Typography>{`${firstName} ${lastName}: ${t('owner')}`}</Typography>
      <Box>
        <Typography>{t('Created on')}</Typography>
        <Typography>{new Date(room.createdAt).toDateString()}</Typography>
      </Box>
      <Link
        color="inherit"
        sx={{
          width: 'fit-content',
          cursor: 'pointer',
          mt: 4,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          transition: 'all 200ms ease-out',
          '&:hover': {
            color: colors.BUTTON_PRIMARY_COLOR,
            transition: 'all 200ms ease-out',
            textDecoration: 'underline',
          },
        }}
        onClick={(): void => setAddAgentsModal(!addAgentsModal)}
      >
        <Iconify icon="iconoir:list" width="1.5rem" height="1.5rem" />
        <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
          {t('Add agents to chat')}
        </Typography>
      </Link>
      {ownerId === room.owner && (
        <Link
          color="inherit"
          sx={{
            width: 'fit-content',
            cursor: 'pointer',
            mt: 4,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            transition: 'all 200ms ease-out',
            '&:hover': {
              color: colors.BUTTON_PRIMARY_COLOR,
              transition: 'all 200ms ease-out',
              textDecoration: 'underline',
            },
          }}
          onClick={(): void => setDeleteModal(!deleteModal)}
        >
          <Iconify icon="iconoir:list" width="1.5rem" height="1.5rem" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
            {t('Delete chat')}
          </Typography>
        </Link>
      )}
      <Typography>{t('Chat members')}</Typography>
      {members?.length > 0 &&
        members.map(
          (user) =>
            user && (
              <Box
                title={t('btnDeleteAgentFromList')}
                key={uuidv4()}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '&:not(:last-child)': {
                    mb: '1rem',
                  },
                }}
              >
                <Typography>{user?.label}</Typography>
                <Iconify
                  icon="fluent:delete-28-regular"
                  width="1.5rem"
                  height="1.5rem"
                  color={colors.ERROR_COLOR}
                  sx={{
                    opacity: '0.5',
                    cursor: 'pointer',
                    transition: 'all 200ms ease-out',
                    '&:hover': {
                      opacity: '1',
                      transition: 'all 200ms ease-out',
                    },
                  }}
                  onClick={() => handleClickDelete(user)}
                />
              </Box>
            )
        )}

      {nameModal && (
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
              handleClose={handleClose}
            />
            <FormName t={t} roomId={room.id} closeModalUp={handleClose} />
          </Box>
        </Modal>
      )}
      {addAgentsModal && (
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
              handleClose={handleClose}
            />
            <FormSecond t={t} roomId={room.id} members={room.members} closeModalUp={handleClose} />
          </Box>
        </Modal>
      )}
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
              handleClose={handleClose}
            />
            <FormDelete t={t} roomId={room.id} closeModalUp={handleClose} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export { ChatInfo };
function closeModal(): void {
  throw new Error('Function not implemented.');
}
