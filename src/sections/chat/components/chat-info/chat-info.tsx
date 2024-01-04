import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Link, Modal, Typography } from '@mui/material';
import ButtonClose from 'components/custom/button-close/button-close';
import { Title } from 'components/custom/property/styles';
import Iconify from 'components/iconify';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useState, useTranslations, useRouter, useSelector } from 'hooks';
import { usePathname } from 'next/navigation';
import { RootState } from 'store';
import { useGetChatByIdQuery } from 'store/chat/chat-api';
import { IChatResponse, UserProfileResponse } from 'types';
import uuidv4 from 'utils/uuidv4';
import { FormName, FormDelete, FormAddAgents } from 'sections/chat/components/chat-info';

const ChatInfo = (): JSX.Element => {
  const [nameModal, setNameModal] = useState<boolean>(false);
  const [addAgentsModal, setAddAgentsModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [members, setMembers] = useState<IChatResponse['chat']['members']>();

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
    firstName: null,
    lastName: null,
  };

  const router = useRouter();
  const pathsname = usePathname();

  const { data } = useGetChatByIdQuery(
    { id: pathsname.split('/')[2] },
    { refetchOnMountOrArgChange: true }
  );

  if (data) setMembers(data?.chat.members);

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

  const t = useTranslations('MessagesPage');

  const handleClickDelete = (idToDelete: string): void => {
    setMembers((prev) => prev && [...prev.filter((member) => member.id !== idToDelete)]);
  };

  return (
    <Box
      sx={{
        height: 'calc(100dvh - 120px)',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
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
          onClick={(): void => router.push(`${AppRoute.CHAT_PAGE}/${data?.chat.id}`)}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
        </Button>
        <Title variant="h3">{t('title')}</Title>
      </Box>
      <Box sx={{ mx: '1rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
            mb: '1rem',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>{`${t(
            'chatName'
          )}:`}</Typography>
          {data && (
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {data?.chat.title}
            </Typography>
          )}
          {data && userId === data?.chat.owner && (
            <Link
              color="inherit"
              sx={{
                width: 'fit-content',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '0.5rem',
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
                {t('editGroupName')}
              </Typography>
            </Link>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
            mb: '1rem',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
            {`${t('createdOn')}:`}
          </Typography>
          {data && data.chat.createdAt && (
            <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
              {new Date(data.chat.createdAt).toDateString()}
            </Typography>
          )}
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: '1rem' }}>
          {t('chatMembers')}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'normal', mb: '1rem' }}
        >{`1. ${firstName} ${lastName} (${t('owner')})`}</Typography>
        {members &&
          members?.length > 0 &&
          members.map(
            (user, idx: number) =>
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
                  <Typography>{`${idx + 1}. ${user?.firstName}
                    ${user?.lastName}`}</Typography>
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
                    onClick={() => handleClickDelete(user.id)}
                  />
                </Box>
              )
          )}
        <Link
          color="inherit"
          sx={{
            width: 'fit-content',
            cursor: 'pointer',
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
            {t('addAgentsToChat')}
          </Typography>
        </Link>
      </Box>
      {data && userId === data.chat.owner && (
        <Link
          color="inherit"
          sx={{
            width: 'fit-content',
            cursor: 'pointer',
            mt: 'auto',
            mx: '1rem',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 200ms ease-out',
            '&:hover': {
              color: colors.ERROR_COLOR,
              transition: 'all 200ms ease-out',
              textDecoration: 'underline',
            },
          }}
          onClick={(): void => setDeleteModal(!deleteModal)}
        >
          <Iconify icon="fluent:delete-28-regular" width="1.5rem" height="1rem" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
            {t('deleteChat')}
          </Typography>
        </Link>
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
            <FormName t={t} chatId={data?.chat.id} closeModalUp={() => closeModal('name')} />
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
              chatId={data?.chat.id}
              chatMembers={
                members && members.length > 0
                  ? members?.map((member) => ({
                      label: `${member.firstName} ${member.lastName}`,
                      id: member.id,
                    }))
                  : []
              }
              closeModalUp={() => closeModal('members')}
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
            <FormDelete t={t} chatId={data?.chat.id} closeModalUp={() => closeModal('delete')} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export { ChatInfo };
