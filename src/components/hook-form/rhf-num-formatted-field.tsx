import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { fieldFormats } from 'constants/fieldFormats';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFNumFormattedField({
  name,
  helperText,
  type,
  ...other
}: Props): JSX.Element {
  const { control, setValue, getValues } = useFormContext();

  const [inputValue, setInputValue] = useState<string>('');
  const [formattedValue, setFormattedValue] = useState<string>('');

  const formatNumber = (value: string): string => {
    if (!value && value !== '0') return '';
    return Number(value).toLocaleString(fieldFormats.FORMAT_ZONE);
  };

  useEffect(() => {
    const fieldValue = getValues(name);
    setFormattedValue(type === fieldFormats.NUMBER ? formatNumber(fieldValue) : fieldValue);
  }, [getValues, name, type]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (type === fieldFormats.NUMBER) {
      if (value.trim() === '') {
        setInputValue('');
        setFormattedValue('');
        setValue(name, 0, { shouldValidate: true });
      } else {
        const numericValue = value.replace(/[^0-9]/g, '');
        setInputValue(numericValue);
        setFormattedValue(formatNumber(numericValue));
        setValue(name, numericValue, { shouldValidate: true });
      }
    } else {
      setValue(name, value, { shouldValidate: true });
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type="text"
          value={type === fieldFormats.NUMBER ? formattedValue : inputValue}
          onChange={handleChange}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
