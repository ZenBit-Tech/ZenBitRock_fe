import React from 'react';
import LeadsFilter from 'components/LeadsFilter/LeadsFilter';

function Leads(): JSX.Element {
  return (
    <>
      <div>{randomValues.LEADS_PAGE}</div>
      <LeadsFilter />
    </>
  );
}

export default Leads;
