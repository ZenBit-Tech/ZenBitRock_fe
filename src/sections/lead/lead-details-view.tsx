'use client';

import { Box, Fab, Link, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { useScrollToTop, useTranslations } from 'hooks';
import { QobrixLeadDetailsResponse } from 'types';
import { MobileLayout } from 'layouts';
import { colors } from 'constants/colors';
import { GoBackPageTitile } from 'components/custom';
import { leadStatuses } from 'constants/leadStatuses';
import { useUpdateLeadMutation } from 'store/api/qobrixApi';
import { enqueueSnackbar } from 'components/snackbar';

import Iconify from 'components/iconify';
import {
  LeadDeleteComponent,
  LeadDetailsBudgetSection,
  LeadDetailsFeaturesSection,
  LeadDetailsSourceSection,
} from './components';
import { LeadHistorySection } from './components/lead-history';
import { MatchingPropertiesView } from './matching-properties-view';

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

  const [selectedStatus, setSelectedStatus] = useState<string>(
    leadDetails.data.conversion_status_workflow_stage.name
  );
  const [updateLeadMutation] = useUpdateLeadMutation();

  const handleStatusChange = async (status: string) => {
    const leadId = data.id;

    try {

      setSelectedStatus(status);
      
      await updateLeadMutation({
        id: leadId,
        conversion_status: status,
      });

      

    } catch (error) {
      const errMessage = t('error');
      enqueueSnackbar(errMessage, { variant: 'error' });
    }
  };

  function closeModal(): void {
    setOpenModal(!openModal);
  }

  return (
    <MobileLayout>
      <Box sx={{ ml: 1, mr: 1 }}>
        <GoBackPageTitile title={t('title')} ml="-20px" />
      </Box>
      <Stack spacing={1}>
        <Box
          sx={{
            m: 1,
            p: 1,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
          }}
        >
          <Stack spacing={2}>
            <Stack
              spacing={1}
              sx={{
                '::after': {
                  width: '100%',
                  marginTop: 1,
                  content: '""',
                  height: '1px',
                  background: `linear-gradient(90deg, ${colors.PRIMARY_LIGHT_COLOR} 0%,${colors.BUTTON_PRIMARY_COLOR} 50%,${colors.PRIMARY_LIGHT_COLOR} 100%)`,
                },
              }}
            >
              <Typography variant="h5" color="text.secondary">
                {contact.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Typography variant="body2">{`${t('status')} :`}</Typography>
                <Select
                 key={selectedStatus}
                  value={selectedStatus}
                  variant="standard"
                  onChange={(e) => handleStatusChange(e.target.value)}
                  sx={{ ml: 1, minWidth: '120px' }} // Adjust the styling as needed
                  renderValue={(selected) => {
                    const foundStatus = Object.values(leadStatuses).find(
                      (status) => status.id === selected
                    );
                    

                    return foundStatus ? foundStatus.label : leadDetails.data.conversion_status_workflow_stage.name;
                  }}
                >
                  <MenuItem value={leadDetails.data.conversion_status_workflow_stage.name}>
                    {leadDetails.data.conversion_status_workflow_stage.name}
                  </MenuItem>
                  {Object.entries(leadStatuses).map(([statusName, statusValue]) => (
                    <MenuItem key={statusName} value={statusValue.id}>
                      {statusValue.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
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
      </Stack>
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
    </MobileLayout>
  );
};

export { LeadDetailsView };
