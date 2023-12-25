'use client';

import { LoadingScreen } from 'components/loading-screen';
import { LeadDetailsView, Page500 } from 'sections';
import { useGetLeadDetailsQuery } from 'store/lead/lead-api';

type Props = {
  params: { id: string };
};

const LeadDetailsPage = ({ params }: Props) => {
  const { data, error } = useGetLeadDetailsQuery(params.id);

  if (error) {
    return <Page500 />;
  }

  if (!data) {
    return <LoadingScreen />;
  }

  return <LeadDetailsView leadDetails={data} />;
};

export default LeadDetailsPage;
