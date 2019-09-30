import * as React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { getIn } from 'formik';
import { IFormikFieldProps } from '../types';

interface INumberFormatCustomProps extends NumberFormatProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

function NumberFormatCustom(props: INumberFormatCustomProps) {
  const {
    inputRef,
    onChange,
    thousandSeparator,
    decimalScale,
    ...rest
  } = props;

  return (
    <NumberFormat
      getInputRef={inputRef}
      thousandSeparator={thousandSeparator}
      decimalScale={decimalScale}
      onValueChange={({ value }) => {
        onChange({
          target: {
            value,
          },
        });
      }}
      {...rest}
    />
  );
}

const FormikNumberFormat = ({
  form: { setFieldValue, setFieldTouched, touched, errors },
  field: { value, name },
  label,
  fullWidth,
  InputProps = {},
  disabled,
  ...rest
}: IFormikFieldProps) => {
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  return (
    <TextField
      name={name}
      variant="outlined"
      helperText={showError && fieldError}
      label={label}
      fullWidth
      error={showError}
      onChange={({ target: { value: v } }) => {
        setFieldValue(name, v);
        setFieldTouched(name);
      }}
      value={value}
      disabled={disabled}
      InputProps={{
        ...InputProps,
        inputComponent: NumberFormatCustom as any,
      }}
      inputProps={{ ...rest }}
    />
  );
};

export default FormikNumberFormat;
