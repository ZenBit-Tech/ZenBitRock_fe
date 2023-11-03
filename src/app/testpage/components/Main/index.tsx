'use client';

import { useTranslation } from 'react-i18next';
import ReduxProvider from 'store/ReduxProvider';
import { MainText, MainWrapper } from './styles';
import TestForm from '../form';
import ReduxExample from '../reduxExample';

export default function Main(): JSX.Element {
  const { t } = useTranslation();

  return (
    <MainWrapper>
      <MainText>{t('TestPage.mainText')}</MainText>
      <TestForm />
      <ReduxProvider>
        <ReduxExample />
      </ReduxProvider>
    </MainWrapper>
  );
}
