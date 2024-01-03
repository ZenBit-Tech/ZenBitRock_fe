import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Link, Modal, Typography } from '@mui/material';
import ButtonClose from 'components/custom/button-close/button-close';
import { Title } from 'components/custom/property/styles';
import Iconify from 'components/iconify';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useState, useTranslations, useCloseModal, useRouter, useSelector } from 'hooks';
import { usePathname } from 'next/navigation';
import { RootState } from 'store';
import { useGetChatByIdQuery } from 'store/chat/chat-api';
import { IChatResponse, UserProfileResponse } from 'types';
import uuidv4 from 'utils/uuidv4';
import { FormName, FormDelete, FormAddAgents } from 'sections/chat/components/chat-info';

type Props = {
  id: string;
  userId: string;
};

const ChatInfo = ({ members = [], id }: Props): JSX.Element => {
  // const { id, owner, title, members, createdAt } = chat;

  const [nameModal, setNameModal] = useState<boolean>(false);
  const [addAgentsModal, setAddAgentsModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const {
    id: userId,
    firstName,
    lastName,
  }: {
    id: UserProfileResponse['id'] | null;
    firstName: UserProfileResponse['firstName'] | null;
    lastName: UserProfileResponse['lastName'] | null;
  } = authUser || {
    id: null,
  };

  console.log(userId);
  const router = useRouter();
  const pathsname = usePathname();

  console.log(pathsname);
  // const { room } = useGetChatByIdQuery({ id: pathsname.split('/')[2] });
  const room = {
    owner: 'e5766e45-3e90-43cf-baa3-030ed0af2df2',
    id: '5ee757d6-4c9c-4d74-8bb4-e12c60ef7178',
    members: [],
    createdAt: '2024-01-03T22:26:44.486Z',
  };

  // const groupNameUp = (name: string): void => {
  //   if (name !== '') {
  //     setGroupName(name);
  //     setFirstModal(false);
  //     setSecondModal(true);
  //   }
  // };

  function closeModal(type: string): void {
    switch (type) {
      case 'name': {
        setNameModal(!nameModal);
        break;
      }

      case 'members': {
        setAddAgentsModal(!addAgentsModal);
        break;
      }

      case 'delete': {
        setDeleteModal(!deleteModal);
        break;
      }

      default:
    }
  }

  // const handleClose = (): void => closeModal();

  // useCloseModal(nameModal, (): void => closeModal());
  // useCloseModal(addAgentsModal, (): void => closeModal());
  // useCloseModal(deleteModal, (): void => closeModal());

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
      {userId === room.owner && (
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
          onClick={(): void => setNameModal(!nameModal)}
        >
          <Iconify icon="ic:round-edit-note" width="1.5rem" height="1.5rem" />
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
        <Iconify icon="ic:round-playlist-add" width="1.5rem" height="1.5rem" />
        <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
          {t('Add agents to chat')}
        </Typography>
      </Link>
      {userId === room.owner && (
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
          <Iconify icon="fluent:delete-28-regular" width="1.5rem" height="1.5rem" />
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
                  '&:not(:last-child)': {
                    mb: '1rem',
                  },
                }}
              >
                <Typography>
                  {user?.firstName}
                  {user?.lastName}
                </Typography>
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
              handleClose={() => closeModal('name')}
            />
            <FormName
              t={t}
              roomId={room.id}
              nameModal={nameModal}
              closeModal={() => closeModal('name')}
            />
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
              handleClose={() => closeModal('members')}
            />
            <FormAddAgents
              t={t}
              roomId={room.id}
              members={room.members}
              closeModal={() => closeModal('members')}
            />
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
              handleClose={() => closeModal('delete')}
            />
            <FormDelete t={t} roomId={room.id} closeModalUp={() => closeModal('delete')} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export { ChatInfo };
