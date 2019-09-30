import * as React from 'react';
import { useState, useEffect } from 'react';
import { thousandsWithRound } from '../helpers';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ScheduleProps } from '../types';

const Schedule: React.FC<ScheduleProps> = ({
  schedule,
  round,
  currency,
  start,
}: ScheduleProps) => {
  const [t] = useTranslation();
  const [items, setItems] = useState(schedule.slice(0, 10));

  const addItems = () => {
    if (items.length >= schedule.length) return;

    const diff = schedule.length - items.length > 10 ? 10 : items.length;

    setItems(schedule.slice(0, items.length + diff));
  };

  useEffect(addItems);

  return (
    <Box maxHeight="90vh" width="80vw" overflow="scroll">
      <Paper>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>{t('paymentDate')}</TableCell>
              <TableCell align="right">{t('paymentTotal')}</TableCell>
              <TableCell align="right">{t('interest')}</TableCell>
              <TableCell align="right">{t('principal')}</TableCell>
              <TableCell align="right">{t('unpaidBalance')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, i) => (
              <TableRow key={row.balance}>
                <TableCell component="th" scope="row">
                  {format(addMonths(start, i), 'dd.MM.yyyy')}
                </TableCell>
                <TableCell align="right">
                  {currency}
                  {thousandsWithRound(row.payment, round)}
                </TableCell>
                <TableCell align="right">
                  {currency}
                  {thousandsWithRound(row.interest, round)}
                </TableCell>
                <TableCell align="right">
                  {currency}
                  {thousandsWithRound(row.principal, round)}
                </TableCell>
                <TableCell align="right">
                  {currency}
                  {thousandsWithRound(row.balance, round)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Schedule;
