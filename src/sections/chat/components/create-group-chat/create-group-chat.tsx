import { Box, Modal } from '@mui/material';
import ButtonClose from 'components/custom/button-close/button-close';
import { colors } from 'constants/colors';
import { useState, useTranslations, useCloseModal } from 'hooks';
import FormFirst from 'sections/chat/components/create-group-chat/formFirst';
import FormSecond from 'sections/chat/components/create-group-chat/formSecond';

type Props = {
  closeModal: () => void;
  openModal: boolean;
};

const CreateGroupChat = ({ closeModal, openModal }: Props): JSX.Element => {
  const [firstModal, setFirstModal] = useState<boolean>(openModal);
  const [secondModal, setSecondModal] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const groupNameUp = (name: string): void => {
    if (name !== '') {
      setGroupName(name);
      setFirstModal(false);
      setSecondModal(true);
    }
  };

  const handleClose = (): void => closeModal();

  useCloseModal(openModal, (): void => closeModal());

  const t = useTranslations('MessagesPage');

  return (
    <>
      {firstModal && (
        <Modal
          open
          sx={{
            margin: '5%',
            height: 'fit-content',
            width: '90%',
            minWidth: '90%',
            overflow: 'hidden',
            borderRadius: '1rem',
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.PRIMARY_LIGHT_COLOR,
              padding: '2rem',
              position: 'relative',
              height: '100%',
              border: `1px solid ${colors.PRIMARY_DARK_COLOR}`,
              borderRadius: '1rem',
            }}
          >
            <ButtonClose
              top="0"
              right="0"
              width="1.5rem"
              height="1.5rem"
              handleClose={handleClose}
            />
            <FormFirst t={t} groupNameUp={groupNameUp} closeModalUp={handleClose} />
          </Box>
        </Modal>
      )}
      {secondModal && (
        <Modal
          open
          sx={{
            margin: '5%',
            height: 'fit-content',
            width: '90%',
            minWidth: '90%',
            overflow: 'hidden',
            borderRadius: '1rem',
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.PRIMARY_LIGHT_COLOR,
              padding: '2rem',
              position: 'relative',
              height: '100%',
              border: `1px solid ${colors.PRIMARY_DARK_COLOR}`,
              borderRadius: '1rem',
            }}
          >
            <ButtonClose
              top="0"
              right="0"
              width="1.5rem"
              height="1.5rem"
              handleClose={handleClose}
            />
            <FormSecond t={t} groupName={groupName} closeModalUp={handleClose} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export { CreateGroupChat };
