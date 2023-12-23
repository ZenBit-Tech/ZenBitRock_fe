import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useEffect, useState, useTranslations } from 'hooks';
import { IHistory, QobrixLead } from 'types';
import { useCloseModal } from 'components/custom/property/hooks/useCloseModal';
import {
  useAllPagesCallsData,
  useAllPagesEmailsData,
  useAllPagesMeetingsData,
  useAllPagesSmsesData,
  useAllPagesStatusChangesData,
  useAllPagesTaskChangesData,
  useAllPagesTasksData,
} from './history-hooks';
import { sortHistory } from './utils/sort-history';
import { colors } from 'constants/colors';
import Iconify from 'components/iconify';

type Props = { lead: QobrixLead };

const LeadHistorySection = ({ lead }: Props): JSX.Element => {
  const [toggleModal, setToggleModal] = useState<boolean>(true);

  const [history, setHistory] = useState<IHistory>();
  const [sortedHistory, setSortedHistory] = useState<string[][]>([]);

  const t = useTranslations('leadDetailsPage');

  useCloseModal(toggleModal, () => setToggleModal(false));

  const { id, created, contact_name_contact } = lead;

  const tasks = useAllPagesTasksData(id);
  const smses = useAllPagesSmsesData(id);
  const emails = useAllPagesEmailsData(id);
  const calls = useAllPagesCallsData(id);
  const meetings = useAllPagesMeetingsData(id);
  const statusChanges = useAllPagesStatusChangesData(id);
  const taskChanges = useAllPagesTaskChangesData(tasks?.data);

  // Fetch and set history when id changes
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

  // Sort and set history when created or contact_name_contact changes
  useEffect(() => {
    setTimeout(
      () => setSortedHistory(sortHistory(id, created, contact_name_contact, history, t)),
      2000
    );
  }, [id, created, contact_name_contact, history, t]);
  console.log(sortedHistory);

  return (
    <>
      {toggleModal && (
        <Modal
          open
          sx={{
            overflowY: 'auto',
            margin: '2rem',
            border: '1px solid black',
            borderRadius: '1rem',
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.PRIMARY_LIGHT_COLOR,
              padding: '0.5rem',
              position: 'relative',
            }}
          >
            <Iconify
              icon="carbon:close-outline"
              width="1.5rem"
              height="1.5rem"
              sx={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }}
              onClick={() => setToggleModal(false)}
            />
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
            <Grid
              container
              direction="row"
              sx={{ width: '100%', marginBottom: '1rem' }}
              spacing={2}
            >
              <Grid item xs={4} sm={4}>
                {/* sx={{ display: 'flex', alignItems: 'flex-base', gap: '1rem' }} */}
                <Grid container direction="column" sx={{ width: '100%' }}>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      fontWeight: 'bold',
                    }}
                  >
                    {t('date')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={8} sm={4}>
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
            {sortedHistory &&
              sortedHistory?.map((element) => (
                <Grid
                  container
                  direction="row"
                  key={element[0]}
                  sx={{ width: '100%', marginBottom: '1rem' }}
                  spacing={2}
                >
                  <Grid item xs={4} sm={4}>
                    {/* sx={{ display: 'flex', alignItems: 'flex-base', gap: '1rem' }} */}
                    <Grid container direction="column" sx={{ width: '100%' }}>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          whiteSpace: 'nowrap',
                          textAlign: 'right',
                        }}
                      >
                        {new Date(element[1]).toDateString()}
                        <br />
                        {new Date(element[1]).toTimeString().split(' GMT')[0]}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={8} sm={4}>
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
        </Modal>
      )}
    </>
  );
};

export { LeadHistorySection };
