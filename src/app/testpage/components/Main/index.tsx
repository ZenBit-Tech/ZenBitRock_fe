'use client';

import { useTranslations } from 'next-intl';
import ReduxProvider from 'store/ReduxProvider';
import { MainText, MainWrapper } from './styles';
import TestForm from '../form';
import ReduxExample from '../reduxExample';

export default function Main(): JSX.Element {
  const t = useTranslations('TestPage');
  return (
    <MainWrapper>
      <MainText>{t('maintext')}</MainText>
      <TestForm />
      <ReduxProvider>
        <ReduxExample />
      </ReduxProvider>
    </MainWrapper>
  );
}
