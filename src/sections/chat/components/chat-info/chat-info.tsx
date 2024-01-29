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
  }: {
    id: UserProfileResponse['id'] | null;
  } = authUser || {
    id: null,
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
    refetch,
  } = useGetChatByIdQuery(pathsname.split('/')[2], { refetchOnMountOrArgChange: true });

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (data && !isLoadingWhenGetUsers && !isError) {
      setApiMembers(
        data?.members
          ?.filter(
            ({ id }) =>
              (userId === data?.owner?.id && id !== userId) ||
              (userId !== data?.owner?.id && id !== data?.owner?.id)
          )
          .map((member) => ({
            label: `${usersData?.find((user) => user.id === member.id)
              ?.firstName} ${usersData?.find((user) => user.id === member.id)?.lastName}`,
            id: member.id,
          }))
      );
    }
  }, [data, isLoadingWhenGetUsers, isError, usersData, userId]);

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

  const t = useTranslations('ChatsPage');

  const handleClickDelete = async (idToDelete: string): Promise<void> => {
    try {
      if (members && userId) {
        await handleClickUpdate([
          ...members.filter((member) => member.id !== idToDelete).map((member) => member.id),
          userId,
        ]);
        setMembers((prev) => prev && [...prev.filter((member) => member.id !== idToDelete)]);
      }
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

  return isFetching || isLoadingWhenGetChat || isLoadingWhenGetUsers || isLoadingWhenUpdate ? (
    <LoadingScreen marginTop="50%" />
  ) : (
    <Box
      sx={{
        height: `calc(100dvh - ${NAV_HEADER_HEIGHT})`,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
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
          onClick={(): void => router.push(`${AppRoute.CHATS_PAGE}/${data?.id}`)}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: colors.PRIMARY_DARK_COLOR }} />
        </Button>
        <Title variant="h3">{t('title')}</Title>
      </Box>
      <Box
        sx={{
          mx: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
            mb: '1rem',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{`${t(
            'chatName'
          )}:`}</Typography>
          {data && (
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'normal',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {data?.title}
            </Typography>
          )}
        </Box>
        {data && userId === data?.owner?.id && (
          <Link
            color={colors.BUTTON_PRIMARY_COLOR}
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
                color: colors.BUTTON_SECOND_COLOR,
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
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
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
        <Link
          color={colors.BUTTON_PRIMARY_COLOR}
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
              color: colors.BUTTON_SECOND_COLOR,
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

        {data?.owner && (
          <Box
            sx={{
              mb: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: 'right',
                mr: '0.5rem',
                fontWeight: 'normal',
                minWidth: '1rem',
              }}
            >
              1.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mr: '0.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: 'normal',
              }}
            >{`${data.owner.firstName} ${data.owner.lastName}`}</Typography>
            <Typography variant="body2" sx={{ width: 'fit-content', fontWeight: 'normal' }}>{`(${t(
              'owner'
            )}${data && userId === data?.owner?.id ? ` - ${t('you')}` : ''})`}</Typography>{' '}
          </Box>
        )}
        {members &&
          members?.length > 0 &&
          members
            .filter(
              (member) =>
                member.label.toLowerCase() !== 'deleted user' &&
                member.id !== data?.owner?.id &&
                !usersData?.find(({ qobrixUserId }) => qobrixUserId === member.id)
            )
            .map(
              (user, idx: number) =>
                user && (
                  <Box
                    title={t('btnDeleteAgentFromList')}
                    key={uuidv4()}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: '1rem',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        mr: '0.5rem',
                        textAlign: 'right',
                        fontWeight: 'normal',
                        minWidth: '1rem',
                      }}
                    >
                      {`${idx + 2}.`}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 'normal',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        mr: 'auto',
                      }}
                    >
                      {`${user?.label}${data && userId === user.id ? ` (${t('you')})` : ''}`}{' '}
                    </Typography>
                    {data && userId === data?.owner?.id && (
                      <Iconify
                        icon="fluent:delete-28-regular"
                        width="1.5rem"
                        height="1.5rem"
                        color={colors.ERROR_COLOR}
                        sx={{
                          opacity: '0.5',
                          cursor: 'pointer',
                          minWidth: '1.5rem',
                          transition: 'all 200ms ease-out',
                          '&:hover': {
                            opacity: '1',
                            transition: 'all 200ms ease-out',
                          },
                        }}
                        onClick={() => handleClickDelete(user.id)}
                      />
                    )}
                  </Box>
                )
            )}
      </Box>
      <Link
        color={colors.ERROR_COLOR}
        sx={{
          opacity: '0.5',
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
            opacity: '1',
            transition: 'all 200ms ease-out',
            textDecoration: 'underline',
          },
        }}
        onClick={() => setDeleteModal(!deleteModal)}
      >
        <Iconify icon="fluent:delete-28-regular" width="1.5rem" height="1rem" />
        <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
          {userId === data?.owner?.id ? t('deleteChat') : t('leaveChat')}
        </Typography>
      </Link>
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
              refresh={() => refetch()}
              oldName={data?.title}
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
              ownerId={data?.owner?.id}
              chatMembers={members && members.length > 0 ? members : []}
              closeModalUp={() => closeModal('members')}
              changedMembers={(values: { label: string; id: string }[]) => {
                setMembers(() => [
                  ...values,
                  {
                    label: `${data?.owner?.firstName} ${data?.owner?.lastName}`,
                    id: data?.owner?.id || '',
                  },
                ]);
              }}
              updateGroupChat={updateGroupChat}
              refresh={() => refetch()}
              usersData={usersData}
              userId={userId}
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
            <FormDelete
              t={t}
              chatId={data?.id}
              closeModalUp={() => closeModal('delete')}
              ownerId={data?.owner?.id}
              userId={userId}
              chatMembers={members}
              updateGroupChat={updateGroupChat}
            />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export { ChatInfo };
