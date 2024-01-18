'use client';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Box, Card } from '@mui/material';
import { TextStyled } from 'components/custom/leadsList/styles';
import { AppRoute } from 'enums';
import { QobrixLeadItem } from 'types';

export function Lead({
  lead,
  type,
  className,
}: {
  lead: QobrixLeadItem;
  type?: string;
  className: string;
}): JSX.Element {
  const t = useTranslations('leads');
  const router = useRouter();

  const { leadId, status, source, contactName, contactEmail, contactPhone } = lead;

  return (
    <Card
      className={className}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '2rem',
        padding: '1rem',
        cursor: 'pointer',
      }}
      onClick={() => router.push(`${AppRoute.LEADS_PAGE}/${leadId}`)}
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
              minWidth: '5.5rem',
              textAlign: 'right',
            }}
          >
            {t('source')}:
          </TextStyled>
          <TextStyled
            sx={{
              fontWeight: 'bold',
            }}
          >
            {source ? t(source) : t('null')}
          </TextStyled>
        </Box>
        {type && (
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
                minWidth: '5.5rem',
                textAlign: 'right',
              }}
            >
              {t('lookingFor')}:
            </TextStyled>
            <TextStyled>{type}</TextStyled>
          </Box>
        )}
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
              minWidth: '5.5rem',
              textAlign: 'right',
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
              minWidth: '5.5rem',
              textAlign: 'right',
            }}
          >
            {t('contact')}:
          </TextStyled>
          <TextStyled sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {contactName}
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
              minWidth: '5.5rem',
              textAlign: 'right',
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
