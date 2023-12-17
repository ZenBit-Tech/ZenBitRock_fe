'use client';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Box, Card } from '@mui/material';
import { ILead } from 'types/lead';
import { endpoints } from 'utils/axios';

import { TextStyled } from '../../styles';

const URL = endpoints.lead;

function Lead({ lead }: { lead: ILead }): JSX.Element {
  const t = useTranslations('leads');
  const router = useRouter();

  const { leadId, status, source, contactName, contactEmail, contactPhone } = lead;

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '2rem',
        padding: '1rem',
        paddingLeft: '3rem',
        cursor: 'pointer',
      }}
      onClick={() => router.push(`${URL.details}/${leadId}`)}
    >
      <Box
        sx={{
          width: '100%',
          height: '50%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'baseline',
            gap: '2rem',
            marginBottom: '1.5rem',
          }}
        >
          <TextStyled
            sx={{
              fontWeight: 'bold',
              width: '3rem',
            }}
          >
            {t('source')}:
          </TextStyled>
          <TextStyled
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {source ? t(source) : t('null')}
          </TextStyled>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}
        >
          <TextStyled
            sx={{
              fontWeight: 'bold',
              width: '3rem',
            }}
          >
            {t('status')}:
          </TextStyled>
          <TextStyled>{t(status)}</TextStyled>{' '}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}
        >
          <TextStyled
            sx={{
              fontWeight: 'bold',
              width: '3rem',
            }}
          >
            {t('contact')}:
          </TextStyled>
          <TextStyled>{contactName}</TextStyled>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}
        >
          <TextStyled
            sx={{
              fontWeight: 'bold',
              width: '3rem',
            }}
          >
            {contactPhone ? t('phone') : t('email')}:
          </TextStyled>
          <TextStyled>{contactPhone ? contactPhone : contactEmail}</TextStyled>
        </Box>
      </Box>
    </Card>
  );
}

export default Lead;
