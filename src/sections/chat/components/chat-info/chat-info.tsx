import { usePathname } from 'next/navigation';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Link, Modal, Typography } from '@mui/material';
import ButtonClose from 'components/custom/button-close/button-close';
import { LoadingScreen } from 'components/loading-screen';
import Iconify from 'components/iconify';
import { Title } from 'components/custom/property/styles';
import { useSnackbar } from 'components/snackbar';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useState, useTranslations, useRouter, useSelector, useEffect } from 'hooks';
import { FormName, FormDelete, FormAddAgents } from 'sections/chat/components/chat-info';
import { RootState } from 'store';
import { useGetAllUsersMutation } from 'store/api/userApi';
import { useGetChatByIdQuery, useUpdateChatMutation } from 'store/chat/chat-api';
import { UserProfileResponse } from 'types';
import uuidv4 from 'utils/uuidv4';

const NAV_HEADER_HEIGHT = '120px';

const ChatInfo = (): JSX.Element => {
  const [nameModal, setNameModal] = useState<boolean>(false);
  const [addAgentsModal, setAddAgentsModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [members, setMembers] = useState<{ label: string; id: string }[]>();
  const [apiMembers, setApiMembers] = useState<{ label: string; id: string }[] | undefined>();

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

  const [getAllUsers, { data: usersData, isLoading: isLoadingWhenGetUsers, isError }] =
    useGetAllUsersMutation();
  const [updateGroupChat, { isLoading: isLoadingWhenUpdate }] = useUpdateChatMutation();

  const router = useRouter();
  const pathsname = usePathname();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data,
    isFetching,
    isLoading: isLoadingWhenGetChat,
  } = useGetChatByIdQuery(pathsname.split('/')[2], { refetchOnMountOrArgChange: true });

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (data && !isLoadingWhenGetUsers && !isError) {
      setApiMembers(
        data?.members?.map((member) => ({
          label: `${usersData?.find((user) => user.id === member.id)?.firstName} ${usersData?.find(
            (user) => user.id === member.id
          )?.lastName}`,
          id: member.id,
        }))
      );
    }
  }, [data, isLoadingWhenGetUsers, isError, usersData]);

  useEffect(() => {
    setMembers(apiMembers);
  }, [apiMembers]);

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

  const handleClickDelete = async (idToDelete: string): Promise<void> => {
    try {
      await handleClickUpdate(
        members?.filter((member) => member.id !== idToDelete).map((member) => member.id)
      );
      setMembers((prev) => prev && [...prev.filter((member) => member.id !== idToDelete)]);
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
        variant: 'error',
      });
    }
  };

  const handleClickUpdate = async (memberIds?: string[]): Promise<void> => {
    try {
      await updateGroupChat({
        id: data?.id,
        memberIds,
      }).unwrap();
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
        variant: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        height: `calc(100dvh - ${NAV_HEADER_HEIGHT})`,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {(isLoadingWhenGetChat || isLoadingWhenGetUsers || isLoadingWhenUpdate || isFetching) && (
        <LoadingScreen
          sx={{
            position: 'absolute',
            top: '-400px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '100',
          }}
        />
      )}
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
          onClick={(): void => router.push(`${AppRoute.CHAT_PAGE}/${data?.id}`)}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: colors.PRIMARY_DARK_COLOR }} />
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
              {data?.title}
            </Typography>
          )}
        </Box>
        {data && userId === data?.owner?.id && (
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
              mb: '1.5rem',
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
            mb: '1.5rem',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
            {`${t('createdOn')}:`}
          </Typography>
          {data && data.createdAt && (
            <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
              {new Date(data.createdAt).toDateString()}
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
                  <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>{`${
                    idx + 2
                  }. ${user?.label}`}</Typography>
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
      {data && userId === data?.owner?.id && (
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
            <FormName
              t={t}
              chatId={data?.id}
              closeModalUp={() => closeModal('name')}
              refresh={() => window.location.reload()}
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
              chatId={data?.id}
              chatMembers={members && members.length > 0 ? members : []}
              closeModalUp={() => closeModal('members')}
              changedMembers={(values: string[]) => {
                handleClickUpdate(values);
              }}
              refresh={() => window.location.reload()}
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
            <FormDelete t={t} chatId={data?.id} closeModalUp={() => closeModal('delete')} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export { ChatInfo };
