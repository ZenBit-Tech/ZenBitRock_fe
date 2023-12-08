import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { colors } from 'constants/colors';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextArea({ name, helperText, type, ...other }: Props): JSX.Element {
  const { control } = useFormContext();
  const MAX_CHARS = 300;
  const CHAR_PART = 0.05;

  const [charCount, setCharCount] = useState<number>(MAX_CHARS);
  const color = charCount < CHAR_PART * MAX_CHARS ? colors.ERROR_COLOR : null;

  const updateCharCount = (value: string): void => {
    const remainingChars = MAX_CHARS - value.length;
    setCharCount(remainingChars);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            multiline
            inputProps={{
              maxLength: MAX_CHARS,
            }}
            rows={4}
            sx={{
              width: ' 100%',
            }}
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
              updateCharCount(event.target.value);
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
          <Typography
            variant="caption"
            sx={{
              color: color,
              marginLeft: 'auto',
              marginRight: '10px',
              '@media (min-width: 600px)': {
                gridColumn: 'span 2',
              },
            }}
          >
            {`${charCount} / ${MAX_CHARS}`}
          </Typography>
        </>
      )}
    />
  );
}
