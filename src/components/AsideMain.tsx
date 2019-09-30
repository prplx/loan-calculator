import * as React from 'react';
import { useContext } from 'react';
import styled from '@emotion/styled';
import { Box, Button } from '@material-ui/core';
import PieChart from 'react-minimal-pie-chart';
import { makeStyles } from '@material-ui/core/styles';
import { LoanContext } from '../contexts/loanContextProvider';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';
import { FaWikipediaW } from 'react-icons/fa';
import { thousandsWithRound } from '../helpers';
import { LoanActionTypes, ILoanState } from '../types';

const getFinalPaymentDate = (start: Date, term: number) =>
  format(addMonths(start, term), 'dd.MM.yyyy');

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

  const getMonthlyPayment = (loanState: ILoanState): string | undefined => {
    const { values, calculation, round } = loanState;

    if (!values || !calculation) return;

    switch (values.procedure) {
      case 'A':
        return thousandsWithRound(calculation.schedule[0].payment, round);
      case 'D':
        return `${thousandsWithRound(
          calculation.schedule[0].payment,
          round,
        )}...${thousandsWithRound(
          calculation.schedule[calculation.schedule.length - 1].payment,
          round,
        )}`;
    }
  };

  if (state.calculating) {
    return (
      <LoaderWrapper>
        <Loader></Loader>
      </LoaderWrapper>
    );
  }

  return state.calculation && state.values ? (
    <Box>
      <Box fontSize="0.6em">{t('monthlyPayments')}</Box>
      <Box
        mt="0.2em"
        fontWeight={300}
        fontSize={state.values.procedure === 'A' ? '1.8em' : '1.5em'}>
        {state.currencies[0]}
        {getMonthlyPayment(state)}
      </Box>
      <List>
        <ListItem>
          <Box fontSize="1rem">{t('totalInterestPaid')}</Box>
          <Box fontWeight="500" fontSize="0.6em">
            {state.currencies[0]}
            {thousandsWithRound(state.calculation.totalInterest, state.round)}
          </Box>
        </ListItem>
        <ListItem>
          <Box fontSize="1rem">{t('totalPayments')}</Box>
          <Box fontWeight="500" fontSize="0.6em">
            {state.currencies[0]}
            {thousandsWithRound(state.calculation.totalPayments, state.round)}
          </Box>
        </ListItem>
        <ListItem>
          <Box fontSize="1rem">{t('finalPaymentDate')}</Box>
          <Box fontWeight="500" fontSize="0.6em">
            {getFinalPaymentDate(state.values.start, state.values.term)}
          </Box>
        </ListItem>
      </List>
      <Box
        display="flex"
        justifyContent="center"
        mt="2.4em"
        alignItems="center"
        flexDirection="column">
        <Box fontSize="0.6em">{t('paymentsRatio')}</Box>
        <Box
          mt="0.7em"
          display="flex"
          justifyContent="center"
          width="100%"
          position="relative">
          <PieChart
            data={[
              {
                title: `${t('totalPayments')}`,
                value: state.calculation.totalPayments,
                color: '#40C9EA',
              },
              {
                title: `${t('totalInterestPaid')}`,
                value: state.calculation.totalInterest,
                color: '#4572FE',
              },
              {
                title: `${t('totalPrincipalPaid')}`,
                value: state.values.amount,
                color: '#8120E2',
              },
            ]}
            animate
            lineWidth={15}
            rounded
            style={{ width: '50%' }}
          />
          <ChartLegend>
            <ChartLegendBlock>
              <ChartLegendDot color="#8120E2" />
              {t('totalPrincipalPaid')}
            </ChartLegendBlock>
            <ChartLegendBlock>
              <ChartLegendDot color="#4572FE" />
              {t('totalInterestPaidShort')}
            </ChartLegendBlock>
            <ChartLegendBlock>
              <ChartLegendDot color="#40C9EA" />
              {t('totalPaymentsShort')}
            </ChartLegendBlock>
          </ChartLegend>
        </Box>
      </Box>
      <Box mt="2em">
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => dispatch({ type: LoanActionTypes.SET_MODAL_IS_OPEN })}>
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

const List = styled.ul`
  margin-top: 1.2em;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.6em;
  text-align: left;
`;

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

const ChartLegend = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ChartLegendBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.4em;

  &:nth-of-type(2) {
    margin: 0.7em 0;
  }
`;

const ChartLegendDot = styled.div<{ color: string }>`
  width: 0.9em;
  height: 0.9em;
  margin-right: 0.4em;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

export default AsideMain;
