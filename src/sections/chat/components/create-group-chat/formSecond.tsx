'use client';

import { UserProfileResponse } from 'types';
import { Controller, useForm } from 'react-hook-form';
import { Button, Box, Stack, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import { useEffect, useSelector, useState } from 'hooks';
import { useGetAllUsersMutation } from 'store/api/userApi';
import { LoadingScreen } from 'components/loading-screen';
import { Page500 } from 'sections/error';
import { RootState } from 'store';

type TFunction = (key: string) => string;

type Props = {
  t: TFunction;
  groupName: string;
  closeModalUp: () => void;
};

type FormValues = {
  userId: string;
};

export default function FormSecond({ t, groupName, closeModalUp }: Props): JSX.Element {
  const [getAllUsers, { data: usersData, isLoading, isError }] = useGetAllUsersMutation();
  const [members, setMembers] = useState<string[]>([]);

  // const membersUp = (membersIds: string[]): void => {
  //   if (membersIds.length > 0) setMembers(membersIds);
  // };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  const { id: ownerId } = authUser;

  console.log(usersData);
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      userId: '',
    },
  });

  const handleChange = (e) => {
    setMembers((prev) => [...prev, e.target.value]);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    console.log(ownerId);
  };

  if (isLoading || !usersData || !authUser) return <LoadingScreen />;
  if (isError) return <Page500 />;

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}
      onSubmit={handleSubmit(onSubmit)}
      onChange={(e) => handleChange(e)}
      noValidate
      autoComplete="off"
    >
      <InputLabel id="userName">{t('enterAgentName')}</InputLabel>
      <Controller
        name="userId"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            labelId="userName"
            input={<OutlinedInput label={t('usersList')} />}
            variant="filled"
            sx={{ width: '100%', borderRadius: '0.5rem' }}
            onChange={handleChange}
          >
            {Object.values(usersData).map(({ firstName, lastName, id }) => (
              <MenuItem key={id} value={`${id} / ${firstName} ${lastName}`}>
                {`${firstName} ${lastName}`}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {members.length > 0 && members.map((user) => <li>{user}</li>)}
      <Stack sx={{ mt: 5 }}>
        <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
          {t('addToChat')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}
