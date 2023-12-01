'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppRoute } from 'enums';
import { useCreateAgentMutation, useCreateContactMutation } from 'store/api/qobrixApi';
import { useGetUserByIdMutation } from 'store/api/getUserApi';
import { selectCurrentUser } from 'store/auth/authReducer';

export default function VerificationDoneView(): JSX.Element {
  const [createContact] = useCreateContactMutation();
  const [createAgent] = useCreateAgentMutation();
  const [getUserById] = useGetUserByIdMutation();
  const t = useTranslations('VerificationDonePage');

  const { replace } = useRouter();

  const authState = useSelector(selectCurrentUser);
  const userId = authState.id;

  async function createAgentQobrix(): Promise<void> {
    try {
      const user = await getUserById({ id: userId });

      if ('data' in user) {
        const {
          city,
          country,
          dateOfBirth,
          email,
          firstName,
          id,
          lastName,
          nationality,
          phone,
          role,
          state,
          street,
          zip,
        } = user.data;

        const contactData = {
          first_name: firstName,
          last_name: lastName,
          role,
          birthdate: dateOfBirth,
          nationality,
          street,
          country,
          state,
          city,
          post_code: zip,
          email,
          phone,
          legacy_id: id,
        };

        const contact = await createContact(contactData);

        if ('data' in contact) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { role, legacy_id, id } = contact.data.data;

          const agentData = {
            agent_type: role,
            legacy_id,
            primary_contact: id,
          };

          await createAgent(agentData);
        }
      }

      return undefined;
    } catch (error) {
      return error;
    }
  }

  const handleClick = () => {
    createAgentQobrix();
    replace(AppRoute.SIGN_IN_PAGE);
  };

  return (
    <Box
      gap={5}
      display="grid"
      maxWidth="600px"
      margin="0 auto"
      sx={{ my: 5 }}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
    >
      <Stack spacing={5}>
        <Typography align="center" variant="h2">
          {t('mainTitle')}
        </Typography>

        <Stack spacing={3}>
          <Typography align="center" variant="body1" fontSize={16}>
            {t('doneTextFirstPart')}
          </Typography>

          <Typography align="center" variant="body1" fontSize={16}>
            {t('doneTextSecondPart')}
          </Typography>

          <LoadingButton
            fullWidth
            color="info"
            size="large"
            variant="text"
            style={{ marginBottom: '70px' }}
            onClick={handleClick}
          >
            {t('submitButton')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}
