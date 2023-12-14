'use client';

import { LoadingScreen } from 'components/loading-screen';
import { LeadDetailsView, NotFoundView } from 'sections';
import { useGetLeadDetailsQuery } from 'store/lead/lead-api';

type Props = {
  params: { id: string };
};

const LeadDetailsPage = ({ params }: Props) => {
  const { data, error } = useGetLeadDetailsQuery(params.id);

  if (error) {
    return <NotFoundView />;
  }

  if (!data) {
    return <LoadingScreen />;
  }

  return <LeadDetailsView leadDetails={data.data} />;
};

export default LeadDetailsPage;
