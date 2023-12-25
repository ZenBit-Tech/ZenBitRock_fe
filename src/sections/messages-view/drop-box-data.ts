export type Values = {
  value: string;
  label: string;
};

export function getSortOptions(t: Function): Array<Values> {
  return [
    { value: 'latest', label: t('sortOptionLatest') },
    { value: 'oldest', label: t('sortOptionOldest') },
    { value: 'nameIncrease', label: t('sortOptionNameIncrease') },
    { value: 'nameDecrease', label: t('sortOptionNameDecrease') },
  ];
}
