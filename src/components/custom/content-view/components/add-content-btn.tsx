'use client';

import { useState } from 'react';
import { IconButton } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { ContentType } from 'types/content';
import { AddContentModal } from './add-content-modal';

type Props = {
  type: ContentType;
};

export default function AddContentBtn({ type }: Props): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {openModal && <AddContentModal openModal={openModal} closeModal={toggleModal} type={type} />}

      <IconButton aria-label="add content" size="large" color="primary" onClick={toggleModal}>
        <Iconify icon="eva:file-add-outline" width="48px" />
      </IconButton>
    </>
  );
}
