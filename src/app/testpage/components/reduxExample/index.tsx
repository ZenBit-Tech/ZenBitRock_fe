import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'store/reducers/testReducer';
import { RootState } from 'store';
import { Button } from './styles';

export default function reduxExample(): JSX.Element {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <h3>Redux Example</h3>
      <Button onClick={() => dispatch(decrement())}>+</Button>
      <span>{count}</span>
      <Button onClick={() => dispatch(increment())}>-</Button>
    </>
  );
}
