import { TextField } from '@mui/material';
import { useState } from 'hooks';

type PropContentFilter = {
  getFilter(arg: string): void;
  t: Function;
};

function ContentFilter({ getFilter, t }: PropContentFilter): JSX.Element {
  const [filterValue, setFilterValue] = useState<string>('');

  return (
    <TextField
      fullWidth
      value={filterValue === '' ? null : filterValue}
      onChange={(event) => {
        getFilter(event.target.value);
        setFilterValue(event.target.value);
      }}
      placeholder={t('searchTopic')}
      type="search"
      sx={{ my: 2.5 }}
      autoComplete="off"
      label={t('searchTopic')}
    />
  );
}

export { ContentFilter };
