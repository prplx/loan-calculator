import * as React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import {
  Box,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { object, date, number, string } from 'yup';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { MainTitle } from './atoms';
import FormikDatePicker from './FormikDatePicker';
import FormikNumberFormat from './FormikNumberFormat';
import { useTranslation } from 'react-i18next';
import { calculateLoan } from '../api';
import { LoanContext } from '../contexts/loanContextProvider';
import { LoanActionTypes, ICalculation } from '../types';
import Modal from './Modal';
import Schedule from './Schedule';
import i18n from './i18n';

const schema = object().shape({
  procedure: string()
    .matches(/(A|D)/)
    .required(i18n.t('requiredField')),
  start: date()
    .required(i18n.t('requiredField'))
    .typeError(i18n.t('correctDate')),
  term: number()
    .positive(i18n.t('correctTerm'))
    .required(i18n.t('requiredField'))
    .integer(i18n.t('correctTerm'))
    .typeError(i18n.t('correctTerm')),
  amount: number()
    .positive(i18n.t('correctAmount'))
    .required(i18n.t('requiredField'))
    .typeError(i18n.t('correctAmount')),
  rate: number()
    .positive(i18n.t('correctInterest'))
    .required(i18n.t('requiredField'))
    .typeError(i18n.t('correctInterest')),
});

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 230,
  },
  button: {
    backgroundColor: '#41C9EB',
    color: 'white',
    padding: '12px 48px',

    '&:hover': {
      backgroundColor: '#11d1Ea',
    },
  },
  inputButton: {
    width: '48px',
    height: '48px',
    fontWeight: 700,
    fontSize: 'inherit',
  },
}));

const LoanMain: React.FC = () => {
  const [initialValues] = useState({
    procedure: 'A',
    start: new Date(),
    term: '',
    amount: '',
    rate: '',
  });

  const classes = useStyles();
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (!inputLabel.current) return;
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const { state, dispatch } = useContext(LoanContext);
  const [t] = useTranslation();

  if (!state || !dispatch) return null;

  return (
    <Box>
      <MainTitle>{t('title')}</MainTitle>
      <Box mt="2em">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch({
              type: LoanActionTypes.SET_VALUES,
              payload: schema.cast(values),
            });
            calculateLoan(schema.cast(values))
              .then((data: ICalculation) =>
                dispatch({
                  type: LoanActionTypes.SET_CALCULATION,
                  payload: data,
                }),
              )
              .finally(() => setSubmitting(false));
          }}
          validationSchema={schema}
          render={({ isSubmitting }) => (
            <Form>
              <Box display="flex">
                <Box mr={1} width="1">
                  <Field
                    name="amount"
                    component={FormikNumberFormat}
                    variant="outlined"
                    label={t('loanAmount')}
                    fullWidth
                    thousandSeparator
                    decimalScale={2}
                    disabled={isSubmitting}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className={classes.inputButton}
                            aria-label="toggle term currency"
                            onClick={() =>
                              dispatch({
                                type: LoanActionTypes.SET_ACTIVE_CURRENCY,
                              })
                            }>
                            {state.currencies[0]}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box ml={1} width="1">
                  <Field
                    name="term"
                    component={TextField}
                    variant="outlined"
                    label={t('loanTerm')}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {t('monthAbbreviation')}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" mt="1em">
                <Box mr={1} width="1">
                  <Field
                    name="start"
                    component={FormikDatePicker}
                    variant="outlined"
                    label={t('startDate')}
                    fullWidth
                    disabled={isSubmitting}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
                <Box ml={1} width="1">
                  <Field
                    name="rate"
                    component={TextField}
                    variant="outlined"
                    label={t('interestRate')}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box width="1" mt="1em" display="flex">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    {t('loanType')}
                  </InputLabel>
                  <Field
                    name="procedure"
                    component={Select}
                    input={
                      <OutlinedInput labelWidth={labelWidth} name="procedure" />
                    }>
                    <MenuItem value="A">{t('evenTotalType')}</MenuItem>
                    <MenuItem value="D">{t('evenPrincipalType')}</MenuItem>
                  </Field>
                </FormControl>
                <Box mt="4px" ml="32px">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.round}
                        disabled={isSubmitting}
                        onChange={() =>
                          dispatch({
                            type: LoanActionTypes.SET_ROUND,
                            payload: !state.round,
                          })
                        }
                        value="round"
                        color="primary"
                      />
                    }
                    label={t('round')}
                  />
                </Box>
              </Box>
              <Box width="1" mt="2em">
                <Button
                  variant="contained"
                  className={classes.button}
                  disabled={isSubmitting}
                  type="submit">
                  {t('calculate')}
                </Button>
              </Box>
            </Form>
          )}
        />
      </Box>
      <Modal
        render={() =>
          state.values &&
          state.calculation && (
            <Schedule
              schedule={state.calculation.schedule}
              round={state.round}
              start={state.values.start}
              currency={state.currencies[0]}
            />
          )
        }></Modal>
    </Box>
  );
};

export default LoanMain;
