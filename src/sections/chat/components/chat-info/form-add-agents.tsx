import { Button, Box, Stack, TextField, Autocomplete, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { colors } from 'constants/colors';
import { useEffect, useSelector, useState, useForm } from 'hooks';
import { RootState } from 'store';
import { useGetAllUsersMutation } from 'store/api/userApi';
import { useUpdateChatMutation } from 'store/chat';
import { UserProfileResponse } from 'types';
import uuidv4 from 'utils/uuidv4';

type Props = {
  t: Function;
  chatMembers: Members;
  closeModalUp: () => void;
  chatId?: string;
  changedMembers: (values: string[]) => void;
  refresh: () => void;
};

type Members = {
  label: string;
  id: string;
}[];

type Options = Option[];

type Option = {
  label: string;
  id: string;
};

export function FormAddAgents({
  t,
  chatMembers,
  closeModalUp,
  chatId,
  changedMembers,
  refresh,
}: Props): JSX.Element {
  const [options, setOptions] = useState<Options>([]);
  const [members, setMembers] = useState<Members>(chatMembers);

  const [value, setValue] = useState<Option | null>(null);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const [getAllUsers, { data: usersData, isLoading: isloadingWhenGetUsers }] =
    useGetAllUsersMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [updateGroupChat, { isLoading: isLoadingWhenUpdate }] = useUpdateChatMutation();

  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const { id: ownerId }: { id: UserProfileResponse['id'] | null } = authUser || { id: null };

  useEffect(() => {
    if (usersData) {
      const newOptions = usersData
        .filter(({ id }) => id !== ownerId && !chatMembers.some((member) => id === member.id))
        .map(({ firstName, lastName, id }) => ({ label: `${firstName} ${lastName}`, id }));

      setOptions(newOptions);
    }
  }, [chatMembers, ownerId, usersData]);

  const { reset, handleSubmit } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async (): Promise<void> => {
    try {
      const { id } = await updateGroupChat({
        id: chatId,
        memberIds: members.map((member) => member.id),
      }).unwrap();

      if (id) {
        changedMembers(members?.map((member) => member.id));
        refresh();
        closeModalUp();
      }
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
        variant: 'error',
      });

      reset();
    }
  };

  const handleClickDelete = ({ label, id }: Option): void => {
    setMembers((prev) => [...prev.filter((member) => member.id !== id)]);
    setOptions((prev) => [...prev, { label, id }]);
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        noOptionsText={t('noMoreAgents')}
        disablePortal
        id="agents"
        options={options}
        sx={{ width: '100%', mb: '1rem' }}
        disabled={options.length === 0}
        ListboxProps={{ style: { maxHeight: '10rem' } }}
        getOptionKey={(option) => option.id}
        isOptionEqualToValue={(option, optionValue) => option.valueOf === optionValue.valueOf}
        renderInput={(params) => (
          <TextField
            autoFocus
            {...params}
            label={options.length > 0 ? t('searchPlaceholder') : t('noMoreAgents')}
          />
        )}
        value={value}
        onChange={(event, newValue: Option | null) => {
          if (
            newValue &&
            options.some((option) => option.id === newValue.id && option.label === newValue.label)
          ) {
            setMembers((prev) => [...prev, newValue]);
            setOptions((prev) => [...prev.filter((option) => option.id !== newValue?.id)]);
            setValue(newValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue, reason) => {
          if (reason === 'reset') {
            setInputValue('');

            return;
          }
          setInputValue(newInputValue);
        }}
      />

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
      <Stack sx={{ mt: 5, position: 'relative' }}>
        {(isLoadingWhenUpdate || isloadingWhenGetUsers || !usersData || !authUser) && (
          <LoadingScreen
            sx={{
              position: 'absolute',
              top: '-70px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '100',
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={members?.length === 0}
          sx={{ mb: '1rem' }}
        >
          {t('addToChat')}
        </Button>
        <Button type="reset" variant="contained" color="error" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}