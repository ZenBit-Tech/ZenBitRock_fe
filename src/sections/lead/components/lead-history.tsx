import { Box, Grid, Modal, Typography } from '@mui/material';
import ButtonClose from 'components/custom/button-close/button-close';
import { colors } from 'constants/colors';
import { useEffect, useState, useTranslations, useCloseModal } from 'hooks';
import {
  useAllPagesCallsData,
  useAllPagesEmailsData,
  useAllPagesMeetingsData,
  useAllPagesSmsesData,
  useAllPagesStatusChangesData,
  useAllPagesTaskChangesData,
  useAllPagesTasksData,
} from 'sections/lead/components/history-hooks';
import { sortHistory } from 'sections/lead/components/utils/sort-history';
import { IHistory, QobrixLead } from 'types';
import uuidv4 from 'utils/uuidv4';

type Props = {
  lead: QobrixLead;
  closeModal: () => void;
  openModal: boolean;
};

const LeadHistorySection = ({ lead, closeModal, openModal }: Props): JSX.Element => {
  const [history, setHistory] = useState<IHistory>();
  const [sortedHistory, setSortedHistory] = useState<string[][]>([]);

  const handleClose = (): void => closeModal();

  useCloseModal(openModal, (): void => closeModal());

  const t = useTranslations('leadDetailsPage');

  const { id, created, contact_name_contact } = lead;

  const tasks = useAllPagesTasksData(id);
  const smses = useAllPagesSmsesData(id);
  const emails = useAllPagesEmailsData(id);
  const calls = useAllPagesCallsData(id);
  const meetings = useAllPagesMeetingsData(id);
  const statusChanges = useAllPagesStatusChangesData(id);
  const taskChanges = useAllPagesTaskChangesData(tasks?.data);

  useEffect(() => {
    if (id) {
      setHistory({
        calls: calls?.data,
        emails: emails?.data,
        smses: smses?.data,
        meetings: meetings?.data,
        statusChanges: statusChanges?.data,
        taskChanges,
      });
    }
  }, [id, calls, emails, smses, meetings, statusChanges, taskChanges]);

  useEffect(() => {
    if (id && history) {
      const sortedEntries = sortHistory(id, created, contact_name_contact, history, t);

      setSortedHistory(sortedEntries);
    }
  }, [id, created, contact_name_contact, history, t]);

  return (
    <Modal
      open
      sx={{
        margin: '5%',
        maxHeight: '90%',
        width: '90%',
        minWidth: '90%',
        overflow: 'hidden',
        borderRadius: '1rem',
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.PRIMARY_LIGHT_COLOR,
          padding: '2rem 0.5rem',
          position: 'relative',
          height: '100%',
          border: '1px solid black',
          borderRadius: '1rem',
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.PRIMARY_LIGHT_COLOR,
            position: 'relative',
            height: 'fit-content',
            width: '100%',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '1px',
              background: `linear-gradient(90deg, ${colors.PRIMARY_LIGHT_COLOR} 0%, ${colors.BUTTON_PRIMARY_COLOR} 50%, ${colors.PRIMARY_LIGHT_COLOR} 100%)`,
            },
            marginBottom: '1rem',
          }}
        >
          <ButtonClose top="0" right="0" width="1.5rem" height="1.5rem" handleClose={handleClose} />
          <Typography
            sx={{
              fontSize: '1.5rem',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
            }}
          >
            {t('history')}
          </Typography>
          <Grid container direction="row" sx={{ width: '100%', mx: 'auto' }} spacing={2}>
            <Grid item sx={{ width: '30%' }}>
              <Grid container direction="column" sx={{ width: '100%' }}>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}
                >
                  {t('date')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sx={{ width: '70%' }}>
              <Grid container direction="column" sx={{ width: '100%' }}>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                >
                  {t('activity')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            overflowY: 'scroll',
            height: 'calc(100% - 5rem)',
            width: '100%',
            padding: '0',
            '&::-webkit-scrollbar': {
              backgroundColor: 'transparent',
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.BUTTON_PRIMARY_COLOR,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: colors.BUTTON_SECOND_COLOR,
            },
          }}
        >
          {sortedHistory &&
            sortedHistory?.map((element) => (
              <Grid
                container
                direction="row"
                key={uuidv4()}
                sx={{ width: '100%', marginBottom: '1rem', mx: 'auto' }}
                spacing={2}
              >
                <Grid item sx={{ width: '30%' }}>
                  <Grid container direction="column" sx={{ width: '100%' }}>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        textAlign: 'right',
                      }}
                    >
                      {new Date(element[1]).toDateString()}
                      <br />
                      {new Date(element[1]).toTimeString().split(' GMT')[0]}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item sx={{ width: '70%' }}>
                  <Grid container direction="column" sx={{ width: '100%' }}>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                      }}
                    >
                      {element[2]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Box>
      </Box>
    </Modal>
  );
};

export { LeadHistorySection };
