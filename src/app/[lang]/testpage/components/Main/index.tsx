'use client';

import ReduxProvider from 'store/ReduxProvider';
import { MainText, MainWrapper } from './styles';
import TestForm from '../form';
import ReduxExample from '../reduxExample';
import { getDictionary } from 'lib/dictionary';
import { Locale } from 'locales/i18n.config';

type Props = {
  lang: Locale;
};

export default async function Main({ lang }: Props) {
  const { TestPage } = await getDictionary(lang);
  return (
    <MainWrapper>
      <MainText>{TestPage.maintext}</MainText>
      <TestForm />
      <ReduxProvider>
        <ReduxExample title={TestPage.reduxTitle} />
      </ReduxProvider>
    </MainWrapper>
  );
}
