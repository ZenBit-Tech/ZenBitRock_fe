import { useTranslations } from 'next-intl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { decrement, increment } from 'store/reducers/testReducer';
import { Button, ReduxWrapper } from './styles';

export default function ReduxExample(): JSX.Element {
  const count = useSelector((state: RootState) => state.counter.value);
  const t = useTranslations('TestPage');
  const dispatch = useDispatch();

  return (
    <ReduxWrapper>
      <h3>{t('reduxTitle')}</h3>
      <Button onClick={() => dispatch(decrement())}>+</Button>
      <span>{count}</span>
      <Button onClick={() => dispatch(increment())}>-</Button>
    </ReduxWrapper>
  );
}
