import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Box } from '@material-ui/core';
import { IModalProps } from '../types';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const ModalComponent: React.FC<IModalProps> = ({
  render,
  open,
  onClose,
}: {
  render: () => React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <Box>{render()}</Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
