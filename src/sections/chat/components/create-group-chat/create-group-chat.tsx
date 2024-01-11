import { Box, Modal } from '@mui/material';
import ButtonClose from 'components/custom/button-close/button-close';
import { colors } from 'constants/colors';
import { useTranslations, useCloseModal } from 'hooks';
import FormAddGroupChat from 'sections/chat/components/create-group-chat/form-add-group-chat';

type Props = {
  closeModal: () => void;
  openModal: boolean;
};

const CreateGroupChat = ({ closeModal, openModal }: Props): JSX.Element => {
  const handleClose = (): void => closeModal();

  useCloseModal(openModal, (): void => closeModal());

  const t = useTranslations('ChatsPage');

  return (
    <>
      {openModal && (
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
              top="0.5rem"
              right="0.5rem"
              width="1.5rem"
              height="1.5rem"
              handleClose={handleClose}
            />
            <FormAddGroupChat t={t} closeModalUp={handleClose} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export { CreateGroupChat };
