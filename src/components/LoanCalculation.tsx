import * as React from 'react';
import { useContext } from 'react';
import styled from '@emotion/styled';
import { Box } from '@material-ui/core';
import PieChart from 'react-minimal-pie-chart';
import { LoanContext } from '../contexts/loanContextProvider';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import { thousandsWithRound, getMonthlyPayment } from '../helpers';

const getFinalPaymentDate = (start: Date, term: number) =>
  format(addMonths(start, term), 'dd.MM.yyyy');

const LoanCalculation: React.FC = () => {
  const { state } = useContext(LoanContext);
  const [t] = useTranslation();

  if (!state || !state.values || !state.calculation) return null;

  return (
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
            lineWidth={12}
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

export default LoanCalculation;
