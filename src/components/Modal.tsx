import * as React from 'react';
import { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Box } from '@material-ui/core';
import { LoanContext } from '../contexts/loanContextProvider';
import { LoanActionTypes } from '../types';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const ModalComponent: React.FC<{ render: () => React.ReactNode }> = ({
  render,
}: {
  render: () => React.ReactNode;
}) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(LoanContext);

  if (!state || !dispatch) return null;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={state.modalIsOpen}
      onClose={() => dispatch({ type: LoanActionTypes.SET_MODAL_IS_OPEN })}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={state.modalIsOpen}>
        <Box>{render()}</Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
