'use client';

import { Box, Fab, Link, Stack, Typography, useTheme } from '@mui/material';
import Iconify from 'components/iconify';
import { useCallback, useScrollToTop, useState, useTranslations } from 'hooks';
import { QobrixLeadDetailsResponse } from 'types';
import { colors } from 'constants/colors';
import { GoBackPageTitile } from 'components/custom';
import { MatchingPropertiesView } from './matching-properties-view';
import {
  LeadDeleteComponent,
  LeadDetailsBudgetSection,
  LeadDetailsFeaturesSection,
  LeadDetailsSourceSection,
} from './components';

import { LeadHistorySection } from './components/lead-history';

type Props = {
  leadDetails: QobrixLeadDetailsResponse;
};

const LeadDetailsView = ({ leadDetails }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [matchingPropertiesCount, setMatchingPropertiesCount] = useState<number | null>(null);
  const t = useTranslations('leadDetailsPage');
  const theme = useTheme();
  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data } = leadDetails;
  const {
    contact_name_contact: contact,
    conversion_status_workflow_stage: workflow,
    property_type: propertyType,
    id,
  } = data;

  const handleSetPropertiesCount = useCallback(
    (count: number) => setMatchingPropertiesCount(count),
    [setMatchingPropertiesCount]
  );

  function closeModal(): void {
    setOpenModal(!openModal);
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', pb: 8 }}>
      <Box sx={{ ml: 1, mr: 1 }}>
        <GoBackPageTitile title={t('title')} ml="-20px" />
      </Box>

      <Box sx={{ m: 1, p: 1, border: `1px solid ${theme.palette.primary.main}` }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h4" color="text.secondary">
              {contact.name}
            </Typography>
            <Typography variant="body2" display="flex" gap="2px">
              {`${t('status')} :`}
              <Link
                variant="subtitle2"
                sx={{
                  cursor: 'pointer',
                }}
              >
                {workflow.name}
              </Link>
            </Typography>
            {propertyType && (
              <Typography variant="body2">{`${t('enquiryType')} : ${
                propertyType.name
              }`}</Typography>
            )}
            <Typography variant="body2">{`${t('matchingProperties')} : ${
              matchingPropertiesCount ?? ''
            }`}</Typography>
            <Typography variant="body2">{`${t('created')} : ${
              data.created ? new Date(data.created).toDateString() : ''
            }`}</Typography>
          </Stack>
          <LeadDetailsSourceSection lead={data} />
          <LeadDetailsBudgetSection lead={data} />
          <LeadDetailsFeaturesSection lead={data} />
        </Stack>
        {openModal && (
          <LeadHistorySection lead={data} openModal={openModal} closeModal={() => closeModal()} />
        )}
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
          onClick={(): void => setOpenModal(!openModal)}
        >
          <Iconify icon="iconoir:list" width="1.5rem" height="1.5rem" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
            {t('open_history')}
          </Typography>
        </Link>
        <LeadDeleteComponent t={t} id={id} />
      </Box>
      <MatchingPropertiesView lead={data} setMatchingPropertiesCount={handleSetPropertiesCount} />
      <Fab
        color="primary"
        aria-label="scroll to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          display: isVisible ? 'block' : 'none',
          transition: 'easy-in 200 display',
        }}
      >
        ↑
      </Fab>
    </Box>
  );
};

export { LeadDetailsView };
