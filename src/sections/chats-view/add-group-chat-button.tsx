'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { CreateGroupChat } from 'sections/chat/components/create-group-chat/create-group-chat';

type Props = {
  t: Function;
};

export default function AddGroupChatButton({ t }: Props): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);

  function closeModal(): void {
    setOpenModal(!openModal);
  }

  return (
    <>
      {openModal && <CreateGroupChat openModal={openModal} closeModal={() => closeModal()} />}
      <Button
        title={t('addGroupChatButton')}
        sx={{ padding: '14px' }}
        variant="contained"
        color="primary"
        onClick={(): void => setOpenModal(!openModal)}
        className="onboarding-step-13"
      >
        {t('addGroupChatButton')}
      </Button>{' '}
    </>
  );
}
