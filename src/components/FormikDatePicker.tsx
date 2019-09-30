import * as React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { getIn } from 'formik';
import { IFormikFieldProps } from '../types';

const FormikDatePicker = ({
  form: { setFieldValue, setFieldTouched, touched, errors },
  field: { value, name },
  label,
  ...rest
}: IFormikFieldProps) => {
  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  return (
    <KeyboardDatePicker
      autoOk
      fullWidth
      error={showError}
      name={name}
      label={label}
      variant="inline"
      inputVariant="outlined"
      format="dd.MM.yyyy"
      helperText={showError && fieldError}
      onChange={value => {
        setFieldValue(name, value);
        setFieldTouched(name);
      }}
      value={value}
      {...rest}
    />
  );
};

export default FormikDatePicker;
