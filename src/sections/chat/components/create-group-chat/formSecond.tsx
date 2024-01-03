import { Button, Box, Stack, TextField, Autocomplete, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import { LoadingScreen } from 'components/loading-screen';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { useEffect, useSelector, useState, useRouter, useForm } from 'hooks';
import { Page500 } from 'sections/error';
import { RootState } from 'store';
import { useGetAllUsersMutation } from 'store/api/userApi';
import { UserProfileResponse } from 'types';
import { createSocketFactory } from 'utils';
import uuidv4 from 'utils/uuidv4';

type Props = {
  t: Function;
  room: {
    id: string;
    title: string;
  };
  closeModalUp: () => void;
  initialMembers: Members;
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

export default function FormSecond({ t, room, closeModalUp, initialMembers }: Props): JSX.Element {
  const [options, setOptions] = useState<Options>([]);
  const [members, setMembers] = useState<Members>(initialMembers);

  const [value, setValue] = useState<Option | null>(null);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const [getAllUsers, { data: usersData, isLoading, isError }] = useGetAllUsersMutation();
  const router = useRouter();

  const socket = createSocketFactory();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const { id: ownerId }: { id: UserProfileResponse['id'] | null } = authUser || { id: null };

  useEffect(() => {
    if (usersData) {
      const newOptions = usersData
        .filter(({ id }) => id !== ownerId)
        .map(({ firstName, lastName, id }) => ({ label: `${firstName} ${lastName}`, id }));

      setOptions(newOptions);
    }
  }, [ownerId, usersData]);

  // const groupData = {
  //   owner: ownerId,
  //   title: groupName,
  //   members: members.map((member) => member.id),
  // };

  const { reset, handleSubmit } = useForm({
    mode: 'onTouched',
  });

  console.log(socket);
  const onSubmit = async (): Promise<void> => {
    try {
      members.forEach((member) => socket(room.id, member.id));

      router.push(`${AppRoute.CHAT_PAGE}/${room.id}`);

      reset();
    } catch (error) {
      reset();
    }
  };

  const handleClickDelete = ({ label, id }: Option): void => {
    setMembers((prev) => [...prev.filter((member) => member.id !== id)]);
    setOptions((prev) => [...prev, { label, id }]);
  };

  if (isLoading || !usersData || !authUser) return <LoadingScreen />;
  if (isError) return <Page500 />;

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ marginBottom: '0.5rem' }}>{t('groupName')}</Typography>
      <Typography variant="h3" sx={{ marginBottom: '1.5rem' }}>
        {room.title}
      </Typography>
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
      <Stack sx={{ mt: 5 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={members.length === 0}
          sx={{ mb: '1rem' }}
        >
          {t('addToChat')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}
