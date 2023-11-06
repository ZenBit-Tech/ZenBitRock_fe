'use client';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'store/reducers/testReducer';
import { RootState } from 'store';
import { Button } from './styles';

type Props = {
  title: string;
};

export default function ReduxExample({ title }: Props): JSX.Element {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <h3>{title}</h3>
      <Button onClick={() => dispatch(decrement())}>+</Button>
      <span>{count}</span>
      <Button onClick={() => dispatch(increment())}>-</Button>
    </>
  );
}
