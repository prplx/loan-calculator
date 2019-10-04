import * as React from 'react';
import { useContext } from 'react';
import styled from '@emotion/styled';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoanContext } from '../contexts/loanContextProvider';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';
import { FaWikipediaW } from 'react-icons/fa';
import { LoanActionTypes } from '../types';
import LoanCalculation from './LoanCalculation';

const useStyles = makeStyles(() => ({
  button: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',

    '&:hover': {
      color: '#ededed',
      border: '1px solid #ededed',
    },
  },
}));

const AsideMain: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(LoanContext);
  const [t] = useTranslation();

  if (!state || !dispatch) return null;

  if (state.calculating) {
    return (
      <LoaderWrapper>
        <Loader></Loader>
      </LoaderWrapper>
    );
  }

  return state.calculation && state.values ? (
    <Box>
      <LoanCalculation />
      <Box mt="2em">
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() =>
            dispatch({ type: LoanActionTypes.SET_SCHEDULE_MODAL_IS_OPEN })
          }>
          {t('paymentsSchedule')}
        </Button>
      </Box>
    </Box>
  ) : (
    <Box>
      <WikiLogo>
        <FaWikipediaW size="1.5em"></FaWikipediaW>
      </WikiLogo>
      <Box lineHeight="1.8em" fontSize="0.5em" textAlign="justify">
        <b>{t('wikiEvenTotalTypeTitle')}.</b> {t('wikiEvenTotalType')}
        <br />
        <br />
        <b>{t('wikiEvenPrincipalTypeTitle')}.</b> {t('wikiEvenPrincipalType')}
      </Box>
    </Box>
  );
};

const WikiLogo = styled.span`
  display: inline-block;
  margin-bottom: 0.6em;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default AsideMain;
