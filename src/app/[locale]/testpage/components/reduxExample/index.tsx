import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'store/reducers/testReducer';
import { RootState } from 'store';
import { Button, ReduxWrapper } from './styles';

type Props = {
  title: string;
};

export default function ReduxExample({ title }: Props): JSX.Element {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <ReduxWrapper>
      <h3>{title}</h3>
      <Button onClick={() => dispatch(decrement())}>+</Button>
      <span>{count}</span>
      <Button onClick={() => dispatch(increment())}>-</Button>
    </ReduxWrapper>
  );
}
